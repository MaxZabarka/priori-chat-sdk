type ApiContentSet = {
    bot_id: string;
    description: string;
    id: string;
    /**
     * Content ids in suggested order. The bot may follow it loosely.
     */
    items: Array<string>;
    name: string;
};
type ListSetsResponse = {
    /**
     * Oldest first
     */
    sets: Array<ApiContentSet>;
};
type ApiAttribute = {
    /**
     * Name of the attribute
     */
    name: string;
    /**
     * Value of the attribute
     */
    value: string;
};
/**
 * Image sending behaviour enum for client configuration
 */
type ApiImageSendingBehaviour = "disabled" | "low" | "moderate" | "high" | "aggressive";
type ApiModerationCategory = "underage_site_use" | "sexual_minors" | "beastiality" | "sexual_violence" | "prompt_injection";
type ApiModerationInfo = {
    category: ApiModerationCategory;
    /**
     * Explanation of why this message was flagged
     */
    reasoning: string;
    severity: ApiModerationSeverity;
};
type ApiModerationSeverity = "Low" | "Medium" | "High" | "Critical";
/**
 * Bot orientation — controls gender identity, pronouns, and attraction in the system prompt.
 */
type ApiOrientation = "straight_female" | "lesbian_female" | "gay_man" | "straight_man" | "trans_mtf" | "trans_ftm" | "bisexual";
type ApiCheckout = {
    type: "external";
} | {
    type: "hosted";
    url: string;
};
type ApiPurchase = {
    checkout: ApiCheckout;
    /**
     * The items, in the order sent. The first is the cover.
     */
    content_ids: Array<string>;
    id: string;
    /**
     * The message that offers this purchase
     */
    message_id: string;
    /**
     * Null while unpaid
     */
    paid_at?: string | null;
    /**
     * USD cents
     */
    price_cents: number;
    requested_at: string;
};
/**
 * Represents an API key info (without the actual key)
 */
type ApiKeyInfo = {
    created_at: string;
    id: string;
    is_active: boolean;
    key_prefix: string;
    name: string;
};
type Bot = BotSelling & BotKnobs & {
    /**
     * List of bot attributes
     */
    attributes: Array<ApiAttribute>;
    /**
     * Freeform text description
     */
    freeform: string;
    /**
     * Unique identifier for the bot
     */
    id: string;
    /**
     * Name of the bot
     */
    name: string;
    orientation: ApiOrientation;
    /**
     * She may send voice notes
     */
    voice_enabled: boolean;
};
/**
 * Soft selling preferences. Each set knob adds one line to her selling prompt; code enforces none. Null: not set.
 */
type BotKnobs = {
    /**
     * She may offer rungs together for a bit less
     */
    bundles?: boolean | null;
    /**
     * `hold` or `drop_once`
     */
    discount?: string | null;
    /**
     * 1 none to 5 many
     */
    emoji_amount?: number | null;
    /**
     * Usual first price with a new fan, in USD cents
     */
    first_price_cents?: number | null;
    /**
     * Rungs of a set she usually gives free, 0 to 10
     */
    free_rungs?: number | null;
    /**
     * 1 short to 5 long
     */
    message_length?: number | null;
    /**
     * `patient`, `balanced` or `eager`
     */
    pace?: string | null;
    /**
     * -1 shy to 1 bold
     */
    personality_shy_bold?: number | null;
    /**
     * -1 sweet to 1 bratty
     */
    personality_sweet_bratty?: number | null;
    /**
     * Usual step up per rung, in USD cents
     */
    price_step_cents?: number | null;
    /**
     * Rung she rarely sells past, 0 to 10
     */
    usual_last_rung?: number | null;
    /**
     * Days of silence before a welcome-back gift, 1 to 60
     */
    welcome_back_days?: number | null;
};
/**
 * How the bot sells. Every field is null when selling is off.
 */
type BotSelling = {
    /**
     * She writes the checkout link in her own message. Needs rails that make links.
     */
    checkout_link_in_text: boolean;
    /**
     * Highest price she may ask, in USD cents, at most 70000.
     */
    max_price_cents?: number | null;
    /**
     * Lowest price she may ask, in USD cents. Set with `max_price_cents` or not at all.
     */
    min_price_cents?: number | null;
    /**
     * How fans pay: `external` (your app takes the money and reports it)
     */
    payment_rails?: string | null;
    /**
     * The operator's direction for selling, in their own words. Null: she never sells.
     */
    selling_style?: string | null;
};
type Chatter = {
    /**
     * Unique identifier for the chatter
     */
    id: string;
    /**
     * Username of the chatter
     */
    username: string;
};
/**
 * Client configuration response
 */
type ClientConfig = {
    chat_images_enabled?: boolean | null;
    /**
     * Upper bound of the delay before the bot's *first* reply in a conversation. Falls back to `max_delay` when unset.
     */
    first_contact_max_delay?: number | null;
    /**
     * Lower bound of the delay before the bot's *first* reply in a conversation. Falls back to `min_delay` when unset.
     */
    first_contact_min_delay?: number | null;
    image_sending_behaviour?: ApiImageSendingBehaviour | null;
    language?: Language | null;
    max_delay?: number | null;
    min_delay?: number | null;
    platform?: string | null;
    segment?: boolean | null;
    timezone?: string | null;
    typing_speed?: number | null;
    webhook?: string | null;
};
type Content = {
    /**
     * SHA256 hash of the content
     */
    content_hash?: string | null;
    /**
     * Unique identifier for the content
     */
    content_id?: string | null;
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
    /**
     * Platform name associated with this conversation (legacy text field)
     */
    platform?: string | null;
    /**
     * Platform ID associated with this conversation
     */
    platform_id?: string | null;
    searched_message?: SearchedMessage | null;
    /**
     * ID of the user associated with this conversation
     */
    user_id?: string | null;
};
type CreateApiKeyRequest = {
    /**
     * Name/description for the API key
     */
    name: string;
};
type CreateApiKeyResponse = {
    /**
     * The generated API key (only shown once)
     */
    api_key: string;
    key_info: ApiKeyInfo;
};
type CreateBotRequestBody = {
    /**
     * List of bot attributes
     */
    attributes?: Array<ApiAttribute>;
    /**
     * Freeform text description
     */
    freeform?: string | null;
    /**
     * Name of the bot
     */
    name: string;
    orientation?: ApiOrientation | null;
};
type CreateBotResponse = {
    bot: Bot;
};
type CreateChatterRequestBody = {
    /**
     * Username for the chatter
     */
    username: string;
};
type CreateChatterResponse = {
    chatter: Chatter;
    /**
     * The generated password - only shown once at creation time
     */
    password: string;
};
type CreateConversationResponse = {
    conversation: Conversation$1;
};
type CreateConversionRequestBody = {
    /**
     * Amount of the conversion, can be negative for refunds. Value in cents.
     */
    amount?: number | null;
    /**
     * Optional bot ID to attribute the conversion to a specific bot
     */
    bot_id?: string | null;
    /**
     * Optional conversation ID to attribute the conversion to a specific conversation
     */
    conversation_id?: string | null;
    /**
     * Optional metadata to attach to the conversion, can be any JSON object
     */
    metadata?: unknown;
    /**
     * Optional unix timestamp (seconds) of when the conversion happened. Defaults to current time.
     */
    timestamp?: number | null;
    /**
     * User ID of the user who made the conversion. Should be the same as 'user_id' used in /messages
     */
    user_id: string;
};
type DeactivateApiKeyResponse = {
    /**
     * Success message
     */
    message: string;
};
type DeleteContentResponse = {
    /**
     * Success message
     */
    message: string;
};
type GenerateResponseSyncRequest = {
    batch_size?: number;
    /**
     * Grammar degradation multiplier (0.0 = no degradation, 1.0 = full). Omit to disable.
     */
    degrade_grammar_factor?: number | null;
    /**
     * Optional list of messages to use instead of the conversation's stored message history.
     */
    override_messages?: Array<Message$1> | null;
    vault_image_behaviour?: VaultImageBehaviour | null;
};
type GenerateResponseSyncResponse = {
    candidates: Array<ResponseCandidate>;
};
type GetBotResponse = {
    bot: Bot;
};
type GetChatterResponse = {
    chatter: Chatter;
};
type GetClientConfigResponse = {
    config: ClientConfig;
};
type GetConversationResponse = {
    /**
     * ID of the bot associated with this conversation
     */
    bot_id: string;
    /**
     * Optional freeform text to add to the prompt
     */
    freeform?: string | null;
    /**
     * Whether the bot is currently preparing a reply (typing indicator)
     */
    is_typing: boolean;
    latest_summary?: Summary | null;
    /**
     * Messages in the conversation
     */
    messages: Array<Message$1>;
    /**
     * Purchases in this conversation, oldest first
     */
    purchases: Array<ApiPurchase>;
    /**
     * Optional platform name describing which site the user and bot are chatting on
     */
    platform?: string | null;
    /**
     * Whether to have the bot capable of responding in multiple messages (more realistic)
     */
    segment?: boolean | null;
    /**
     * ID of the user associated with this conversation
     */
    user_id?: string | null;
    /**
     * Optional webhook URL to call when messages are received in this conversation
     */
    webhook?: string | null;
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
type GetPlatformResponse = {
    platform: Platform;
};
type GetUserResponse = {
    user: User;
};
type ImageItem = {
    /**
     * Optional custom content ID for the image
     */
    new_id?: string | null;
    /**
     * Whether this image is public (displayed on profile) or private (vault)
     */
    public: boolean;
    /**
     * URL of the image (S3 URL for existing content, or external URL for new upload)
     */
    url: string;
};
type Language = "en" | "de" | "ru" | "ar" | "es" | "nl" | "uk" | "fr" | "it";
type ListApiKeysResponse = {
    /**
     * List of API keys for the client
     */
    api_keys: Array<ApiKeyInfo>;
};
type ListBotsResponse = {
    /**
     * List of all bots
     */
    bots: Array<Bot>;
};
type ListChattersResponse = {
    /**
     * List of chatters
     */
    chatters: Array<Chatter>;
};
type ListContentQuery = {
    /**
     * ID of the bot to list content for (either bot_id or user_id must be provided)
     */
    bot_id?: string | null;
    /**
     * Maximum number of content items to return (default: 30, max: 30)
     */
    limit?: number | null;
    media_type?: MediaTypeFilter | null;
    /**
     * Search query for semantic content search
     */
    search?: string | null;
    /**
     * ID of the user to list content for (either bot_id or user_id must be provided)
     */
    user_id?: string | null;
};
type ListContentResponse = {
    /**
     * List of all content items (public + private combined)
     * @deprecated Use public_content and private_content instead. This field is only here for backwards compatiblity
     * @deprecated
     */
    content: Array<Content>;
    /**
     * List of private content items (vault for conversations)
     */
    private_content: Array<Content>;
    /**
     * List of public content items (displayed on profile)
     */
    public_content: Array<Content>;
};
type ListConversationsResponse = {
    /**
     * List of conversations
     */
    conversations: Array<ConversationHeader>;
};
type ListPlatformsResponse = {
    /**
     * List of all platforms accessible to the current client
     */
    platforms: Array<Platform>;
};
type MarkPurchasePaidResponse = {
    purchase: ApiPurchase;
};
type MediaTypeFilter = "image" | "video";
type MemoryResponse = {
    /**
     * Text content of the memory
     */
    text: string;
};
type Message$1 = {
    attached_media?: Content | null;
    /**
     * Every item of an album, in order, starting with `attached_media`. Present only when there are two or more. Output only.
     */
    attached_media_items?: Array<Content> | null;
    /**
     * Whether this message is from a bot (true) or human (false)
     */
    from_bot: boolean;
    /**
     * Unique identifier for the content
     */
    id?: string | null;
    /**
     * What tone was used to generate the message (useful only for debug or display in admin
     * panel. Does nothing as input parameter, only output)
     */
    message_tone?: string | null;
    moderation?: ApiModerationInfo | null;
    /**
     * Unix timestamp when the message was sent
     */
    sent_at?: number | null;
    /**
     * The text content of the message
     */
    text: string;
};
type Platform = {
    /**
     * Platform-specific instructions injected into the system prompt before bot-specific instructions. Used to customize AI behavior for platform-specific norms and guidelines.
     */
    custom_instruction?: string | null;
    /**
     * Unique identifier for the platform
     */
    id: string;
    /**
     * Name of the platform (immutable, case-sensitive, must be unique per client)
     */
    name: string;
};
type ResponseCandidate = {
    messages: Array<Message$1>;
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
    moderation?: ApiModerationInfo | null;
    /**
     * Unix timestamp when the message was sent
     */
    sent_at: number;
};
type Summary = {
    /**
     * Unix timestamp when the summary was created
     */
    created_at: number;
    /**
     * Number of messages that were summarized
     */
    message_count: number;
    /**
     * The text summary of the conversation
     */
    summary_text: string;
};
type UpdateBotRequest = {
    /**
     * List of bot attributes
     */
    attributes?: Array<ApiAttribute>;
    bundles?: boolean | null;
    /**
     * She writes the checkout link in her own message. Needs rails that make links.
     */
    checkout_link_in_text?: boolean | null;
    /**
     * `hold` or `drop_once`
     */
    discount?: string | null;
    /**
     * 1 to 5
     */
    emoji_amount?: number | null;
    first_price_cents?: number | null;
    /**
     * 0 to 10, less than `usual_last_rung`
     */
    free_rungs?: number | null;
    /**
     * Freeform text description
     */
    freeform?: string | null;
    /**
     * Optional list of images to set for this bot.
     * When provided, all existing bot images are replaced with these.
     */
    images?: Array<ImageItem> | null;
    /**
     * Highest price she may ask, in USD cents, at most 70000.
     */
    max_price_cents?: number | null;
    /**
     * 1 to 5
     */
    message_length?: number | null;
    /**
     * Lowest price she may ask, in USD cents. Set with `max_price_cents` or not at all.
     */
    min_price_cents?: number | null;
    /**
     * Name of the bot
     */
    name?: string | null;
    orientation?: ApiOrientation | null;
    /**
     * `patient`, `balanced` or `eager`
     */
    pace?: string | null;
    /**
     * `external`. Required when `selling_style` is set.
     */
    payment_rails?: string | null;
    /**
     * -1 shy to 1 bold
     */
    personality_shy_bold?: number | null;
    /**
     * -1 sweet to 1 bratty
     */
    personality_sweet_bratty?: number | null;
    price_step_cents?: number | null;
    /**
     * How she sells, in your words. Null turns selling off and clears the selling fields this request does not send.
     */
    selling_style?: string | null;
    /**
     * 0 to 10
     */
    usual_last_rung?: number | null;
    /**
     * She may send voice notes
     */
    voice_enabled?: boolean | null;
    /**
     * 1 to 60
     */
    welcome_back_days?: number | null;
};
type UpdateBotResponse = {
    bot: Bot;
};
/**
 * Request to update client configuration (all fields optional for PATCH semantics)
 */
type UpdateClientConfigRequest = {
    chat_images_enabled?: boolean | null;
    first_contact_max_delay?: number | null;
    first_contact_min_delay?: number | null;
    image_sending_behaviour?: ApiImageSendingBehaviour | null;
    language?: Language | null;
    max_delay?: number | null;
    min_delay?: number | null;
    platform?: string | null;
    segment?: boolean | null;
    timezone?: string | null;
    typing_speed?: number | null;
    webhook?: string | null;
};
type UpdateClientConfigResponse = {
    config: ClientConfig;
};
type UpdatePlatformRequestBody = {
    /**
     * Platform-specific instructions to inject into the system prompt before bot-specific instructions
     */
    custom_instruction?: string | null;
};
type UpdatePlatformResponse = {
    /**
     * Whether the update was successful
     */
    success: boolean;
};
type UpdateUserRequest = {
    /**
     * List of user attributes
     */
    attributes?: Array<ApiAttribute>;
    /**
     * Freeform text description
     */
    freeform?: string | null;
    /**
     * Username of the user
     */
    username?: string | null;
};
type UpdateUserResponse = {
    user: User;
};
type UploadContentRequest = {
    /**
     * ID of the bot this content belongs to (either bot_id or user_id must be provided)
     */
    bot_id?: string | null;
    /**
     * URL of the image to upload (can be a remote URL like https://example.com/image.jpg or a data URL like data:image/jpeg;base64,...)
     */
    image_url: string;
    /**
     * Whether this content is public (displayed on profile) or private (bot's vault for conversations). Only valid for bot content; user content is always public.
     */
    public?: boolean;
    /**
     * ID of the user this content belongs to (either bot_id or user_id must be provided)
     */
    user_id?: string | null;
};
type UploadContentResponse = {
    content: Content;
    /**
     * Whether the content was newly created (true) or already existed (false)
     */
    created: boolean;
};
type User = {
    /**
     * List of user attributes
     */
    attributes: Array<ApiAttribute>;
    /**
     * Freeform text description
     */
    freeform: string;
    /**
     * Unique identifier for the user
     */
    id: string;
    /**
     * Username of the user
     */
    username: string;
};
type VaultImageBehaviour = "force" | "never";
type CreateApiKeyData = {
    body: CreateApiKeyRequest;
    path?: never;
    query?: never;
    url: "/api/api-keys";
};
type DeactivateApiKeyData = {
    body?: never;
    path: {
        /**
         * API key ID to deactivate
         */
        key_id: string;
    };
    query?: never;
    url: "/api/api-keys/{key_id}";
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
type DeactivateChatterData = {
    body?: never;
    path: {
        /**
         * Chatter ID to deactivate
         */
        chatter_id: string;
    };
    query?: never;
    url: "/api/chatters/{chatter_id}";
};
type GetChatterData = {
    body?: never;
    path: {
        /**
         * Chatter ID
         */
        chatter_id: string;
    };
    query?: never;
    url: "/api/chatters/{chatter_id}";
};
type UpdateClientConfigData = {
    body: UpdateClientConfigRequest;
    path?: never;
    query?: never;
    url: "/api/config";
};
type ListContentData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * Bot identifier (either bot_id or user_id must be provided)
         */
        bot_id?: string | null;
        /**
         * User identifier (either bot_id or user_id must be provided)
         */
        user_id?: string | null;
        /**
         * Maximum number of items to return (default: 30, max: 200)
         */
        limit?: number | null;
        /**
         * Search query for semantic content search
         */
        search?: string | null;
        /**
         * Media type filter: 'image' or 'video' (defaults to all types if not specified)
         */
        media_type?: MediaTypeFilter | null;
    };
    url: "/api/content";
};
type UploadContentData = {
    body: UploadContentRequest;
    path?: never;
    query?: never;
    url: "/api/content";
};
type DeleteContentData = {
    body?: never;
    path: {
        /**
         * Content identifier
         */
        content_id: string;
    };
    query?: never;
    url: "/api/content/{content_id}";
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
        /**
         * Filter by moderation severity (repeatable). Values: Low, Medium, High, Critical
         */
        severities?: Array<string> | null;
        /**
         * Filter by moderation category (repeatable). Values: underage_site_use, sexual_minors, beastiality, sexual_violence, prompt_injection
         */
        categories?: Array<string> | null;
        /**
         * Filter by platform IDs (repeatable: ?platform_ids=uuid1&platform_ids=uuid2)
         */
        platform_ids?: Array<string> | null;
        /**
         * Maximum number of conversations to return (default: 1000)
         */
        limit?: number | null;
        /**
         * Number of conversations to skip before returning results (default: 0)
         */
        offset?: number | null;
    };
    url: "/api/conversations";
};
type GetUserData = {
    body?: never;
    path: {
        /**
         * User identifier
         */
        user_id: string;
    };
    query?: never;
    url: "/api/users/{user_id}";
};
type UpdateUserData = {
    body: UpdateUserRequest;
    path: {
        /**
         * User identifier
         */
        user_id: string;
    };
    query?: never;
    url: "/api/users/{user_id}";
};

interface GetPlatformOptions {
    platform_id: string;
}
interface UpdatePlatformOptions extends UpdatePlatformRequestBody {
    platform_id: string;
}

interface MarkPurchasePaidOptions {
    purchase_id: string;
}

interface CreateSetOptions {
    bot_id: string;
    name: string;
    description: string;
}
interface ListSetsOptions {
    bot_id: string;
}
interface UpdateSetOptions {
    set_id: string;
    name: string;
    description: string;
}
interface DeleteSetOptions {
    set_id: string;
}
interface SetSetItemsOptions {
    set_id: string;
    /** Content ids in suggested order. Items of the set left out become loose; listed items leave any other set. */
    content_ids: string[];
}

/**
 * Options for listing conversations
 */
interface ListConversationsOptions extends Omit<NonNullable<ListConversationsData['query']>, 'severities' | 'categories'> {
    /** Filter by moderation severity */
    severities?: Array<ApiModerationSeverity> | null;
    /** Filter by moderation category */
    categories?: Array<ApiModerationCategory> | null;
}
/**
 * Options for getting a conversation by ID
 */
interface GetConversationOptions {
    id: string;
}
/**
 * Options for generating a response
 */
interface GenerateResponseOptions extends GenerateResponseSyncRequest {
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
    /** Every item of an album, in order, starting with `attached_media`. Present only when there are two or more. */
    attached_media_items?: AttachedMedia[];
    sent_at?: number;
    moderation?: ApiModerationInfo;
    message_tone?: string;
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
    /** Fired when the bot starts or stops preparing a reply. Driven by the same
     *  poll as onNewMessage, so it costs no extra requests. */
    onTypingChange?: (isTyping: boolean) => void;
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
    private lastKnownIsTyping;
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
     * Generates bot response candidates without sending them
     */
    generateResponse(batchSize?: number): Promise<GenerateResponseSyncResponse>;
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
    private customHeaders;
    constructor(api_token: string, baseURL?: string);
    setAuthHeader(authHeader: string): void;
    setHeaders(headers: Record<string, string>): void;
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
     * Generates bot response candidates for a conversation without sending them
     */
    generateResponse(options: GenerateResponseOptions): Promise<GenerateResponseSyncResponse>;
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
    createBot(options: CreateBotRequestBody): Promise<CreateBotResponse>;
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
    getBot(options: GetBotData["path"]): Promise<GetBotResponse>;
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
    updateBot(options: UpdateBotData["path"] & UpdateBotData["body"]): Promise<UpdateBotResponse>;
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
    deleteBot(options: DeleteBotData["path"]): Promise<void>;
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
    listApiKeys(): Promise<ListApiKeysResponse>;
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
    createApiKey(options: CreateApiKeyData["body"]): Promise<CreateApiKeyResponse>;
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
    deactivateApiKey(options: DeactivateApiKeyData["path"]): Promise<DeactivateApiKeyResponse>;
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
    listContent(options: ListContentData["query"]): Promise<ListContentResponse>;
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
    uploadContent(options: UploadContentData["body"]): Promise<UploadContentResponse>;
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
    deleteContent(options: DeleteContentData["path"]): Promise<DeleteContentResponse>;
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
    getClientConfig(): Promise<GetClientConfigResponse>;
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
    updateClientConfig(options: UpdateClientConfigData["body"]): Promise<UpdateClientConfigResponse>;
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
    getUser(options: GetUserData["path"]): Promise<GetUserResponse>;
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
    updateUser(options: UpdateUserData["path"] & UpdateUserData["body"]): Promise<UpdateUserResponse>;
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
    listChatters(): Promise<ListChattersResponse>;
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
    createChatter(options: CreateChatterRequestBody): Promise<CreateChatterResponse>;
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
    getChatter(options: GetChatterData["path"]): Promise<GetChatterResponse>;
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
    deactivateChatter(options: DeactivateChatterData["path"]): Promise<void>;
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
    listPlatforms(): Promise<ListPlatformsResponse>;
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
    getPlatform(options: GetPlatformOptions): Promise<GetPlatformResponse>;
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
    updatePlatform(options: UpdatePlatformOptions): Promise<UpdatePlatformResponse>;
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
    createConversion(options: CreateConversionRequestBody): Promise<void>;
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
    markPurchasePaid(options: MarkPurchasePaidOptions): Promise<MarkPurchasePaidResponse>;
    /**
     * Creates an empty content set: a scene from the bot's vault with a name and a description, and no price.
     *
     * @example
     * ```ts
     * const set = await client.createSet({
     *   bot_id: "12345678-1234-1234-1234-123456789012",
     *   name: "Bathroom · golden · towel",
     *   description: "After a shower in golden light.",
     * });
     * ```
     */
    createSet(options: CreateSetOptions): Promise<ApiContentSet>;
    /** Lists a bot's content sets, oldest first, each with its items in suggested order. */
    listSets(options: ListSetsOptions): Promise<ListSetsResponse>;
    /** Renames a content set or changes its description. */
    updateSet(options: UpdateSetOptions): Promise<ApiContentSet>;
    /** Deletes a content set. Its items stay in the vault as loose items. */
    deleteSet(options: DeleteSetOptions): Promise<void>;
    /**
     * Replaces a content set's items and their suggested order. Items of the set left out become loose;
     * listed items leave any other set. Fails with 422 when an item is not this bot's content or is listed twice.
     */
    setSetItems(options: SetSetItemsOptions): Promise<ApiContentSet>;
}

export { type ApiAttribute, type ApiCheckout, type ApiContentSet, ApiError, type ApiKeyInfo, type ApiModerationCategory, type ApiModerationInfo, type ApiModerationSeverity, type ApiPurchase, type AttachedMedia, type Bot, type Chatter, type ClientConfig, type Content, Conversation, type ConversationCallbacks, type ConversationHeader, type ConversationOptions, type Conversation$1 as ConversationType, type ConversationWithId, type ConversationWithUserBot, type CreateApiKeyRequest, type CreateApiKeyResponse, type CreateBotRequestBody, type CreateBotResponse, type CreateChatterRequestBody, type CreateChatterResponse, type CreateConversationOptions, type CreateConversationResponse, type CreateConversionRequestBody, type CreateSetOptions, type DeactivateApiKeyData, type DeactivateApiKeyResponse, type DeactivateChatterData, type DeleteContentResponse, type DeleteSetOptions, type GenerateResponseOptions, type GenerateResponseSyncRequest, type GenerateResponseSyncResponse, type GetBotResponse, type GetChatterData, type GetChatterResponse, type GetClientConfigResponse, type GetConversationOptions, type GetConversationResponse, type GetMemoriesResponse, type GetPlatformResponse, type GetUserData, type GetUserResponse, type Language, type ListApiKeysResponse, type ListBotsResponse, type ListChattersResponse, type ListContentQuery, type ListContentResponse, type ListConversationsOptions, type ListConversationsResponse, type ListPlatformsResponse, type ListSetsOptions, type ListSetsResponse, type MarkPurchasePaidOptions, type MarkPurchasePaidResponse, type MediaTypeFilter, type MemoryResponse, type Message, type Platform, PrioriChat, type ResponseCandidate, type SearchedMessage, type SetSetItemsOptions, type Summary, type UpdateBotRequest, type UpdateBotResponse, type UpdateClientConfigRequest, type UpdateClientConfigResponse, type UpdatePlatformRequestBody, type UpdatePlatformResponse, type UpdateSetOptions, type UpdateUserData, type UpdateUserRequest, type UpdateUserResponse, type UploadContentRequest, type UploadContentResponse, type User };
