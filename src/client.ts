import { client } from "./client/client.gen.ts";
import {
  createConversationImpl,
  listConversationsImpl,
  getConversationImpl,
} from "./methods/conversations";
import {
  createBotImpl,
  listBotsImpl,
  getBotImpl,
  updateBotImpl,
  deleteBotImpl,
} from "./methods/bots";
import {
  listApiKeysImpl,
  createApiKeyImpl,
  deactivateApiKeyImpl,
} from "./methods/apiKeys";
import {
  listContentImpl,
  uploadContentImpl,
  deleteContentImpl,
} from "./methods/content";
import type {
  CreateConversationResponse,
  ListConversationsResponse,
  GetConversationResponse,
  CreateBotRequestBody,
  CreateBotResponse,
  ListBotsResponse,
  GetBotData,
  GetBotResponse,
  UpdateBotData,
  UpdateBotResponse,
  DeleteBotData,
  CreateApiKeyData,
  CreateApiKeyResponse,
  ListApiKeysResponse,
  DeactivateApiKeyData,
  DeactivateApiKeyResponse,
  CreateApiKeyRequest,
  ListContentData,
  ListContentResponse,
  UploadContentData,
  UploadContentResponse,
  DeleteContentData,
  DeleteContentResponse,
} from "./client/types.gen";
import type {
  ListConversationsOptions,
  GetConversationOptions,
} from "./methods/conversations";
import {
  Conversation,
  type ConversationOptions,
  type ConversationCallbacks,
  type AttachedMedia,
} from "./conversation";

export class ApiError extends Error {
  name = "ApiError";
  status?: number;
  method?: string;
  url?: string;
  payload?: unknown;

  constructor({
    message,
    status,
    method,
    url,
    payload,
  }: {
    message: string;
    status?: number;
    method?: string;
    url?: string;
    payload?: unknown;
  }) {
    super(message);
    this.status = status;
    this.method = method;
    this.url = url;
    this.payload = payload;
  }
}

/**
 * Options for creating a new conversation
 */
export interface CreateConversationOptions {
  bot_id: string;
  user_id: string;
  create_user_if_not_exists?: boolean;
  with_messages?: Array<{
    text: string;
    from_bot: boolean;
    id?: string;
    attached_media?: AttachedMedia;
  }>;
}

export class PrioriChat {
  private client = client;
  private authHeader: string;
  private customHeaders: Record<string, string> = {};

  constructor(api_token: string, baseURL?: string) {
    this.authHeader = api_token;

    this.client.setConfig({
      baseURL: baseURL || "https://api.prioros.com/v3/",
      throwOnError: true,
    });

    this.setupAuthInterceptor();
    this.setupErrorInterceptor();
  }

  setAuthHeader(authHeader: string) {
    this.authHeader = authHeader;
    this.setupAuthInterceptor();
  }

  setHeaders(headers: Record<string, string>) {
    this.customHeaders = { ...headers };
    this.setupAuthInterceptor();
  }

  private setupAuthInterceptor() {
    this.client.instance.interceptors.request.use((config) => {
      config.headers.set("Authorization", `Bearer ${this.authHeader}`);

      // Set custom headers
      for (const [key, value] of Object.entries(this.customHeaders)) {
        config.headers.set(key, value);
      }

      return config;
    });
  }

  private setupErrorInterceptor() {
    this.client.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const res = error.response;
        const req = res?.config;
        const data = res?.data;

        const status = res?.status;
        const method = req?.method?.toUpperCase();
        const url = req?.url;

        const hasJsonBody =
          res?.headers?.["content-type"]?.includes("application/json");
        const hasMessageField =
          data && typeof data === "object" && "message" in data;

        if (hasJsonBody && hasMessageField) {
          throw new ApiError({
            message: `[${status} ${res.statusText}] ${method} ${url} ? ${String(data.message)}`,
            status,
            method,
            url,
            payload: data,
          });
        }

        const parts: string[] = [];
        if (status) parts.push(`[${status} ${res.statusText}]`);
        if (method && url) parts.push(`${method} ${url}`);
        if (data?.error) parts.push(`? ${String(data.error)}`);

        error.message = parts.join(" ") || error.message;
        error.meta = {
          status,
          method,
          url,
          payload: data,
          response: res,
        };

        return Promise.reject(error);
      },
    );
  }

  /**
   * Creates a new conversation between a user and bot
   * @param options - The conversation creation options
   * @param options.bot_id - ID of the bot to associate with this conversation
   * @param options.user_id - ID of the user to associate with this conversation
   * @param options.create_user_if_not_exists - Whether to create the user if they don't exist (defaults to true)
   * @param options.with_messages - Optional list of initial messages for the conversation
   * @returns Promise resolving to the created conversation
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.createConversation({
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   user_id: "user-123",
   *   create_user_if_not_exists: true
   * });
   *
   * console.log(`Created conversation: ${result.conversation.id}`);
   * ```
   */
  async createConversation(
    options: CreateConversationOptions,
  ): Promise<CreateConversationResponse> {
    return createConversationImpl.call(this, options);
  }

  /**
   * Lists conversations with optional filtering
   * @param options - Optional filtering options including bot_id, user_id, conversation_id, min_messages, max_messages, message_content, min_last_message_date, max_last_message_date
   * @returns Promise resolving to list of conversations
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * // List all conversations
   * const allConversations = await client.listConversations();
   *
   * // List conversations for a specific user and bot
   * const userConversations = await client.listConversations({
   *   user_id: "user-123",
   *   bot_id: "12345678-1234-1234-1234-123456789012"
   * });
   * ```
   */
  async listConversations(
    options?: ListConversationsOptions,
  ): Promise<ListConversationsResponse> {
    return listConversationsImpl.call(this, options);
  }

  /**
   * Retrieves a specific conversation by ID
   * @param options - The conversation retrieval options
   * @param options.id - The ID of the conversation to retrieve
   * @returns Promise resolving to the conversation details
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const conversation = await client.getConversation({
   *   id: "87654321-4321-4321-4321-210987654321"
   * });
   *
   * console.log(`Found ${conversation.messages.length} messages`);
   * ```
   */
  async getConversation(
    options: GetConversationOptions,
  ): Promise<GetConversationResponse> {
    return getConversationImpl.call(this, options);
  }

  /**
   * Creates a new Conversation instance for real-time messaging
   * @param options - Conversation initialization options (conversation_id OR user_id + bot_id)
   * @param callbacks - Event callbacks for handling messages and errors
   * @returns Promise resolving to conversation instance and initial data
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const { conversation, initialData } = await client.conversation(
   *   { user_id: "user-123", bot_id: "12345678-1234-1234-1234-123456789012" },
   *   {
   *     onNewMessage: (message) => {
   *       if (message.from_bot) {
   *         console.log(`Bot: ${message.text}`);
   *       }
   *     },
   *     onError: (error) => {
   *       console.error("Conversation error:", error);
   *     }
   *   }
   * );
   *
   * // Print initial message history
   * console.log(`Loaded ${initialData.messages.length} previous messages`);
   * initialData.messages.forEach(msg => {
   *   const sender = msg.from_bot ? "Bot" : "User";
   *   console.log(`${sender}: ${msg.text}`);
   * });
   *
   * // Send a message to start/continue the conversation
   * await conversation.sendMessage("Hello!");
   *
   * // Continue the conversation by sending more messages
   * // The onNewMessage callback will handle incoming bot responses
   * ```
   */
  async conversation(
    options: ConversationOptions,
    callbacks?: ConversationCallbacks,
  ): Promise<{
    conversation: Conversation;
    initialData: GetConversationResponse;
  }> {
    return Conversation.create(this, options, callbacks);
  }

  /**
   * Creates a new bot
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.createBot({
   *   name: "My Assistant Bot"
   * });
   *
   * console.log(`Created bot: ${result.bot.id}`);
   * ```
   */
  async createBot(options: CreateBotRequestBody): Promise<CreateBotResponse> {
    return createBotImpl.call(this, options);
  }

  /**
   * Lists all bots
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.listBots();
   * console.log(`Found ${result.bots.length} bots`);
   * ```
   */
  async listBots(): Promise<ListBotsResponse> {
    return listBotsImpl.call(this);
  }

  /**
   * Retrieves a specific bot by ID
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.getBot({
   *   bot_id: "12345678-1234-1234-1234-123456789012"
   * });
   *
   * console.log(`Bot name: ${result.bot.name}`);
   * ```
   */
  async getBot(options: GetBotData["path"]): Promise<GetBotResponse> {
    return getBotImpl.call(this, options);
  }

  /**
   * Updates an existing bot
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.updateBot({
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   name: "Updated Bot Name"
   * });
   *
   * console.log(`Updated bot: ${result.bot.name}`);
   * ```
   */
  async updateBot(
    options: UpdateBotData["path"] & UpdateBotData["body"],
  ): Promise<UpdateBotResponse> {
    return updateBotImpl.call(this, options);
  }

  /**
   * Deletes a bot
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * await client.deleteBot({
   *   bot_id: "12345678-1234-1234-1234-123456789012"
   * });
   *
   * console.log("Bot deleted successfully");
   * ```
   */
  async deleteBot(options: DeleteBotData["path"]): Promise<void> {
    return deleteBotImpl.call(this, options);
  }

  /**
   * Lists all API keys
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.listApiKeys();
   * console.log(`Found ${result.api_keys.length} API keys`);
   * ```
   */
  async listApiKeys(): Promise<ListApiKeysResponse> {
    return listApiKeysImpl.call(this);
  }

  /**
   * Creates a new API key
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.createApiKey({
   *   name: "My API Key"
   * });
   *
   * console.log(`Created API key: ${result.key_info.id}`);
   * console.log(`API key: ${result.api_key}`);
   * ```
   */
  async createApiKey(
    options: CreateApiKeyData["body"],
  ): Promise<CreateApiKeyResponse> {
    return createApiKeyImpl.call(this, options);
  }

  /**
   * Deactivates an API key
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.deactivateApiKey({
   *   key_id: "12345678-1234-1234-1234-123456789012"
   * });
   *
   * console.log(result.message);
   * ```
   */
  async deactivateApiKey(
    options: DeactivateApiKeyData["path"],
  ): Promise<DeactivateApiKeyResponse> {
    return deactivateApiKeyImpl.call(this, options);
  }

  /**
   * Lists content for a bot with optional filtering
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * // List all content for a bot
   * const result = await client.listContent({
   *   bot_id: "12345678-1234-1234-1234-123456789012"
   * });
   *
   * // List with search and filtering
   * const filteredResult = await client.listContent({
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   search: "vacation pics",
   *   media_type: "image",
   *   limit: 10
   * });
   *
   * console.log(`Found ${result.content.length} items`);
   * ```
   */
  async listContent(
    options: ListContentData["query"],
  ): Promise<ListContentResponse> {
    return listContentImpl.call(this, options);
  }

  /**
   * Uploads content from an image URL to a bot
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.uploadContent({
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   image_url: "https://example.com/image.jpg"
   * });
   *
   * console.log(`Uploaded content: ${result.content.content_id}`);
   * console.log(`Content URL: ${result.content.url}`);
   * ```
   */
  async uploadContent(
    options: UploadContentData["body"],
  ): Promise<UploadContentResponse> {
    return uploadContentImpl.call(this, options);
  }

  /**
   * Deletes content by ID
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.deleteContent({
   *   content_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
   * });
   *
   * console.log(result.message); // "Content deleted successfully"
   * ```
   */
  async deleteContent(
    options: DeleteContentData["path"],
  ): Promise<DeleteContentResponse> {
    return deleteContentImpl.call(this, options);
  }
}
