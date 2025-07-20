type Bot = {
    /**
     * Unique identifier for the bot
     */
    id: string;
    /**
     * Name of the bot
     */
    name: string;
};
type Content = {
    /**
     * Unique identifier for the content
     */
    content_id: string;
    /**
     * URL to the attached media
     */
    url: string;
};
type Conversation$1 = {
    /**
     * ID of the bot associated with this conversation
     */
    bot_id: string;
    /**
     * The unique ID of the conversation
     */
    id: string;
    /**
     * Messages in the conversation
     */
    messages: Array<Message$1>;
    /**
     * ID of the user associated with this conversation
     */
    user_id?: string | null;
};
type ConversationHeader = {
    /**
     * ID of the bot associated with this conversation
     */
    bot_id: string;
    /**
     * Unique identifier for the conversation
     */
    id: string;
    last_message?: Message$1 | null;
    /**
     * Total number of messages in this conversation
     */
    message_count: number;
    searched_message?: SearchedMessage | null;
    /**
     * ID of the user associated with this conversation
     */
    user_id: string;
};
type CreateBotRequest = {
    /**
     * Name of the bot
     */
    name: string;
};
type CreateBotResponse = {
    bot: Bot;
};
type CreateConversationResponse = {
    conversation: Conversation$1;
};
type GetBotResponse = {
    bot: Bot;
};
type GetConversationResponse = {
    /**
     * ID of the bot associated with this conversation
     */
    bot_id: string;
    /**
     * Messages in the conversation
     */
    messages: Array<Message$1>;
    /**
     * ID of the user associated with this conversation
     */
    user_id: string;
};
type GetMemoriesResponse = {
    /**
     * Bot memories for this conversation
     */
    bot_memories: Array<MemoryResponse>;
    /**
     * User memories for this conversation
     */
    user_memories: Array<MemoryResponse>;
};
type ListBotsResponse = {
    /**
     * List of all bots
     */
    bots: Array<Bot>;
};
type ListConversationsResponse = {
    /**
     * List of conversations
     */
    conversations: Array<ConversationHeader>;
};
type MemoryResponse = {
    /**
     * Text content of the memory
     */
    text: string;
};
type Message$1 = {
    attached_media?: Content | null;
    /**
     * Whether this message is from a bot (true) or human (false)
     */
    from_bot: boolean;
    /**
     * Unique identifier for the content
     */
    id?: string | null;
    /**
     * Unix timestamp when the message was sent
     */
    sent_at?: number | null;
    /**
     * The text content of the message
     */
    text: string;
};
type SearchedMessage = {
    /**
     * Whether this message was sent by the bot
     */
    from_bot: boolean;
    /**
     * End index of the match within the message text
     */
    match_end: number;
    /**
     * Start index of the match within the message text
     */
    match_start: number;
    /**
     * The text content of the matched message
     */
    message_text: string;
    /**
     * Unix timestamp when the message was sent
     */
    sent_at: number;
};
type UpdateBotRequest = {
    /**
     * New name of the bot
     */
    name: string;
};
type UpdateBotResponse = {
    bot: Bot;
};
type DeleteBotData = {
    body?: never;
    path: {
        /**
         * Bot identifier
         */
        bot_id: string;
    };
    query?: never;
    url: "/api/bots/{bot_id}";
};
type GetBotData = {
    body?: never;
    path: {
        /**
         * Bot identifier
         */
        bot_id: string;
    };
    query?: never;
    url: "/api/bots/{bot_id}";
};
type UpdateBotData = {
    body: UpdateBotRequest;
    path: {
        /**
         * Bot identifier
         */
        bot_id: string;
    };
    query?: never;
    url: "/api/bots/{bot_id}";
};
type ListConversationsData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Filter conversations by bot ID
         */
        bot_id?: string | null;
        /**
         * Filter conversations by user ID
         */
        user_id?: string | null;
        /**
         * Filter conversations by specific conversation ID
         */
        conversation_id?: string | null;
        /**
         * Filter conversations with at least this many messages
         */
        min_messages?: number | null;
        /**
         * Filter conversations with at most this many messages
         */
        max_messages?: number | null;
        /**
         * Search for conversations containing this text in messages
         */
        message_content?: string | null;
        /**
         * Filter conversations with last message after this timestamp (Unix epoch)
         */
        min_last_message_date?: number | null;
        /**
         * Filter conversations with last message before this timestamp (Unix epoch)
         */
        max_last_message_date?: number | null;
    };
    url: "/api/conversations";
};

/**
 * Options for listing conversations
 */
interface ListConversationsOptions extends NonNullable<ListConversationsData['query']> {
}
/**
 * Options for getting a conversation by ID
 */
interface GetConversationOptions {
    id: string;
}

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
interface AttachedMedia {
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
 *   sent_at: Math.floor(new Date("Sat Jul 05 2025 16:20:05") / 1000) // All dates in Priori API are represented as unix timestamps
 * };
 * ```
 */
interface Message {
    id?: string;
    text: string;
    from_bot: boolean;
    attached_media?: AttachedMedia;
    sent_at?: number;
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
interface ConversationWithId {
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
interface ConversationWithUserBot {
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
type ConversationOptions = ConversationWithId | ConversationWithUserBot;
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
interface ConversationCallbacks {
    onInitialData?: (data: GetConversationResponse) => void;
    onNewMessage?: (message: Message) => void;
    onError?: (error: Error) => void;
}
/**
 * Represents a conversation between a user and a bot.
 * Provides real-time message handling through it's methods and callbacks
 */
declare class Conversation {
    private client;
    private conversationId;
    private pollingInterval;
    private pollingTimer?;
    private lastKnownMessageCount;
    private callbacks;
    private isInitialized;
    private constructor();
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
    static create(client: PrioriChat, options: ConversationOptions, callbacks?: ConversationCallbacks): Promise<{
        conversation: Conversation;
        initialData: GetConversationResponse;
    }>;
    private initialize;
    private startPolling;
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
    sendMessage(text: string, attachedMedia?: AttachedMedia): Promise<void>;
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
    disconnect(): void;
    /**
     * Retrieves bot and user memories for this conversation.
     * @returns Promise resolving to memories data containing bot_memories and user_memories arrays
     */
    getMemories(): Promise<GetMemoriesResponse>;
    /**
     * Gets the current conversation ID.
     * @returns The conversation ID string
     * @example
     * ```ts
     * console.log(`Current conversation: ${conversation.id}`);
     * // Output: Current conversation: 87654321-4321-4321-4321-210987654321
     * ```
     */
    get id(): string;
}

declare class ApiError extends Error {
    name: string;
    status?: number;
    method?: string;
    url?: string;
    payload?: unknown;
    constructor({ message, status, method, url, payload, }: {
        message: string;
        status?: number;
        method?: string;
        url?: string;
        payload?: unknown;
    });
}
/**
 * Options for creating a new conversation
 */
interface CreateConversationOptions {
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
declare class PrioriChat {
    private client;
    private authHeader;
    constructor(api_token: string, baseURL?: string);
    private setupAuthInterceptor;
    private setupErrorInterceptor;
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
    createConversation(options: CreateConversationOptions): Promise<CreateConversationResponse>;
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
    listConversations(options?: ListConversationsOptions): Promise<ListConversationsResponse>;
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
    getConversation(options: GetConversationOptions): Promise<GetConversationResponse>;
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
    conversation(options: ConversationOptions, callbacks?: ConversationCallbacks): Promise<{
        conversation: Conversation;
        initialData: GetConversationResponse;
    }>;
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
    createBot(options: CreateBotRequest): Promise<CreateBotResponse>;
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
    listBots(): Promise<ListBotsResponse>;
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
    getBot(options: GetBotData['path']): Promise<GetBotResponse>;
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
    updateBot(options: UpdateBotData['path'] & UpdateBotData['body']): Promise<UpdateBotResponse>;
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
    deleteBot(options: DeleteBotData['path']): Promise<void>;
}

export { ApiError, type AttachedMedia, type Bot, Conversation, type ConversationCallbacks, type ConversationHeader, type ConversationOptions, type Conversation$1 as ConversationType, type ConversationWithId, type ConversationWithUserBot, type CreateBotRequest, type CreateBotResponse, type CreateConversationOptions, type CreateConversationResponse, type GetBotResponse, type GetConversationOptions, type GetConversationResponse, type GetMemoriesResponse, type ListBotsResponse, type ListConversationsOptions, type ListConversationsResponse, type MemoryResponse, type Message, PrioriChat, type SearchedMessage, type UpdateBotRequest, type UpdateBotResponse };
