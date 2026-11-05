var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/client/zod.gen.ts
import { z } from "zod";
var zApiAttribute = z.object({
  name: z.string(),
  value: z.string()
});
var zApiCheckout = z.union([
  z.object({
    type: z.enum([
      "external"
    ])
  }),
  z.object({
    payment_mode: z.string(),
    type: z.enum([
      "hosted"
    ]),
    url: z.string()
  })
]);
var zApiPhotoLabel = z.object({
  content_id: z.string(),
  name: z.string(),
  same_as: z.union([
    z.string(),
    z.null()
  ]).optional(),
  tag: z.string()
});
var zApiContentSet = z.object({
  bot_id: z.string().uuid(),
  description: z.union([
    z.string(),
    z.null()
  ]).optional(),
  id: z.string().uuid(),
  items: z.array(z.string()),
  name: z.string(),
  photos: z.array(zApiPhotoLabel)
});
var zApiImageSendingBehaviour = z.enum([
  "disabled",
  "low",
  "moderate",
  "high",
  "aggressive"
]);
var zApiMessageLock = z.object({
  checkout_url: z.union([
    z.string().url(),
    z.null()
  ]).optional(),
  price_cents: z.number().int().gte(0),
  purchase_id: z.string().uuid(),
  unlocked: z.boolean()
});
var zApiModerationCategory = z.enum([
  "underage_site_use",
  "sexual_minors",
  "beastiality",
  "sexual_violence",
  "prompt_injection"
]);
var zApiModerationSeverity = z.enum([
  "Low",
  "Medium",
  "High",
  "Critical"
]);
var zApiModerationInfo = z.object({
  category: zApiModerationCategory,
  reasoning: z.string(),
  severity: zApiModerationSeverity
});
var zApiOrientation = z.enum([
  "straight_female",
  "lesbian_female",
  "gay_man",
  "straight_man",
  "trans_mtf",
  "trans_ftm",
  "bisexual"
]);
var zContent = z.object({
  content_hash: z.union([
    z.string(),
    z.null()
  ]).optional(),
  content_id: z.union([
    z.string(),
    z.null()
  ]).optional(),
  url: z.string().url()
});
var zApiPurchase = z.object({
  checkout: zApiCheckout,
  content: z.array(zContent).optional(),
  content_ids: z.array(z.string()),
  id: z.string().uuid(),
  message_id: z.string().uuid(),
  paid_at: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  price_cents: z.number().int().gte(0),
  requested_at: z.string().datetime()
});
var zApiTurnAction = z.object({
  action: z.string(),
  content_ids: z.array(z.string()),
  price_cents: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional()
});
var zStageScores = z.object({
  aftercare: z.number(),
  close: z.number(),
  offer: z.number(),
  rapport: z.number(),
  tease: z.number()
});
var zStepCall = z.object({
  arguments: z.unknown(),
  content_ids: z.array(z.string()).optional(),
  name: z.string(),
  result: z.string()
});
var zStepUsage = z.object({
  cached_tokens: z.coerce.bigint().gte(BigInt(0)).optional(),
  completion_tokens: z.coerce.bigint().gte(BigInt(0)),
  cost_usd: z.number(),
  prompt_tokens: z.coerce.bigint().gte(BigInt(0))
});
var zTurnStep = z.object({
  calls: z.array(zStepCall).optional(),
  model: z.union([
    z.string(),
    z.null()
  ]).optional(),
  private_text: z.union([
    z.string(),
    z.null()
  ]).optional(),
  reasoning: z.union([
    z.string(),
    z.null()
  ]).optional(),
  usage: z.union([
    zStepUsage,
    z.null()
  ]).optional()
});
var zApiTurn = z.object({
  actions: z.array(zApiTurnAction),
  cost_usd: z.union([
    z.number(),
    z.null()
  ]).optional(),
  finished_at: z.string().datetime(),
  id: z.string().uuid(),
  model: z.union([
    z.string(),
    z.null()
  ]).optional(),
  readiness: z.union([
    z.number().int().gte(0),
    z.null()
  ]).optional(),
  seconds: z.union([
    z.number(),
    z.null()
  ]).optional(),
  stage: z.union([
    z.string(),
    z.null()
  ]).optional(),
  stage_scores: z.union([
    zStageScores,
    z.null()
  ]).optional(),
  started_at: z.string().datetime(),
  steps: z.union([
    z.array(zTurnStep),
    z.null()
  ]).optional()
});
var zApiUserWithStats = z.object({
  attributes: z.array(zApiAttribute),
  created_date: z.string().datetime(),
  freeform: z.string(),
  id: z.string(),
  latest_message_time: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  message_count: z.coerce.bigint(),
  username: z.string()
});
var zVoiceModelName = z.enum([
  "drama-3"
]);
var zApiVoice = z.object({
  built_in: z.boolean(),
  clip_transcript: z.union([
    z.string(),
    z.null()
  ]).optional(),
  clip_url: z.union([
    z.string(),
    z.null()
  ]).optional(),
  id: z.string().uuid(),
  kind: z.string(),
  model: zVoiceModelName,
  name: z.string(),
  used_by: z.array(z.string())
});
var zApiVoiceNote = z.object({
  duration_ms: z.number().int().gte(0),
  format: z.string(),
  transcript: z.string(),
  url: z.string()
});
var zImageSendingBehaviour = z.enum([
  "disabled",
  "low",
  "moderate",
  "high",
  "aggressive"
]);
var zLanguage = z.enum([
  "en",
  "de",
  "ru",
  "ar",
  "es",
  "nl",
  "uk",
  "fr",
  "it"
]);
var zMessage = z.object({
  video_transcript: z.union([
    z.string().readonly(),
    z.null()
  ]).readonly().optional(),
  attached_media: z.union([
    zContent,
    z.null()
  ]).optional(),
  attached_media_items: z.union([
    z.array(zContent),
    z.null()
  ]).optional(),
  from_bot: z.boolean(),
  id: z.union([
    z.string().uuid(),
    z.null()
  ]).optional(),
  lock: z.union([
    zApiMessageLock,
    z.null()
  ]).optional(),
  message_tone: z.union([
    z.string(),
    z.null()
  ]).optional(),
  moderation: z.union([
    zApiModerationInfo,
    z.null()
  ]).optional(),
  sent_at: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  text: z.string(),
  voice: z.union([
    zApiVoiceNote,
    z.null()
  ]).optional()
});
var zCreateConversationRequest = z.object({
  bot_id: z.string().uuid(),
  create_user_if_not_exists: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  freeform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  image_sending_behaviour: z.union([
    zImageSendingBehaviour,
    z.null()
  ]).optional(),
  language: z.union([
    zLanguage,
    z.null()
  ]).optional(),
  platform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  segment: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  timezone: z.union([
    z.string(),
    z.null()
  ]).optional(),
  user_id: z.string(),
  webhook: z.union([
    z.string().url(),
    z.null()
  ]).optional(),
  with_messages: z.union([
    z.array(zMessage),
    z.null()
  ]).optional()
});
var zAddMessageRequest = z.object({
  conversation_creation_params: zCreateConversationRequest,
  create_user_if_not_exists: z.boolean().optional(),
  message: zMessage
});
var zConversation = z.object({
  bot_id: z.string().uuid(),
  id: z.string(),
  messages: z.array(zMessage),
  user_id: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zAddMessageResponse = z.object({
  conversation: zConversation,
  created_conversation: z.boolean()
});
var zAdvanceClockRequest = z.object({
  revision: z.number().int().gte(0),
  seconds: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional()
});
var zFollowUpExplanation = z.object({
  at: z.string().datetime(),
  automatic_at: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  hold_until: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  idle_at: z.string().datetime(),
  picked_at: z.string().datetime(),
  reminder_at: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  source: z.string(),
  spacing_at: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  zone: z.string()
});
var zFollowUpReminder = z.object({
  at: z.string().datetime(),
  intent: z.string()
});
var zSentFollowUpView = z.object({
  id: z.string(),
  replied_at: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  sent_at: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  source: z.string(),
  started_at: z.string().datetime(),
  status: z.string(),
  text: z.string()
});
var zContactHours = z.object({
  end: z.string(),
  start: z.string()
});
var zFollowUpSettings = z.object({
  automatic_enabled: z.boolean(),
  cadence_hours: z.array(z.number().int().gte(0)),
  contact_window: zContactHours,
  enabled: z.boolean(),
  fallback_timezone: z.string(),
  max_unanswered: z.number().int().gte(0),
  min_idle_minutes: z.number().int().gte(0),
  scheduled_enabled: z.boolean()
});
var zNextFollowUp = z.object({
  bot_enabled: z.boolean(),
  enabled: z.boolean(),
  explanation: z.union([
    zFollowUpExplanation,
    z.null()
  ]).optional(),
  external: z.boolean(),
  failures: z.number().int().gte(0),
  hold_until: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  last_follow_up_at: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  last_message_at: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  max_unanswered: z.number().int().gte(0),
  next_at: z.union([
    z.string().datetime(),
    z.null()
  ]).optional(),
  override: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  reminder: z.union([
    zFollowUpReminder,
    z.null()
  ]).optional(),
  revision: z.number().int().gte(0),
  sent: z.array(zSentFollowUpView),
  settings: zFollowUpSettings,
  source: z.union([
    z.string(),
    z.null()
  ]).optional(),
  status: z.string(),
  step: z.union([
    z.number().int().gte(0),
    z.null()
  ]).optional(),
  steps: z.number().int().gte(0),
  timezone: z.string(),
  unanswered: z.number().int().gte(0)
});
var zTestClockResponse = z.object({
  now: z.string().datetime(),
  revision: z.number().int().gte(0),
  source_conversation_id: z.string()
});
var zAdvanceClockResponse = z.object({
  follow_up: zNextFollowUp,
  test_clock: zTestClockResponse
});
var zApiKeyInfo = z.object({
  created_at: z.string().datetime(),
  id: z.string().uuid(),
  is_active: z.boolean(),
  key_prefix: z.string(),
  name: z.string()
});
var zAudioFormat = z.enum([
  "ogg_opus",
  "mpeg"
]);
var zBotSelling = z.object({
  checkout_link_in_text: z.boolean(),
  max_price_cents: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  min_price_cents: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  payment_mode: z.string(),
  payment_rails: z.union([
    z.string(),
    z.null()
  ]).optional(),
  selling_style: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zBotKnobs = z.object({
  bundles: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  discount: z.union([
    z.string(),
    z.null()
  ]).optional(),
  emoji_amount: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  first_price_cents: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  free_nudes: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  message_length: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  pace: z.union([
    z.string(),
    z.null()
  ]).optional(),
  personality_shy_bold: z.union([
    z.number(),
    z.null()
  ]).optional(),
  personality_sweet_bratty: z.union([
    z.number(),
    z.null()
  ]).optional(),
  price_step_cents: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  vibe: z.union([
    z.string(),
    z.null()
  ]).optional(),
  welcome_back_days: z.union([
    z.number().int(),
    z.null()
  ]).optional()
});
var zBot = zBotSelling.and(zBotKnobs).and(z.object({
  assigned_voice_id: z.union([
    z.string().uuid(),
    z.null()
  ]).optional(),
  attributes: z.array(zApiAttribute),
  follow_ups: zFollowUpSettings,
  freeform: z.string(),
  id: z.string().uuid(),
  name: z.string(),
  orientation: zApiOrientation,
  voice_enabled: z.boolean()
}));
var zChatter = z.object({
  id: z.string().uuid(),
  username: z.string()
});
var zChatterLoginRequest = z.object({
  password: z.string(),
  username: z.string()
});
var zChatterLoginResponse = z.object({
  chatter_id: z.string().uuid(),
  token: z.string()
});
var zClientConfig = z.object({
  chat_images_enabled: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  image_sending_behaviour: z.union([
    zApiImageSendingBehaviour,
    z.null()
  ]).optional(),
  language: z.union([
    zLanguage,
    z.null()
  ]).optional(),
  max_delay: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  min_delay: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  platform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  segment: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  timezone: z.union([
    z.string(),
    z.null()
  ]).optional(),
  typing_speed: z.union([
    z.number(),
    z.null()
  ]).optional(),
  webhook: z.union([
    z.string().url(),
    z.null()
  ]).optional()
});
var zCloneVoiceResponse = z.object({
  bot: zBot
});
var zSearchedMessage = z.object({
  from_bot: z.boolean(),
  match_end: z.number().int().gte(0),
  match_start: z.number().int().gte(0),
  message_text: z.string(),
  moderation: z.union([
    zApiModerationInfo,
    z.null()
  ]).optional(),
  sent_at: z.coerce.bigint()
});
var zConversationHeader = z.object({
  bot_id: z.string().uuid(),
  id: z.string(),
  last_message: z.union([
    zMessage,
    z.null()
  ]).optional(),
  message_count: z.number().int().gte(0),
  platform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  platform_id: z.union([
    z.string().uuid(),
    z.null()
  ]).optional(),
  searched_message: z.union([
    zSearchedMessage,
    z.null()
  ]).optional(),
  user_id: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zFanValue = z.object({
  average_price_cents: z.union([
    z.coerce.bigint().gte(BigInt(0)),
    z.null()
  ]).optional(),
  bounds_cents: z.union([
    z.array(z.number().int().gte(0)),
    z.null()
  ]).optional(),
  purchases: z.number().int().gte(0),
  spent_cents: z.coerce.bigint().gte(BigInt(0)),
  spent_this_session_cents: z.coerce.bigint().gte(BigInt(0))
});
var zLockConversion = z.object({
  median_seconds_to_pay: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  offered: z.number().int().gte(0),
  paid: z.number().int().gte(0)
});
var zOpenOffer = z.object({
  content_ids: z.array(z.string()),
  offered_at: z.string().datetime(),
  price_cents: z.number().int().gte(0),
  purchase_id: z.string()
});
var zPricePoint = z.object({
  at: z.string().datetime(),
  paid: z.boolean(),
  price_cents: z.number().int().gte(0)
});
var zSession = z.object({
  ended_at: z.string().datetime(),
  messages: z.number().int().gte(0),
  photos: z.number().int().gte(0),
  spent_cents: z.coerce.bigint().gte(BigInt(0)),
  started_at: z.string().datetime()
});
var zPhotoStatus = z.enum([
  "not_sent",
  "sent",
  "locked",
  "unlocked"
]);
var zPhotoTag = z.enum([
  "sfw",
  "risky",
  "nude"
]);
var zGridPhoto = z.object({
  content_id: z.string(),
  name: z.union([
    z.string(),
    z.null()
  ]).optional(),
  status: zPhotoStatus,
  tag: z.union([
    zPhotoTag,
    z.null()
  ]).optional(),
  thumbnail_url: z.string(),
  video_url: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zSetGrid = z.object({
  current: z.boolean(),
  description: z.union([
    z.string(),
    z.null()
  ]).optional(),
  name: z.string(),
  photos: z.array(zGridPhoto),
  set_id: z.string()
});
var zConversationInsights = z.object({
  fan_value: zFanValue,
  locks: zLockConversion,
  open_offers: z.array(zOpenOffer),
  price_line: z.array(zPricePoint),
  readiness_now: z.union([
    z.number().int().gte(0),
    z.null()
  ]).optional(),
  sessions: z.array(zSession),
  sets: z.array(zSetGrid),
  stage_now: z.union([
    zStageScores,
    z.null()
  ]).optional()
});
var zCreateApiKeyRequest = z.object({
  name: z.string()
});
var zCreateApiKeyResponse = z.object({
  api_key: z.string(),
  key_info: zApiKeyInfo
});
var zCreateBotRequestBody = z.object({
  attributes: z.array(zApiAttribute).optional(),
  freeform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  name: z.string(),
  orientation: z.union([
    zApiOrientation,
    z.null()
  ]).optional()
});
var zCreateBotResponse = z.object({
  bot: zBot
});
var zCreateChatterRequestBody = z.object({
  username: z.string()
});
var zCreateChatterResponse = z.object({
  chatter: zChatter,
  password: z.string()
});
var zCreateClipVoiceForm = z.object({
  clip: z.string(),
  name: z.string(),
  transcript: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zCreateConversationResponse = z.object({
  conversation: zConversation
});
var zCreateConversionRequestBody = z.object({
  amount: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  bot_id: z.union([
    z.string(),
    z.null()
  ]).optional(),
  conversation_id: z.union([
    z.string(),
    z.null()
  ]).optional(),
  metadata: z.unknown().optional(),
  timestamp: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  user_id: z.string()
});
var zCreateLibraryVoiceRequest = z.object({
  library_voice_id: z.string(),
  name: z.string()
});
var zCreateSetRequest = z.object({
  bot_id: z.string().uuid(),
  name: z.string()
});
var zCreateUserRequestBody = z.object({
  attributes: z.array(zApiAttribute).optional(),
  freeform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  id: z.string(),
  username: z.string()
});
var zUser = z.object({
  attributes: z.array(zApiAttribute),
  freeform: z.string(),
  id: z.string(),
  username: z.string()
});
var zCreateUserResponse = z.object({
  user: zUser
});
var zDeactivateApiKeyResponse = z.object({
  message: z.string()
});
var zDeleteContentResponse = z.object({
  message: z.string()
});
var zVaultImageBehaviour = z.enum([
  "force",
  "never"
]);
var zGenerateResponseSyncRequest = z.object({
  batch_size: z.number().int().gte(0).optional(),
  degrade_grammar_factor: z.union([
    z.number(),
    z.null()
  ]).optional(),
  override_messages: z.union([
    z.array(zMessage),
    z.null()
  ]).optional(),
  vault_image_behaviour: z.union([
    zVaultImageBehaviour,
    z.null()
  ]).optional()
});
var zResponseCandidate = z.object({
  messages: z.array(zMessage)
});
var zGenerateResponseSyncResponse = z.object({
  candidates: z.array(zResponseCandidate)
});
var zGetBotResponse = z.object({
  bot: zBot
});
var zGetChatterResponse = z.object({
  chatter: zChatter
});
var zGetClientConfigResponse = z.object({
  config: zClientConfig
});
var zSummary = z.object({
  created_at: z.coerce.bigint(),
  message_count: z.number().int().gte(0),
  summary_text: z.string()
});
var zGetConversationResponse = z.object({
  bot_id: z.string().uuid(),
  follow_up: zNextFollowUp,
  freeform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  insights: z.union([
    zConversationInsights,
    z.null()
  ]).optional(),
  is_typing: z.boolean(),
  latest_summary: z.union([
    zSummary,
    z.null()
  ]).optional(),
  messages: z.array(zMessage),
  platform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  purchases: z.array(zApiPurchase),
  segment: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  test_clock: z.union([
    zTestClockResponse,
    z.null()
  ]).optional(),
  turns: z.array(zApiTurn),
  user_id: z.union([
    z.string(),
    z.null()
  ]).optional(),
  webhook: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zMemoryResponse = z.object({
  text: z.string()
});
var zGetMemoriesResponse = z.object({
  bot_memories: z.array(zMemoryResponse),
  user_memories: z.array(zMemoryResponse)
});
var zPlatform = z.object({
  custom_instruction: z.union([
    z.string(),
    z.null()
  ]).optional(),
  id: z.string(),
  name: z.string()
});
var zGetPlatformResponse = z.object({
  platform: zPlatform
});
var zGetUserResponse = z.object({
  user: zUser
});
var zImageItem = z.object({
  new_id: z.union([
    z.string(),
    z.null()
  ]).optional(),
  public: z.boolean(),
  url: z.string()
});
var zListApiKeysResponse = z.object({
  api_keys: z.array(zApiKeyInfo)
});
var zListBotsResponse = z.object({
  bots: z.array(zBot)
});
var zListChattersResponse = z.object({
  chatters: z.array(zChatter)
});
var zMediaTypeFilter = z.enum([
  "image",
  "video"
]);
var zListContentQuery = z.object({
  bot_id: z.union([
    z.string().uuid(),
    z.null()
  ]).optional(),
  limit: z.union([
    z.number().int().gte(0),
    z.null()
  ]).optional(),
  media_type: z.union([
    zMediaTypeFilter,
    z.null()
  ]).optional(),
  search: z.union([
    z.string(),
    z.null()
  ]).optional(),
  user_id: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zListContentResponse = z.object({
  content: z.array(zContent),
  private_content: z.array(zContent),
  public_content: z.array(zContent)
});
var zListConversationsResponse = z.object({
  conversations: z.array(zConversationHeader)
});
var zListPlatformsResponse = z.object({
  platforms: z.array(zPlatform)
});
var zListSetsResponse = z.object({
  sets: z.array(zApiContentSet)
});
var zListUsersResponse = z.object({
  has_more: z.boolean(),
  limit: z.coerce.bigint(),
  offset: z.coerce.bigint(),
  total_count: z.coerce.bigint(),
  users: z.array(zApiUserWithStats)
});
var zListVoicesResponse = z.object({
  voices: z.array(zApiVoice)
});
var zMarkPurchasePaidResponse = z.object({
  purchase: zApiPurchase
});
var zRenameVoiceRequest = z.object({
  name: z.string()
});
var zReplySuggestion = z.object({
  text: z.string(),
  tone: z.string()
});
var zSendMessageRequest = z.object({
  message: zMessage
});
var zSetItemsRequest = z.object({
  content_ids: z.array(z.string())
});
var zSpeechRequest = z.object({
  bot_id: z.string(),
  format: z.union([
    zAudioFormat,
    z.null()
  ]).optional(),
  message: z.string(),
  url: z.union([
    z.boolean(),
    z.null()
  ]).optional()
});
var zSuggestRepliesResponse = z.object({
  suggestions: z.array(zReplySuggestion)
});
var zTestCopyResponse = z.object({
  conversation_id: z.string()
});
var zUpdateBotRequest = z.object({
  assigned_voice_id: z.union([
    z.string().uuid(),
    z.null()
  ]).optional(),
  attributes: z.array(zApiAttribute).optional(),
  bundles: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  checkout_link_in_text: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  discount: z.union([
    z.string(),
    z.null()
  ]).optional(),
  emoji_amount: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  first_price_cents: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  follow_ups: z.union([
    zFollowUpSettings,
    z.null()
  ]).optional(),
  free_nudes: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  freeform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  images: z.union([
    z.array(zImageItem),
    z.null()
  ]).optional(),
  max_price_cents: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  message_length: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  min_price_cents: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  name: z.union([
    z.string(),
    z.null()
  ]).optional(),
  orientation: z.union([
    zApiOrientation,
    z.null()
  ]).optional(),
  pace: z.union([
    z.string(),
    z.null()
  ]).optional(),
  payment_mode: z.union([
    z.string(),
    z.null()
  ]).optional(),
  payment_rails: z.union([
    z.string(),
    z.null()
  ]).optional(),
  personality_shy_bold: z.union([
    z.number(),
    z.null()
  ]).optional(),
  personality_sweet_bratty: z.union([
    z.number(),
    z.null()
  ]).optional(),
  price_step_cents: z.union([
    z.coerce.bigint(),
    z.null()
  ]).optional(),
  selling_style: z.union([
    z.string(),
    z.null()
  ]).optional(),
  vibe: z.union([
    z.string(),
    z.null()
  ]).optional(),
  voice_enabled: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  welcome_back_days: z.union([
    z.number().int(),
    z.null()
  ]).optional()
});
var zUpdateBotResponse = z.object({
  bot: zBot
});
var zUpdateClientConfigRequest = z.object({
  chat_images_enabled: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  image_sending_behaviour: z.union([
    zApiImageSendingBehaviour,
    z.null()
  ]).optional(),
  language: z.union([
    zLanguage,
    z.null()
  ]).optional(),
  max_delay: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  min_delay: z.union([
    z.number().int(),
    z.null()
  ]).optional(),
  platform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  segment: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  timezone: z.union([
    z.string(),
    z.null()
  ]).optional(),
  typing_speed: z.union([
    z.number(),
    z.null()
  ]).optional(),
  webhook: z.union([
    z.string().url(),
    z.null()
  ]).optional()
});
var zUpdateClientConfigResponse = z.object({
  config: zClientConfig
});
var zUpdateConversationRequestBody = z.object({
  contact_timezone: z.union([
    z.string(),
    z.null()
  ]).optional(),
  freeform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  image_sending_behaviour: z.union([
    zImageSendingBehaviour,
    z.null()
  ]).optional(),
  language: z.union([
    zLanguage,
    z.null()
  ]).optional(),
  platform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  segment: z.union([
    z.boolean(),
    z.null()
  ]).optional(),
  timezone: z.union([
    z.string(),
    z.null()
  ]).optional(),
  webhook: z.union([
    z.string().url(),
    z.null()
  ]).optional()
});
var zUpdateConversationResponse = z.object({
  success: z.boolean()
});
var zUpdatePlatformRequestBody = z.object({
  custom_instruction: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zUpdatePlatformResponse = z.object({
  success: z.boolean()
});
var zUpdateSetRequest = z.object({
  name: z.string()
});
var zUpdateUserRequest = z.object({
  attributes: z.array(zApiAttribute).optional(),
  freeform: z.union([
    z.string(),
    z.null()
  ]).optional(),
  username: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zUpdateUserResponse = z.object({
  user: zUser
});
var zUploadContentRequest = z.object({
  bot_id: z.union([
    z.string().uuid(),
    z.null()
  ]).optional(),
  image_url: z.string(),
  public: z.boolean().optional(),
  user_id: z.union([
    z.string(),
    z.null()
  ]).optional()
});
var zUploadContentResponse = z.object({
  content: zContent,
  created: z.boolean()
});
var zVoiceSampleRequest = z.object({
  text: z.string()
});
var zSetFollowUpOverrideRequest = z.object({
  override: z.union([
    z.boolean(),
    z.null()
  ]).optional()
});
var zFollowUpActionKind = z.enum([
  "push_back",
  "skip",
  "cancel_reminder",
  "restart",
  "reset"
]);
var zFollowUpActionRequest = z.object({
  action: zFollowUpActionKind,
  hours: z.union([
    z.number().int().gte(0),
    z.null()
  ]).optional(),
  revision: z.number().int().gte(0)
});
var zFollowUpPreviewResponse = z.object({
  messages: z.array(zMessage)
});
var zListApiKeysData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.never().optional()
});
var zCreateApiKeyData = z.object({
  body: zCreateApiKeyRequest,
  path: z.never().optional(),
  query: z.never().optional()
});
var zDeactivateApiKeyData = z.object({
  body: z.never().optional(),
  path: z.object({
    key_id: z.string()
  }),
  query: z.never().optional()
});
var zChatterLoginData = z.object({
  body: zChatterLoginRequest,
  path: z.never().optional(),
  query: z.never().optional()
});
var zCloneVoiceData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.object({
    bot_id: z.string()
  })
});
var zListBotsData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.never().optional()
});
var zCreateBotData = z.object({
  body: zCreateBotRequestBody,
  path: z.never().optional(),
  query: z.never().optional()
});
var zDeleteBotData = z.object({
  body: z.never().optional(),
  path: z.object({
    bot_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zDeleteBotResponse = z.void();
var zGetBotData = z.object({
  body: z.never().optional(),
  path: z.object({
    bot_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zUpdateBotData = z.object({
  body: zUpdateBotRequest,
  path: z.object({
    bot_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zListChattersData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.never().optional()
});
var zCreateChatterData = z.object({
  body: zCreateChatterRequestBody,
  path: z.never().optional(),
  query: z.never().optional()
});
var zDeactivateChatterData = z.object({
  body: z.never().optional(),
  path: z.object({
    chatter_id: z.string()
  }),
  query: z.never().optional()
});
var zDeactivateChatterResponse = z.void();
var zGetChatterData = z.object({
  body: z.never().optional(),
  path: z.object({
    chatter_id: z.string()
  }),
  query: z.never().optional()
});
var zGetClientConfigData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.never().optional()
});
var zUpdateClientConfigData = z.object({
  body: zUpdateClientConfigRequest,
  path: z.never().optional(),
  query: z.never().optional()
});
var zListContentData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.object({
    bot_id: z.union([
      z.string(),
      z.null()
    ]).optional(),
    user_id: z.union([
      z.string(),
      z.null()
    ]).optional(),
    limit: z.union([
      z.number().int().gte(0),
      z.null()
    ]).optional(),
    search: z.union([
      z.string(),
      z.null()
    ]).optional(),
    media_type: z.union([
      zMediaTypeFilter,
      z.null()
    ]).optional()
  }).optional()
});
var zUploadContentData = z.object({
  body: zUploadContentRequest,
  path: z.never().optional(),
  query: z.never().optional()
});
var zDeleteContentData = z.object({
  body: z.never().optional(),
  path: z.object({
    content_id: z.string()
  }),
  query: z.never().optional()
});
var zListConversationsData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.object({
    bot_id: z.union([
      z.string(),
      z.null()
    ]).optional(),
    user_id: z.union([
      z.string(),
      z.null()
    ]).optional(),
    conversation_id: z.union([
      z.string(),
      z.null()
    ]).optional(),
    min_messages: z.union([
      z.number().int(),
      z.null()
    ]).optional(),
    max_messages: z.union([
      z.number().int(),
      z.null()
    ]).optional(),
    message_content: z.union([
      z.string(),
      z.null()
    ]).optional(),
    min_last_message_date: z.union([
      z.number().int(),
      z.null()
    ]).optional(),
    max_last_message_date: z.union([
      z.number().int(),
      z.null()
    ]).optional(),
    severities: z.union([
      z.array(z.string()),
      z.null()
    ]).optional(),
    categories: z.union([
      z.array(z.string()),
      z.null()
    ]).optional(),
    platform_ids: z.union([
      z.array(z.string()),
      z.null()
    ]).optional(),
    limit: z.union([
      z.coerce.bigint(),
      z.null()
    ]).optional(),
    offset: z.union([
      z.coerce.bigint(),
      z.null()
    ]).optional()
  }).optional()
});
var zCreateConversationData = z.object({
  body: zCreateConversationRequest,
  path: z.never().optional(),
  query: z.never().optional()
});
var zUpdateConversationData = z.object({
  body: zUpdateConversationRequestBody,
  path: z.object({
    conversation_id: z.string()
  }),
  query: z.never().optional()
});
var zGetConversationData = z.object({
  body: z.never().optional(),
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zGenerateResponseSyncData = z.object({
  body: zGenerateResponseSyncRequest,
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zGetMemoriesData = z.object({
  body: z.never().optional(),
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zSendMessageData = z.object({
  body: zSendMessageRequest,
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zSuggestRepliesData = z.object({
  body: z.never().optional(),
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zAdvanceTestClockData = z.object({
  body: zAdvanceClockRequest,
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zCreateTestCopyData = z.object({
  body: z.never().optional(),
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zCreateConversionData = z.object({
  body: zCreateConversionRequestBody,
  path: z.never().optional(),
  query: z.never().optional()
});
var zSendMessageOrCreateConversationData = z.object({
  body: zAddMessageRequest,
  path: z.never().optional(),
  query: z.never().optional()
});
var zListPlatformsData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.never().optional()
});
var zGetPlatformData = z.object({
  body: z.never().optional(),
  path: z.object({
    platform_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zUpdatePlatformData = z.object({
  body: zUpdatePlatformRequestBody,
  path: z.object({
    platform_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zMarkPurchasePaidData = z.object({
  body: z.never().optional(),
  path: z.object({
    purchase_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zListSetsData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.object({
    bot_id: z.string().uuid()
  })
});
var zCreateSetData = z.object({
  body: zCreateSetRequest,
  path: z.never().optional(),
  query: z.never().optional()
});
var zDeleteSetData = z.object({
  body: z.never().optional(),
  path: z.object({
    set_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zDeleteSetResponse = z.void();
var zUpdateSetData = z.object({
  body: zUpdateSetRequest,
  path: z.object({
    set_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zSetSetItemsData = z.object({
  body: zSetItemsRequest,
  path: z.object({
    set_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zSpeakData = z.object({
  body: zSpeechRequest,
  path: z.never().optional(),
  query: z.never().optional()
});
var zListUsersData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.object({
    limit: z.union([
      z.coerce.bigint(),
      z.null()
    ]).optional(),
    offset: z.coerce.bigint().optional(),
    search_id: z.union([
      z.string(),
      z.null()
    ]).optional(),
    search_username: z.union([
      z.string(),
      z.null()
    ]).optional(),
    sort_by: z.string().optional(),
    sort_desc: z.boolean().optional()
  }).optional()
});
var zCreateUserData = z.object({
  body: zCreateUserRequestBody,
  path: z.never().optional(),
  query: z.never().optional()
});
var zDeleteUserData = z.object({
  body: z.never().optional(),
  path: z.object({
    user_id: z.string()
  }),
  query: z.never().optional()
});
var zDeleteUserResponse = z.void();
var zGetUserData = z.object({
  body: z.never().optional(),
  path: z.object({
    user_id: z.string()
  }),
  query: z.never().optional()
});
var zUpdateUserData = z.object({
  body: zUpdateUserRequest,
  path: z.object({
    user_id: z.string()
  }),
  query: z.never().optional()
});
var zListVoicesData = z.object({
  body: z.never().optional(),
  path: z.never().optional(),
  query: z.never().optional()
});
var zCreateClipVoiceData = z.object({
  body: zCreateClipVoiceForm,
  path: z.never().optional(),
  query: z.never().optional()
});
var zCreateLibraryVoiceData = z.object({
  body: zCreateLibraryVoiceRequest,
  path: z.never().optional(),
  query: z.never().optional()
});
var zDeleteVoiceData = z.object({
  body: z.never().optional(),
  path: z.object({
    voice_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zDeleteVoiceResponse = z.void();
var zRenameVoiceData = z.object({
  body: zRenameVoiceRequest,
  path: z.object({
    voice_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zVoiceSampleData = z.object({
  body: zVoiceSampleRequest,
  path: z.object({
    voice_id: z.string().uuid()
  }),
  query: z.never().optional()
});
var zSetFollowUpOverrideData = z.object({
  body: zSetFollowUpOverrideRequest,
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zFollowUpActionData = z.object({
  body: zFollowUpActionRequest,
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zPreviewFollowUpData = z.object({
  body: z.never().optional(),
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});
var zStartTestClockData = z.object({
  body: z.never().optional(),
  path: z.object({
    id: z.string()
  }),
  query: z.never().optional()
});

// src/client/core/bodySerializer.ts
var serializeFormDataPair = (data, key, value) => {
  if (typeof value === "string" || value instanceof Blob) {
    data.append(key, value);
  } else {
    data.append(key, JSON.stringify(value));
  }
};
var formDataBodySerializer = {
  bodySerializer: (body) => {
    const data = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      if (value === void 0 || value === null) {
        return;
      }
      if (Array.isArray(value)) {
        value.forEach((v) => serializeFormDataPair(data, key, v));
      } else {
        serializeFormDataPair(data, key, value);
      }
    });
    return data;
  }
};

// src/client/core/params.ts
var extraPrefixesMap = {
  $body_: "body",
  $headers_: "headers",
  $path_: "path",
  $query_: "query"
};
var extraPrefixes = Object.entries(extraPrefixesMap);

// src/client/client/client.ts
import axios from "axios";

// src/client/core/auth.ts
var getAuthToken = async (auth, callback) => {
  const token = typeof callback === "function" ? await callback(auth) : callback;
  if (!token) {
    return;
  }
  if (auth.scheme === "bearer") {
    return `Bearer ${token}`;
  }
  if (auth.scheme === "basic") {
    return `Basic ${btoa(token)}`;
  }
  return token;
};

// src/client/core/pathSerializer.ts
var separatorArrayExplode = (style) => {
  switch (style) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var separatorArrayNoExplode = (style) => {
  switch (style) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
};
var separatorObjectExplode = (style) => {
  switch (style) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var serializeArrayParam = ({
  allowReserved,
  explode,
  name,
  style,
  value
}) => {
  if (!explode) {
    const joinedValues2 = (allowReserved ? value : value.map((v) => encodeURIComponent(v))).join(separatorArrayNoExplode(style));
    switch (style) {
      case "label":
        return `.${joinedValues2}`;
      case "matrix":
        return `;${name}=${joinedValues2}`;
      case "simple":
        return joinedValues2;
      default:
        return `${name}=${joinedValues2}`;
    }
  }
  const separator = separatorArrayExplode(style);
  const joinedValues = value.map((v) => {
    if (style === "label" || style === "simple") {
      return allowReserved ? v : encodeURIComponent(v);
    }
    return serializePrimitiveParam({
      allowReserved,
      name,
      value: v
    });
  }).join(separator);
  return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};
var serializePrimitiveParam = ({
  allowReserved,
  name,
  value
}) => {
  if (value === void 0 || value === null) {
    return "";
  }
  if (typeof value === "object") {
    throw new Error(
      "Deeply-nested arrays/objects aren\u2019t supported. Provide your own `querySerializer()` to handle these."
    );
  }
  return `${name}=${allowReserved ? value : encodeURIComponent(value)}`;
};
var serializeObjectParam = ({
  allowReserved,
  explode,
  name,
  style,
  value,
  valueOnly
}) => {
  if (value instanceof Date) {
    return valueOnly ? value.toISOString() : `${name}=${value.toISOString()}`;
  }
  if (style !== "deepObject" && !explode) {
    let values = [];
    Object.entries(value).forEach(([key, v]) => {
      values = [
        ...values,
        key,
        allowReserved ? v : encodeURIComponent(v)
      ];
    });
    const joinedValues2 = values.join(",");
    switch (style) {
      case "form":
        return `${name}=${joinedValues2}`;
      case "label":
        return `.${joinedValues2}`;
      case "matrix":
        return `;${name}=${joinedValues2}`;
      default:
        return joinedValues2;
    }
  }
  const separator = separatorObjectExplode(style);
  const joinedValues = Object.entries(value).map(
    ([key, v]) => serializePrimitiveParam({
      allowReserved,
      name: style === "deepObject" ? `${name}[${key}]` : key,
      value: v
    })
  ).join(separator);
  return style === "label" || style === "matrix" ? separator + joinedValues : joinedValues;
};

// src/client/client/utils.ts
var PATH_PARAM_RE = /\{[^{}]+\}/g;
var defaultPathSerializer = ({ path, url: _url }) => {
  let url = _url;
  const matches = _url.match(PATH_PARAM_RE);
  if (matches) {
    for (const match of matches) {
      let explode = false;
      let name = match.substring(1, match.length - 1);
      let style = "simple";
      if (name.endsWith("*")) {
        explode = true;
        name = name.substring(0, name.length - 1);
      }
      if (name.startsWith(".")) {
        name = name.substring(1);
        style = "label";
      } else if (name.startsWith(";")) {
        name = name.substring(1);
        style = "matrix";
      }
      const value = path[name];
      if (value === void 0 || value === null) {
        continue;
      }
      if (Array.isArray(value)) {
        url = url.replace(
          match,
          serializeArrayParam({ explode, name, style, value })
        );
        continue;
      }
      if (typeof value === "object") {
        url = url.replace(
          match,
          serializeObjectParam({
            explode,
            name,
            style,
            value,
            valueOnly: true
          })
        );
        continue;
      }
      if (style === "matrix") {
        url = url.replace(
          match,
          `;${serializePrimitiveParam({
            name,
            value
          })}`
        );
        continue;
      }
      const replaceValue = encodeURIComponent(
        style === "label" ? `.${value}` : value
      );
      url = url.replace(match, replaceValue);
    }
  }
  return url;
};
var createQuerySerializer = ({
  allowReserved,
  array,
  object
} = {}) => {
  const querySerializer = (queryParams) => {
    const search = [];
    if (queryParams && typeof queryParams === "object") {
      for (const name in queryParams) {
        const value = queryParams[name];
        if (value === void 0 || value === null) {
          continue;
        }
        if (Array.isArray(value)) {
          const serializedArray = serializeArrayParam({
            allowReserved,
            explode: true,
            name,
            style: "form",
            value,
            ...array
          });
          if (serializedArray) search.push(serializedArray);
        } else if (typeof value === "object") {
          const serializedObject = serializeObjectParam({
            allowReserved,
            explode: true,
            name,
            style: "deepObject",
            value,
            ...object
          });
          if (serializedObject) search.push(serializedObject);
        } else {
          const serializedPrimitive = serializePrimitiveParam({
            allowReserved,
            name,
            value
          });
          if (serializedPrimitive) search.push(serializedPrimitive);
        }
      }
    }
    return search.join("&");
  };
  return querySerializer;
};
var setAuthParams = async ({
  security,
  ...options
}) => {
  for (const auth of security) {
    const token = await getAuthToken(auth, options.auth);
    if (!token) {
      continue;
    }
    const name = auth.name ?? "Authorization";
    switch (auth.in) {
      case "query":
        if (!options.query) {
          options.query = {};
        }
        options.query[name] = token;
        break;
      case "cookie": {
        const value = `${name}=${token}`;
        if ("Cookie" in options.headers && options.headers["Cookie"]) {
          options.headers["Cookie"] = `${options.headers["Cookie"]}; ${value}`;
        } else {
          options.headers["Cookie"] = value;
        }
        break;
      }
      case "header":
      default:
        options.headers[name] = token;
        break;
    }
    return;
  }
};
var buildUrl = (options) => {
  const url = getUrl({
    path: options.path,
    // let `paramsSerializer()` handle query params if it exists
    query: !options.paramsSerializer ? options.query : void 0,
    querySerializer: typeof options.querySerializer === "function" ? options.querySerializer : createQuerySerializer(options.querySerializer),
    url: options.url
  });
  return url;
};
var getUrl = ({
  path,
  query,
  querySerializer,
  url: _url
}) => {
  const pathUrl = _url.startsWith("/") ? _url : `/${_url}`;
  let url = pathUrl;
  if (path) {
    url = defaultPathSerializer({ path, url });
  }
  let search = query ? querySerializer(query) : "";
  if (search.startsWith("?")) {
    search = search.substring(1);
  }
  if (search) {
    url += `?${search}`;
  }
  return url;
};
var mergeConfigs = (a, b) => {
  const config = { ...a, ...b };
  config.headers = mergeHeaders(a.headers, b.headers);
  return config;
};
var axiosHeadersKeywords = [
  "common",
  "delete",
  "get",
  "head",
  "patch",
  "post",
  "put"
];
var mergeHeaders = (...headers) => {
  const mergedHeaders = {};
  for (const header of headers) {
    if (!header || typeof header !== "object") {
      continue;
    }
    const iterator = Object.entries(header);
    for (const [key, value] of iterator) {
      if (axiosHeadersKeywords.includes(
        key
      ) && typeof value === "object") {
        mergedHeaders[key] = {
          ...mergedHeaders[key],
          ...value
        };
      } else if (value === null) {
        delete mergedHeaders[key];
      } else if (Array.isArray(value)) {
        for (const v of value) {
          mergedHeaders[key] = [...mergedHeaders[key] ?? [], v];
        }
      } else if (value !== void 0) {
        mergedHeaders[key] = typeof value === "object" ? JSON.stringify(value) : value;
      }
    }
  }
  return mergedHeaders;
};
var createConfig = (override = {}) => ({
  ...override
});

// src/client/client/client.ts
var createClient = (config = {}) => {
  let _config = mergeConfigs(createConfig(), config);
  const { auth, ...configWithoutAuth } = _config;
  const instance = axios.create(configWithoutAuth);
  const getConfig = () => ({ ..._config });
  const setConfig = (config2) => {
    _config = mergeConfigs(_config, config2);
    instance.defaults = {
      ...instance.defaults,
      ..._config,
      // @ts-expect-error
      headers: mergeHeaders(instance.defaults.headers, _config.headers)
    };
    return getConfig();
  };
  const request = async (options) => {
    const opts = {
      ..._config,
      ...options,
      axios: options.axios ?? _config.axios ?? instance,
      headers: mergeHeaders(_config.headers, options.headers)
    };
    if (opts.security) {
      await setAuthParams({
        ...opts,
        security: opts.security
      });
    }
    if (opts.requestValidator) {
      await opts.requestValidator(opts);
    }
    if (opts.body && opts.bodySerializer) {
      opts.body = opts.bodySerializer(opts.body);
    }
    const url = buildUrl(opts);
    try {
      const _axios = opts.axios;
      const { auth: auth2, ...optsWithoutAuth } = opts;
      const response = await _axios({
        ...optsWithoutAuth,
        baseURL: opts.baseURL,
        data: opts.body,
        headers: opts.headers,
        // let `paramsSerializer()` handle query params if it exists
        params: opts.paramsSerializer ? opts.query : void 0,
        url
      });
      let { data } = response;
      if (opts.responseType === "json") {
        if (opts.responseValidator) {
          await opts.responseValidator(data);
        }
        if (opts.responseTransformer) {
          data = await opts.responseTransformer(data);
        }
      }
      return {
        ...response,
        data: data ?? {}
      };
    } catch (error) {
      const e = error;
      if (opts.throwOnError) {
        throw e;
      }
      e.error = e.response?.data ?? {};
      return e;
    }
  };
  return {
    buildUrl,
    delete: (options) => request({ ...options, method: "DELETE" }),
    get: (options) => request({ ...options, method: "GET" }),
    getConfig,
    head: (options) => request({ ...options, method: "HEAD" }),
    instance,
    options: (options) => request({ ...options, method: "OPTIONS" }),
    patch: (options) => request({ ...options, method: "PATCH" }),
    post: (options) => request({ ...options, method: "POST" }),
    put: (options) => request({ ...options, method: "PUT" }),
    request,
    setConfig
  };
};

// src/client/client.gen.ts
var client = createClient(createConfig({
  throwOnError: true
}));

// src/client/sdk.gen.ts
var listApiKeys = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/api-keys",
    ...options
  });
};
var createApiKey = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/api-keys",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var deactivateApiKey = (options) => {
  return (options.client ?? client).delete({
    responseType: "json",
    url: "/api/api-keys/{key_id}",
    ...options
  });
};
var listBots = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/bots",
    ...options
  });
};
var createBot = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/bots",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var deleteBot = (options) => {
  return (options.client ?? client).delete({
    url: "/api/bots/{bot_id}",
    ...options
  });
};
var getBot = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/bots/{bot_id}",
    ...options
  });
};
var updateBot = (options) => {
  return (options.client ?? client).put({
    responseType: "json",
    url: "/api/bots/{bot_id}",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var listChatters = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/chatters",
    ...options
  });
};
var createChatter = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/chatters",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var deactivateChatter = (options) => {
  return (options.client ?? client).delete({
    url: "/api/chatters/{chatter_id}",
    ...options
  });
};
var getChatter = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/chatters/{chatter_id}",
    ...options
  });
};
var getClientConfig = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/config",
    ...options
  });
};
var updateClientConfig = (options) => {
  return (options.client ?? client).patch({
    responseType: "json",
    url: "/api/config",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var listContent = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/content",
    ...options
  });
};
var uploadContent = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/content",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var deleteContent = (options) => {
  return (options.client ?? client).delete({
    responseType: "json",
    url: "/api/content/{content_id}",
    ...options
  });
};
var listConversations = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/conversations",
    ...options
  });
};
var createConversation = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/conversations",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var getConversation = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/conversations/{id}",
    ...options
  });
};
var generateResponseSync = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/conversations/{id}/generate-response",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var getMemories = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/conversations/{id}/memories",
    ...options
  });
};
var sendMessage = (options) => {
  return (options.client ?? client).post({
    url: "/api/conversations/{id}/messages",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var suggestReplies = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/conversations/{id}/suggestions",
    ...options
  });
};
var advanceTestClock = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/conversations/{id}/test-clock",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var createTestCopy = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/conversations/{id}/test-copy",
    ...options
  });
};
var createConversion = (options) => {
  return (options.client ?? client).post({
    url: "/api/conversion",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var listPlatforms = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/platforms",
    ...options
  });
};
var getPlatform = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/platforms/{platform_id}",
    ...options
  });
};
var updatePlatform = (options) => {
  return (options.client ?? client).patch({
    responseType: "json",
    url: "/api/platforms/{platform_id}",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var markPurchasePaid = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/purchases/{purchase_id}/paid",
    ...options
  });
};
var listSets = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/sets",
    ...options
  });
};
var createSet = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/sets",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var deleteSet = (options) => {
  return (options.client ?? client).delete({
    url: "/api/sets/{set_id}",
    ...options
  });
};
var updateSet = (options) => {
  return (options.client ?? client).put({
    responseType: "json",
    url: "/api/sets/{set_id}",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var setSetItems = (options) => {
  return (options.client ?? client).put({
    responseType: "json",
    url: "/api/sets/{set_id}/items",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var getUser = (options) => {
  return (options.client ?? client).get({
    responseType: "json",
    url: "/api/users/{user_id}",
    ...options
  });
};
var updateUser = (options) => {
  return (options.client ?? client).put({
    responseType: "json",
    url: "/api/users/{user_id}",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var listVoices = (options) => {
  return (options?.client ?? client).get({
    responseType: "json",
    url: "/api/voices",
    ...options
  });
};
var createClipVoice = (options) => {
  return (options.client ?? client).post({
    ...formDataBodySerializer,
    responseType: "json",
    url: "/api/voices",
    ...options,
    headers: {
      "Content-Type": null,
      ...options.headers
    }
  });
};
var createLibraryVoice = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/voices/library",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var deleteVoice = (options) => {
  return (options.client ?? client).delete({
    url: "/api/voices/{voice_id}",
    ...options
  });
};
var renameVoice = (options) => {
  return (options.client ?? client).patch({
    responseType: "json",
    url: "/api/voices/{voice_id}",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var voiceSample = (options) => {
  return (options.client ?? client).post({
    url: "/api/voices/{voice_id}/sample",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var setFollowUpOverride = (options) => {
  return (options.client ?? client).put({
    responseType: "json",
    url: "/api/conversations/{id}/follow-ups",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var followUpAction = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/conversations/{id}/follow-ups/actions",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });
};
var previewFollowUp = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/conversations/{id}/follow-ups/preview",
    ...options
  });
};
var startTestClock = (options) => {
  return (options.client ?? client).post({
    responseType: "json",
    url: "/api/conversations/{id}/test-clock/start",
    ...options
  });
};

// src/methods/followUps.ts
async function createTestCopyImpl(options) {
  const result = await createTestCopy({ path: options });
  return zTestCopyResponse.parse(result.data);
}
async function advanceTestClockImpl(options) {
  const { id, ...body } = options;
  const result = await advanceTestClock({ path: { id }, body });
  return zAdvanceClockResponse.parse(result.data);
}
async function setFollowUpOverrideImpl(options) {
  const { id, ...body } = options;
  const result = await setFollowUpOverride({ path: { id }, body });
  return zNextFollowUp.parse(result.data);
}
async function followUpActionImpl(options) {
  const { id, ...body } = options;
  const result = await followUpAction({ path: { id }, body });
  return zNextFollowUp.parse(result.data);
}
async function startTestClockImpl(options) {
  const result = await startTestClock({ path: options });
  return zAdvanceClockResponse.parse(result.data);
}
async function previewFollowUpImpl(options) {
  const result = await previewFollowUp({ path: options });
  return zFollowUpPreviewResponse.parse(result.data);
}

// src/methods/conversations.ts
async function createConversationImpl(options) {
  const result = await createConversation({
    body: {
      bot_id: options.bot_id,
      user_id: options.user_id,
      create_user_if_not_exists: options.create_user_if_not_exists,
      with_messages: options.with_messages?.map((msg) => ({
        ...msg,
        attached_media: msg.attached_media ? { content_id: "", url: msg.attached_media.url } : void 0
      }))
    }
  });
  return result.data;
}
async function listConversationsImpl(options) {
  const result = await listConversations({
    query: options
  });
  return result.data;
}
async function getConversationImpl(options) {
  const result = await getConversation({
    path: {
      id: options.id
    }
  });
  return result.data;
}
async function generateResponseImpl(options) {
  const result = await generateResponseSync({
    path: {
      id: options.id
    },
    body: {
      batch_size: options.batch_size
    }
  });
  return result.data;
}

// src/methods/bots.ts
async function createBotImpl(options) {
  const result = await createBot({
    body: options
  });
  return result.data;
}
async function listBotsImpl() {
  const result = await listBots();
  return result.data;
}
async function getBotImpl(options) {
  const result = await getBot({
    path: options
  });
  return result.data;
}
async function updateBotImpl(options) {
  const { bot_id, ...body } = options;
  const result = await updateBot({
    path: { bot_id },
    body
  });
  return result.data;
}
async function deleteBotImpl(options) {
  await deleteBot({
    path: options
  });
}

// src/methods/apiKeys.ts
async function listApiKeysImpl() {
  const result = await listApiKeys();
  return result.data;
}
async function createApiKeyImpl(options) {
  const result = await createApiKey({
    body: options
  });
  return result.data;
}
async function deactivateApiKeyImpl(options) {
  const result = await deactivateApiKey({
    path: options
  });
  return result.data;
}

// src/methods/content.ts
async function listContentImpl(options) {
  const result = await listContent({
    query: options
  });
  return result.data;
}
async function uploadContentImpl(options) {
  const result = await uploadContent({
    body: options
  });
  return result.data;
}
async function deleteContentImpl(options) {
  const result = await deleteContent({
    path: options
  });
  return result.data;
}

// src/methods/config.ts
async function getClientConfigImpl() {
  const result = await getClientConfig({ client: this["client"] });
  return result.data;
}
async function updateClientConfigImpl(options) {
  const result = await updateClientConfig({
    client: this["client"],
    body: options
  });
  return result.data;
}

// src/methods/chatters.ts
async function listChattersImpl() {
  const result = await listChatters();
  return result.data;
}
async function createChatterImpl(options) {
  const result = await createChatter({
    body: options
  });
  return result.data;
}
async function getChatterImpl(options) {
  const result = await getChatter({
    path: options
  });
  return result.data;
}
async function deactivateChatterImpl(options) {
  await deactivateChatter({
    path: options
  });
}

// src/methods/platforms.ts
async function listPlatformsImpl() {
  const result = await listPlatforms({});
  return result.data;
}
async function getPlatformImpl(options) {
  const result = await getPlatform({ path: options });
  return result.data;
}
async function updatePlatformImpl(options) {
  const { platform_id, ...body } = options;
  const result = await updatePlatform({
    path: { platform_id },
    body
  });
  return result.data;
}

// src/methods/conversions.ts
async function createConversionImpl(options) {
  await createConversion({ body: options });
}

// src/methods/purchases.ts
async function markPurchasePaidImpl(options) {
  const result = await markPurchasePaid({ path: options });
  return result.data;
}

// src/methods/sets.ts
async function createSetImpl(options) {
  const result = await createSet({ body: options });
  return result.data;
}
async function listSetsImpl(options) {
  const result = await listSets({ query: options });
  return result.data;
}
async function updateSetImpl(options) {
  const { set_id, ...body } = options;
  const result = await updateSet({ path: { set_id }, body });
  return result.data;
}
async function deleteSetImpl(options) {
  await deleteSet({ path: options });
}
async function setSetItemsImpl(options) {
  const { set_id, ...body } = options;
  const result = await setSetItems({ path: { set_id }, body });
  return result.data;
}

// src/methods/voices.ts
async function listVoicesImpl() {
  const result = await listVoices();
  return result.data;
}
async function createClipVoiceImpl(options) {
  const result = await createClipVoice({ body: options });
  return result.data;
}
async function createLibraryVoiceImpl(options) {
  const result = await createLibraryVoice({ body: options });
  return result.data;
}
async function renameVoiceImpl(options) {
  const { voice_id, ...body } = options;
  const result = await renameVoice({ path: { voice_id }, body });
  return result.data;
}
async function deleteVoiceImpl(options) {
  await deleteVoice({ path: options });
}
async function voiceSampleImpl(options) {
  const { voice_id, ...body } = options;
  const result = await voiceSample({ path: { voice_id }, body, responseType: "blob" });
  return result.data;
}

// src/methods/suggestions.ts
async function suggestRepliesImpl(options) {
  const result = await suggestReplies({ path: { id: options.conversation_id } });
  return result.data;
}

// src/conversation.ts
var Conversation = class _Conversation {
  constructor(client2, options, callbacks = {}) {
    __publicField(this, "client");
    __publicField(this, "conversationId");
    __publicField(this, "pollingInterval");
    __publicField(this, "pollingTimer");
    __publicField(this, "lastKnownMessageCount", 0);
    __publicField(this, "polling", false);
    __publicField(this, "lastKnownIsTyping", false);
    __publicField(this, "callbacks", {});
    __publicField(this, "isInitialized", false);
    this.client = client2;
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
  static async create(client2, options, callbacks = {}) {
    const instance = new _Conversation(client2, options, callbacks);
    const initialData = await instance.initialize(options);
    return { conversation: instance, initialData };
  }
  async initialize(options) {
    try {
      if ("conversation_id" in options) {
        this.conversationId = options.conversation_id;
      } else {
        const existingConversations = await this.client.listConversations({
          user_id: options.user_id,
          bot_id: options.bot_id
        });
        if (existingConversations.conversations.length > 0) {
          this.conversationId = existingConversations.conversations[0].id;
        } else {
          const conversation = await this.client.createConversation({
            user_id: options.user_id,
            bot_id: options.bot_id,
            create_user_if_not_exists: true
          });
          this.conversationId = conversation.conversation.id;
        }
      }
      const initialData = await this.client.getConversation({
        id: this.conversationId
      });
      this.lastKnownMessageCount = initialData.messages.length;
      this.lastKnownIsTyping = initialData.is_typing ?? false;
      this.isInitialized = true;
      if (this.callbacks.onInitialData) {
        this.callbacks.onInitialData(initialData);
      }
      this.startPolling();
      return initialData;
    } catch (error) {
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
      }
      throw error;
    }
  }
  startPolling() {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
    }
    this.pollingTimer = setInterval(async () => {
      if (this.polling || !this.isInitialized) return;
      this.polling = true;
      try {
        const data = await this.client.getConversation({
          id: this.conversationId
        });
        if (!this.isInitialized) return;
        this.callbacks.onMessages?.(data.messages);
        const isTyping = data.is_typing ?? false;
        if (isTyping !== this.lastKnownIsTyping) {
          this.lastKnownIsTyping = isTyping;
          this.callbacks.onTypingChange?.(isTyping);
        }
        if (data.messages.length > this.lastKnownMessageCount) {
          const newMessages = data.messages.slice(this.lastKnownMessageCount);
          this.lastKnownMessageCount = data.messages.length;
          for (const message of newMessages) {
            this.callbacks.onNewMessage?.(message);
          }
        }
      } catch (error) {
        if (this.callbacks.onError) {
          this.callbacks.onError(error);
        }
      } finally {
        this.polling = false;
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
  async sendMessage(text, attachedMedia) {
    if (!this.isInitialized) {
      throw new Error("Conversation not initialized");
    }
    const message = {
      text,
      from_bot: false,
      attached_media: attachedMedia,
      id: `temp-${Date.now()}`,
      sent_at: Math.floor(Date.now() / 1e3)
    };
    if (this.callbacks.onNewMessage) {
      this.callbacks.onNewMessage(message);
    }
    try {
      await sendMessage({
        path: {
          id: this.conversationId
        },
        body: {
          message: {
            text,
            from_bot: false,
            attached_media: attachedMedia ? { content_id: "", url: attachedMedia.url } : void 0
          }
        }
      });
      this.lastKnownMessageCount++;
    } catch (error) {
      if (this.callbacks.onError) {
        this.callbacks.onError(error);
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
    this.isInitialized = false;
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = void 0;
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
  async getMemories() {
    if (!this.isInitialized) {
      throw new Error("Conversation not initialized");
    }
    return (await getMemories({
      path: {
        id: this.conversationId
      }
    })).data;
  }
  /**
   * Generates bot response candidates without sending them
   */
  async generateResponse(batchSize) {
    if (!this.isInitialized) {
      throw new Error("Conversation not initialized");
    }
    return (await generateResponseSync({
      path: {
        id: this.conversationId
      },
      body: {
        batch_size: batchSize
      }
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
  get id() {
    return this.conversationId;
  }
};

// src/client.ts
var ApiError = class extends Error {
  constructor({
    message,
    status,
    method,
    url,
    payload
  }) {
    super(message);
    __publicField(this, "name", "ApiError");
    __publicField(this, "status");
    __publicField(this, "method");
    __publicField(this, "url");
    __publicField(this, "payload");
    this.status = status;
    this.method = method;
    this.url = url;
    this.payload = payload;
  }
};
var PrioriChat = class {
  constructor(api_token, baseURL) {
    __publicField(this, "client", client);
    __publicField(this, "authHeader");
    __publicField(this, "customHeaders", {});
    this.authHeader = api_token;
    this.client.setConfig({
      baseURL: baseURL || "https://api.prioros.com/v3/",
      throwOnError: true
    });
    this.setupAuthInterceptor();
    this.setupErrorInterceptor();
  }
  setAuthHeader(authHeader) {
    this.authHeader = authHeader;
    this.setupAuthInterceptor();
  }
  setHeaders(headers) {
    this.customHeaders = { ...headers };
    this.setupAuthInterceptor();
  }
  setupAuthInterceptor() {
    this.client.instance.interceptors.request.use((config) => {
      config.headers.set("Authorization", `Bearer ${this.authHeader}`);
      for (const [key, value] of Object.entries(this.customHeaders)) {
        config.headers.set(key, value);
      }
      return config;
    });
  }
  setupErrorInterceptor() {
    this.client.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const res = error.response;
        const req = res?.config;
        const data = res?.data;
        const status = res?.status;
        const method = req?.method?.toUpperCase();
        const url = req?.url;
        const hasJsonBody = res?.headers?.["content-type"]?.includes("application/json");
        const hasMessageField = data && typeof data === "object" && "message" in data;
        if (hasJsonBody && hasMessageField) {
          throw new ApiError({
            message: `[${status} ${res.statusText}] ${method} ${url} ? ${String(data.message)}`,
            status,
            method,
            url,
            payload: data
          });
        }
        const parts = [];
        if (status) parts.push(`[${status} ${res.statusText}]`);
        if (method && url) parts.push(`${method} ${url}`);
        if (data?.error) parts.push(`? ${String(data.error)}`);
        error.message = parts.join(" ") || error.message;
        error.meta = {
          status,
          method,
          url,
          payload: data,
          response: res
        };
        return Promise.reject(error);
      }
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
  async createConversation(options) {
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
  async listConversations(options) {
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
  async createTestCopy(options) {
    return createTestCopyImpl.call(this, options);
  }
  async advanceTestClock(options) {
    return advanceTestClockImpl.call(this, options);
  }
  /** On or off for this conversation only; `override: null` follows the bot. */
  async setFollowUpOverride(options) {
    return setFollowUpOverrideImpl.call(this, options);
  }
  /** push_back (with hours), skip, cancel_reminder, restart or reset; `revision` from the last read. */
  async followUpAction(options) {
    return followUpActionImpl.call(this, options);
  }
  /** Gives a chat with no outside channel its own test clock. */
  async startTestClock(options) {
    return startTestClockImpl.call(this, options);
  }
  /** The next follow-up as it would be written now; nothing is saved or sent. */
  async previewFollowUp(options) {
    return previewFollowUpImpl.call(this, options);
  }
  async getConversation(options) {
    return getConversationImpl.call(this, options);
  }
  /**
   * Generates bot response candidates for a conversation without sending them
   */
  async generateResponse(options) {
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
  async conversation(options, callbacks) {
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
  async createBot(options) {
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
  async listBots() {
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
  async getBot(options) {
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
  async updateBot(options) {
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
  async deleteBot(options) {
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
  async listApiKeys() {
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
  async createApiKey(options) {
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
  async deactivateApiKey(options) {
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
  async listContent(options) {
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
  async uploadContent(options) {
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
  async deleteContent(options) {
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
  async getClientConfig() {
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
  async updateClientConfig(options) {
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
  async getUser(options) {
    const response = await getUser({
      client: this.client,
      path: options
    });
    return response.data;
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
  async updateUser(options) {
    const { user_id, ...body } = options;
    const response = await updateUser({
      client: this.client,
      path: { user_id },
      body
    });
    return response.data;
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
  async listChatters() {
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
  async createChatter(options) {
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
  async getChatter(options) {
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
  async deactivateChatter(options) {
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
  async listPlatforms() {
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
  async getPlatform(options) {
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
  async updatePlatform(options) {
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
  async createConversion(options) {
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
  async markPurchasePaid(options) {
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
  async createSet(options) {
    return createSetImpl.call(this, options);
  }
  /** Lists a bot's content sets, oldest first, each with its items in suggested order. */
  async listSets(options) {
    return listSetsImpl.call(this, options);
  }
  /** Renames a content set or changes its description. */
  async updateSet(options) {
    return updateSetImpl.call(this, options);
  }
  /** Deletes a content set. Its items stay in the vault as loose items. */
  async deleteSet(options) {
    return deleteSetImpl.call(this, options);
  }
  /**
   * Replaces a content set's items and their suggested order. Items of the set left out become loose;
   * listed items leave any other set. Fails with 422 when an item is not this bot's content or is listed twice.
   */
  async setSetItems(options) {
    return setSetItemsImpl.call(this, options);
  }
  /** Lists the voices bots can speak with: the built-in ones, then the client's own, each with the bots using it. */
  async listVoices() {
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
  async createClipVoice(options) {
    return createClipVoiceImpl.call(this, options);
  }
  /** Adds a voice from the provider's library by its id there. */
  async createLibraryVoice(options) {
    return createLibraryVoiceImpl.call(this, options);
  }
  /** Renames one of the client's own voices. Built-in voices can't be renamed. */
  async renameVoice(options) {
    return renameVoiceImpl.call(this, options);
  }
  /** Deletes one of the client's own voices. Fails with 409 while a bot speaks with it. */
  async deleteVoice(options) {
    return deleteVoiceImpl.call(this, options);
  }
  /**
   * Suggests three replies the fan could send next: different lengths, some horny and some not. For testing a bot quickly; nothing is saved.
   */
  async suggestReplies(options) {
    return suggestRepliesImpl.call(this, options);
  }
  /** Records a line in a voice and returns it as MP3 audio. Nothing is saved. */
  async voiceSample(options) {
    return voiceSampleImpl.call(this, options);
  }
};
export {
  ApiError,
  Conversation,
  PrioriChat
};
