import { sendMessage } from "./client/sdk.gen";
import type { PrioriChat } from "./client";
import type { Message as ApiMessage, GetConversationResponse } from "./client/types.gen";

export interface Message {
  id?: string;
  text: string;
  from_bot: boolean;
  attached_media?: any;
  timestamp?: Date;
}

export interface ConversationWithId {
  conversation_id: string;
  pollingInterval?: number;
}

export interface ConversationWithUserBot {
  user_id: string;
  bot_id: string;
  pollingInterval?: number;
}

export type ConversationOptions = ConversationWithId | ConversationWithUserBot;

export interface ConversationCallbacks {
  onInitialData?: (data: GetConversationResponse) => void;
  onNewMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
}

export class Conversation {
  private client: PrioriChat;
  private conversationId!: string;
  private pollingInterval: number;
  private pollingTimer?: NodeJS.Timeout;
  private lastKnownMessageCount = 0;
  private callbacks: ConversationCallbacks = {};
  private isInitialized = false;

  private constructor(
    client: PrioriChat,
    options: ConversationOptions,
    callbacks: ConversationCallbacks = {}
  ) {
    this.client = client;
    this.pollingInterval = options.pollingInterval || 2000;
    this.callbacks = callbacks;
  }

  static async create(
    client: PrioriChat,
    options: ConversationOptions,
    callbacks: ConversationCallbacks = {}
  ): Promise<{ conversation: Conversation; initialData: GetConversationResponse }> {
    const instance = new Conversation(client, options, callbacks);
    const initialData = await instance.initialize(options);
    return { conversation: instance, initialData };
  }

  private async initialize(options: ConversationOptions): Promise<GetConversationResponse> {
    try {
      // If we have conversation_id, use it directly
      if ('conversation_id' in options) {
        this.conversationId = options.conversation_id;
      } else {
        // Create conversation with user_id and bot_id
        const conversation = await this.client.createConversation({
          user_id: options.user_id,
          bot_id: options.bot_id,
        });
        this.conversationId = conversation.conversation.id;
      }

      // Fetch initial data
      const initialData = await this.client.getConversation({
        id: this.conversationId,
      });

      this.lastKnownMessageCount = initialData.messages.length;
      this.isInitialized = true;

      // Fire initial data callback
      if (this.callbacks.onInitialData) {
        this.callbacks.onInitialData(initialData);
      }

      // Start polling for new messages
      this.startPolling();

      return initialData;

    } catch (error) {
      if (this.callbacks.onError) {
        this.callbacks.onError(error as Error);
      }
      throw error;
    }
  }

  private startPolling() {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
    }

    this.pollingTimer = setInterval(async () => {
      try {
        const data = await this.client.getConversation({
          id: this.conversationId,
        });

        // Check if there are new messages
        if (data.messages.length > this.lastKnownMessageCount) {
          const newMessages = data.messages.slice(this.lastKnownMessageCount);
          this.lastKnownMessageCount = data.messages.length;

          // Fire callback for each new message
          if (this.callbacks.onNewMessage) {
            newMessages.forEach(apiMessage => {
              const message: Message = {
                id: apiMessage.id || undefined,
                text: apiMessage.text,
                from_bot: apiMessage.from_bot,
                attached_media: apiMessage.attached_media,
                timestamp: new Date(),
              };
              this.callbacks.onNewMessage!(message);
            });
          }
        }
      } catch (error) {
        if (this.callbacks.onError) {
          this.callbacks.onError(error as Error);
        }
      }
    }, this.pollingInterval);
  }

  /**
   * Sends a message to the conversation
   * @param text - The text content of the message
   * @param attachedMedia - Optional attached media content
   * @returns Promise that resolves when message is sent
   */
  async sendMessage(text: string, attachedMedia?: any): Promise<void> {
    if (!this.isInitialized) {
      throw new Error("Conversation not initialized");
    }

    // Create the message object for optimistic update
    const message: Message = {
      text,
      from_bot: false,
      attached_media: attachedMedia,
      id: `temp-${Date.now()}`,
      timestamp: new Date(),
    };

    // Optimistically fire the new message event
    if (this.callbacks.onNewMessage) {
      this.callbacks.onNewMessage(message);
    }

    try {
      await sendMessage({
        path: {
          id: this.conversationId,
        },
        body: {
          message: {
            text,
            from_bot: false,
            attached_media: attachedMedia,
          },
        },
      });

      // Update message count for optimistic update
      this.lastKnownMessageCount++;

    } catch (error) {
      if (this.callbacks.onError) {
        this.callbacks.onError(error as Error);
      }
      throw error;
    }
  }

  /**
   * Stops polling for new messages and cleans up resources
   */
  disconnect() {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = undefined;
    }
  }

  /**
   * Updates the polling interval
   * @param interval - New polling interval in milliseconds
   */
  setPollingInterval(interval: number) {
    this.pollingInterval = interval;
    if (this.pollingTimer && this.isInitialized) {
      this.startPolling();
    }
  }

  /**
   * Gets the current conversation ID
   */
  get id(): string {
    return this.conversationId;
  }

  /**
   * Checks if the conversation is initialized
   */
  get initialized(): boolean {
    return this.isInitialized;
  }
}
