import { sendMessage, getMemories } from "./client/sdk.gen";
import type { PrioriChat } from "./client";
import type { GetConversationResponse, GetMemoriesResponse } from "./client/types.gen";

/**
 * Represents media content attached to a message
 * @example
 * ```ts
 * const media: AttachedMedia = {
 *   url: "https://example.com/image.jpg"
 * };
 * 
 * // Use with message
 * await conversation.sendMessage("Check out this image!", media);
 * ```
 */
export interface AttachedMedia {
  url: string;
}

/**
 * Represents a message in the conversation
 * @example
 * ```ts
 * const userMessage: Message = {
 *   text: "Hey there!",
 *   from_bot: false,
 * };
 * 
 * const botMessageWithMedia: Message = {
 *   text: "Just sent you a pic (;",
 *   from_bot: true,
 *   attached_media: { url: "https://example.com/image.jpg" },
 *   timestamp: new Date("Sat Jul 05 2025 16:20:05") 
 * };
 * ```
 */
export interface Message {
  id?: string;
  text: string;
  from_bot: boolean;
  attached_media?: AttachedMedia;
  timestamp?: Date;
}

/**
 * Configuration for retrieving a conversation by its unique ID
 * @example
 * ```ts
 * const config: ConversationWithId = {
 *   conversation_id: "87654321-4321-4321-4321-210987654321"
 * };
 * 
 * const { conversation } = await client.conversation(config);
 * ```
 */
export interface ConversationWithId {
  conversation_id: string;
  pollingInterval?: number;
}

/**
 * Configuration for retrieving or creating a conversation by user and bot pair.
 * Note: There can only be one conversation between a specific user_id and bot_id.
 * If a conversation already exists, it will be retrieved; otherwise, a new one will be created.
 * @example
 * ```ts
 * const config: ConversationWithUserBot = {
 *   user_id: "user-123",
 *   bot_id: "12345678-1234-1234-1234-123456789012"
 * };
 * 
 * // This will either find the existing conversation or create a new one
 * const { conversation } = await client.conversation(config);
 * ```
 */
export interface ConversationWithUserBot {
  user_id: string;
  bot_id: string;
  pollingInterval?: number;
}

/**
 * Union type for conversation configuration options.
 * You can either specify a conversation_id directly, or provide user_id + bot_id
 * to find/create the unique conversation between that user and bot.
 * @example
 * ```ts
 * // Option 1: Use existing conversation ID
 * const byId: ConversationOptions = {
 *   conversation_id: "87654321-4321-4321-4321-210987654321"
 * };
 * 
 * // Option 2: Use user + bot pair (will find existing or create new)
 * const byUserBot: ConversationOptions = {
 *   user_id: "user-123",
 *   bot_id: "12345678-1234-1234-1234-123456789012"
 * };
 * ```
 */
export type ConversationOptions = ConversationWithId | ConversationWithUserBot;

/**
 * Callback functions for handling conversation events
 * @example
 * ```ts
 * const callbacks: ConversationCallbacks = {
 *   onInitialData: (data) => {
 *     console.log(`Loaded ${data.messages.length} previous messages`);
 *     data.messages.forEach(msg => {
 *       console.log(`${msg.from_bot ? 'Bot' : 'User'}: ${msg.text}`);
 *     });
 *   },
 *   onNewMessage: (message) => {
 *     if (message.from_bot) {
 *       console.log(`Bot: ${message.text}`);
 *     } else {
 *       console.log(`User: ${message.text}`);
 *     }
 *   },
 *   onError: (error) => {
 *     console.error('Conversation error:', error.message);
 *   }
 * };
 * 
 * const { conversation } = await client.conversation(options, callbacks);
 * ```
 */
export interface ConversationCallbacks {
  onInitialData?: (data: GetConversationResponse) => void;
  onNewMessage?: (message: Message) => void;
  onError?: (error: Error) => void;
}

/**
 * Represents a conversation between a user and a bot.
 * Provides real-time message handling through it's methods and callbacks
 */
export class Conversation {
  private client: PrioriChat;
  private conversationId!: string;
  private pollingInterval: number;
  private pollingTimer?: ReturnType<typeof setInterval>;
  private lastKnownMessageCount = 0;
  private callbacks: ConversationCallbacks = {};
  private isInitialized = false;

  private constructor(
    client: PrioriChat,
    options: ConversationOptions,
    callbacks: ConversationCallbacks = {}
  ) {
    this.client = client;
    this.pollingInterval = options.pollingInterval || 500;
    this.callbacks = callbacks;
  }

  /**
   * Creates a new conversation instance and initializes it.
   * @param client - The PrioriChat client instance
   * @param options - Configuration options for the conversation
   * @param callbacks - Event callbacks for handling conversation events
   * @returns Promise resolving to the conversation instance and initial data containing message history
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   * 
   * const { conversation, initialData } = await Conversation.create(
   *   client,
   *   { user_id: "user-123", bot_id: "12345678-1234-1234-1234-123456789012" },
   *   {
   *     onNewMessage: (message) => {
   *       console.log(`${message.from_bot ? 'Bot' : 'User'}: ${message.text}`);
   *     },
   *     onError: (error) => {
   *       console.error("Error:", error);
   *     }
   *   }
   * );
   * 
   * // Print message history
   * initialData.messages.forEach(msg => {
   *   console.log(`${msg.from_bot ? 'Bot' : 'User'}: ${msg.text}`);
   * });
   * ```
   */
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
        // Check for existing conversation with this user and bot
        const existingConversations = await this.client.listConversations({
          user_id: options.user_id,
          bot_id: options.bot_id,
        });

        if (existingConversations.conversations.length > 0) {
          // Use the first existing conversation
          this.conversationId = existingConversations.conversations[0].id;
        } else {
          // Create conversation with user_id and bot_id
          const conversation = await this.client.createConversation({
            user_id: options.user_id,
            bot_id: options.bot_id,
            create_user_if_not_exists: true
          });
          this.conversationId = conversation.conversation.id;
        }
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
                attached_media: apiMessage.attached_media ? { url: apiMessage.attached_media.url } : undefined,
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
   * @example
   * ```ts
   * // Send a simple text message
   * await conversation.sendMessage("Hello, how can you help me?");
   * 
   * // Send a message with media attachment
   * await conversation.sendMessage("Here's an image", {
   *   url: "https://example.com/image.jpg"
   * });
   * 
   * // Continue the conversation by sending more messages
   * // The onNewMessage callback will handle bot responses
   * ```
   */
  async sendMessage(text: string, attachedMedia?: AttachedMedia): Promise<void> {
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
            sent_at: null,
            text,
            from_bot: false,
            attached_media: attachedMedia ? { content_id: '', url: attachedMedia.url } : undefined,
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
   * Stops polling for new messages and cleans up resources.
   * Call this method when you're done with the conversation to prevent memory leaks.
   * @example
   * ```ts
   * // Always disconnect when done
   * conversation.disconnect();
   * 
   * // Or use in React useEffect cleanup
   * useEffect(() => {
   *   const setupConversation = async () => {
   *     const { conversation } = await client.conversation(...);
   *     setConversation(conversation);
   *   };
   *   
   *   setupConversation();
   *   
   *   return () => {
   *     conversation?.disconnect();
   *   };
   * }, []);
   * ```
   */
  disconnect() {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = undefined;
    }
  }

  // /**
  //  * Updates the polling interval
  //  * @param interval - New polling interval in milliseconds
  //  */
  // setPollingInterval(interval: number) {
  //   this.pollingInterval = interval;
  //   if (this.pollingTimer && this.isInitialized) {
  //     this.startPolling();
  //   }
  // }

  /**
   * Retrieves bot and user memories for this conversation.
   * @returns Promise resolving to memories data containing bot_memories and user_memories arrays
   */
  async getMemories(): Promise<GetMemoriesResponse> {
    if (!this.isInitialized) {
      throw new Error("Conversation not initialized");
    }

    return (await getMemories({
      path: {
        id: this.conversationId,
      },
    })).data;
  }

  /**
   * Gets the current conversation ID.
   * @returns The conversation ID string
   * @example
   * ```ts
   * console.log(`Current conversation: ${conversation.id}`);
   * // Output: Current conversation: 87654321-4321-4321-4321-210987654321
   * ```
   */
  get id(): string {
    return this.conversationId;
  }
}
