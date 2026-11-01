import { client } from "./client/client.gen.ts";
import {
  createConversationImpl,
  listConversationsImpl,
  getConversationImpl,
  generateResponseImpl,
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
import {
  getClientConfigImpl,
  updateClientConfigImpl,
} from "./methods/config";
import {
  listChattersImpl,
  createChatterImpl,
  getChatterImpl,
  deactivateChatterImpl,
} from "./methods/chatters";
import {
  listPlatformsImpl,
  getPlatformImpl,
  updatePlatformImpl,
  type GetPlatformOptions,
  type UpdatePlatformOptions,
} from "./methods/platforms";
import { createConversionImpl } from "./methods/conversions";
import { markPurchasePaidImpl, type MarkPurchasePaidOptions } from "./methods/purchases";
import {
  createSetImpl,
  deleteSetImpl,
  listSetsImpl,
  setSetItemsImpl,
  updateSetImpl,
  type CreateSetOptions,
  type DeleteSetOptions,
  type ListSetsOptions,
  type SetSetItemsOptions,
  type UpdateSetOptions,
} from "./methods/sets";
import {
  createClipVoiceImpl,
  createLibraryVoiceImpl,
  deleteVoiceImpl,
  listVoicesImpl,
  renameVoiceImpl,
  voiceSampleImpl,
  type CreateClipVoiceOptions,
  type CreateLibraryVoiceOptions,
  type DeleteVoiceOptions,
  type RenameVoiceOptions,
  type VoiceSampleOptions,
} from "./methods/voices";
import { suggestRepliesImpl, type SuggestRepliesOptions } from "./methods/suggestions";
import { getUser, updateUser } from "./client/sdk.gen";
import type {
  CreateConversationResponse,
  ListConversationsResponse,
  GetConversationResponse,
  GenerateResponseSyncResponse,
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
  GetClientConfigResponse,
  UpdateClientConfigData,
  UpdateClientConfigResponse,
  GetUserData,
  GetUserResponse,
  UpdateUserData,
  UpdateUserResponse,
  CreateChatterRequestBody,
  CreateChatterResponse,
  ListChattersResponse,
  GetChatterData,
  GetChatterResponse,
  DeactivateChatterData,
  ListPlatformsResponse,
  GetPlatformResponse,
  UpdatePlatformResponse,
  UpdatePlatformRequestBody,
  CreateConversionRequestBody,
  MarkPurchasePaidResponse,
  ApiContentSet,
  ListSetsResponse,
  ApiVoice,
  ListVoicesResponse,
  SuggestRepliesResponse,
} from "./client/types.gen";
import type {
  ListConversationsOptions,
  GetConversationOptions,
  GenerateResponseOptions,
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
   * Generates bot response candidates for a conversation without sending them
   */
  async generateResponse(
    options: GenerateResponseOptions,
  ): Promise<GenerateResponseSyncResponse> {
    return generateResponseImpl.call(this, options);
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

  /**
   * Retrieves the client configuration
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.getClientConfig();
   * console.log(`Webhook: ${result.config.webhook}`);
   * console.log(`Language: ${result.config.language}`);
   * ```
   */
  async getClientConfig(): Promise<GetClientConfigResponse> {
    return getClientConfigImpl.call(this);
  }

  /**
   * Updates the client configuration
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.updateClientConfig({
   *   webhook: "https://example.com/webhook",
   *   language: "es",
   *   typing_speed: 2.0
   * });
   *
   * console.log("Configuration updated successfully");
   * ```
   */
  async updateClientConfig(
    options: UpdateClientConfigData["body"],
  ): Promise<UpdateClientConfigResponse> {
    return updateClientConfigImpl.call(this, options);
  }

  /**
   * Retrieves a specific user by ID
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.getUser({
   *   user_id: "user-123"
   * });
   *
   * console.log(`Username: ${result.user.username}`);
   * ```
   */
  async getUser(options: GetUserData["path"]): Promise<GetUserResponse> {
    const response = await getUser({
      client: this.client,
      path: options,
    });
    return response.data as GetUserResponse;
  }

  /**
   * Updates an existing user
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.updateUser({
   *   user_id: "user-123",
   *   username: "new_username",
   *   freeform: "Updated description",
   *   attributes: [{ name: "age", value: "25" }]
   * });
   *
   * console.log(`Updated user: ${result.user.username}`);
   * ```
   */
  async updateUser(options: UpdateUserData["path"] & UpdateUserData["body"]): Promise<UpdateUserResponse> {
    const { user_id, ...body } = options;
    const response = await updateUser({
      client: this.client,
      path: { user_id },
      body,
    });
    return response.data as UpdateUserResponse;
  }

  /**
   * Lists all chatters
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.listChatters();
   * console.log(`Found ${result.chatters.length} chatters`);
   * ```
   */
  async listChatters(): Promise<ListChattersResponse> {
    return listChattersImpl.call(this);
  }

  /**
   * Creates a new chatter
   * @param options - The chatter creation options
   * @param options.username - Username for the chatter
   * @returns Promise resolving to the created chatter and password (password is only shown once)
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.createChatter({
   *   username: "my-chatter"
   * });
   *
   * console.log(`Created chatter: ${result.chatter.id}`);
   * console.log(`Password: ${result.password}`); // Save this - only shown once!
   * ```
   */
  async createChatter(options: CreateChatterRequestBody): Promise<CreateChatterResponse> {
    return createChatterImpl.call(this, options);
  }

  /**
   * Retrieves a specific chatter by ID
   * @param options - The chatter retrieval options
   * @param options.chatter_id - The ID of the chatter to retrieve
   * @returns Promise resolving to the chatter details
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.getChatter({
   *   chatter_id: "12345678-1234-1234-1234-123456789012"
   * });
   *
   * console.log(`Chatter username: ${result.chatter.username}`);
   * ```
   */
  async getChatter(options: GetChatterData["path"]): Promise<GetChatterResponse> {
    return getChatterImpl.call(this, options);
  }

  /**
   * Deactivates a chatter
   * @param options - The chatter deactivation options
   * @param options.chatter_id - The ID of the chatter to deactivate
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * await client.deactivateChatter({
   *   chatter_id: "12345678-1234-1234-1234-123456789012"
   * });
   *
   * console.log("Chatter deactivated successfully");
   * ```
   */
  async deactivateChatter(options: DeactivateChatterData["path"]): Promise<void> {
    return deactivateChatterImpl.call(this, options);
  }

  /**
   * Lists all platforms accessible to the current client
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.listPlatforms();
   * console.log(`Found ${result.platforms.length} platforms`);
   * ```
   */
  async listPlatforms(): Promise<ListPlatformsResponse> {
    return listPlatformsImpl.call(this);
  }

  /**
   * Retrieves a specific platform by ID
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.getPlatform({
   *   platform_id: "12345678-1234-1234-1234-123456789012"
   * });
   *
   * console.log(`Platform name: ${result.platform.name}`);
   * ```
   */
  async getPlatform(options: GetPlatformOptions): Promise<GetPlatformResponse> {
    return getPlatformImpl.call(this, options);
  }

  /**
   * Updates an existing platform
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const result = await client.updatePlatform({
   *   platform_id: "12345678-1234-1234-1234-123456789012",
   *   custom_instruction: "Be warm and helpful"
   * });
   *
   * console.log(`Updated platform successfully`);
   * ```
   */
  async updatePlatform(options: UpdatePlatformOptions): Promise<UpdatePlatformResponse> {
    return updatePlatformImpl.call(this, options);
  }

  /**
   * Creates a conversion record for tracking revenue or events
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * await client.createConversion({
   *   user_id: "user-123",
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   amount: 4999, // Value in cents
   *   timestamp: Math.floor(Date.now() / 1000)
   * });
   *
   * console.log("Conversion recorded");
   * ```
   */
  async createConversion(options: CreateConversionRequestBody): Promise<void> {
    return createConversionImpl.call(this, options);
  }

  /**
   * Marks a purchase paid. Clients that take payment themselves call this once the fan has paid;
   * the bot then reacts to the payment. Throws with status 409 if the purchase is already paid.
   * @example
   * ```ts
   * const client = new PrioriChat("your-api-key");
   *
   * const { purchase } = await client.markPurchasePaid({
   *   purchase_id: "12345678-1234-1234-1234-123456789012",
   * });
   *
   * console.log(`Paid at ${purchase.paid_at}`);
   * ```
   */
  async markPurchasePaid(options: MarkPurchasePaidOptions): Promise<MarkPurchasePaidResponse> {
    return markPurchasePaidImpl.call(this, options);
  }

  /**
   * Creates an empty content set: a scene from the bot's vault with a name and a description, and no price.
   *
   * @example
   * ```ts
   * const set = await client.createSet({
   *   bot_id: "12345678-1234-1234-1234-123456789012",
   *   name: "Bathroom · golden · towel",
   * });
   * // Its description, and a name and tag per photo, are written from the photos a couple of minutes after the last edit.
   * ```
   */
  async createSet(options: CreateSetOptions): Promise<ApiContentSet> {
    return createSetImpl.call(this, options);
  }

  /** Lists a bot's content sets, oldest first, each with its items in suggested order. */
  async listSets(options: ListSetsOptions): Promise<ListSetsResponse> {
    return listSetsImpl.call(this, options);
  }

  /** Renames a content set or changes its description. */
  async updateSet(options: UpdateSetOptions): Promise<ApiContentSet> {
    return updateSetImpl.call(this, options);
  }

  /** Deletes a content set. Its items stay in the vault as loose items. */
  async deleteSet(options: DeleteSetOptions): Promise<void> {
    return deleteSetImpl.call(this, options);
  }

  /**
   * Replaces a content set's items and their suggested order. Items of the set left out become loose;
   * listed items leave any other set. Fails with 422 when an item is not this bot's content or is listed twice.
   */
  async setSetItems(options: SetSetItemsOptions): Promise<ApiContentSet> {
    return setSetItemsImpl.call(this, options);
  }

  /** Lists the voices bots can speak with: the built-in ones, then the client's own, each with the bots using it. */
  async listVoices(): Promise<ListVoicesResponse> {
    return listVoicesImpl.call(this);
  }

  /**
   * Makes a voice from a clip of someone speaking.
   *
   * @example
   * ```ts
   * const voice = await client.createClipVoice({ name: "Jess", clip: file, transcript: "Hi, it's me…" });
   * await client.updateBot({ id: botId, voice_enabled: true, assigned_voice_id: voice.id });
   * ```
   */
  async createClipVoice(options: CreateClipVoiceOptions): Promise<ApiVoice> {
    return createClipVoiceImpl.call(this, options);
  }

  /** Adds a voice from the provider's library by its id there. */
  async createLibraryVoice(options: CreateLibraryVoiceOptions): Promise<ApiVoice> {
    return createLibraryVoiceImpl.call(this, options);
  }

  /** Renames one of the client's own voices. Built-in voices can't be renamed. */
  async renameVoice(options: RenameVoiceOptions): Promise<ApiVoice> {
    return renameVoiceImpl.call(this, options);
  }

  /** Deletes one of the client's own voices. Fails with 409 while a bot speaks with it. */
  async deleteVoice(options: DeleteVoiceOptions): Promise<void> {
    return deleteVoiceImpl.call(this, options);
  }

  /**
   * Suggests three replies the fan could send next: different lengths, some horny and some not. For testing a bot quickly; nothing is saved.
   */
  async suggestReplies(options: SuggestRepliesOptions): Promise<SuggestRepliesResponse> {
    return suggestRepliesImpl.call(this, options);
  }

  /** Records a line in a voice and returns it as MP3 audio. Nothing is saved. */
  async voiceSample(options: VoiceSampleOptions): Promise<Blob> {
    return voiceSampleImpl.call(this, options);
  }
}
