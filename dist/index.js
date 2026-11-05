"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ApiError: () => ApiError,
  Conversation: () => Conversation,
  PrioriChat: () => PrioriChat
});
module.exports = __toCommonJS(index_exports);

// src/client/zod.gen.ts
var import_zod = require("zod");
var zApiAttribute = import_zod.z.object({
  name: import_zod.z.string(),
  value: import_zod.z.string()
});
var zApiCheckout = import_zod.z.union([
  import_zod.z.object({
    type: import_zod.z.enum([
      "external"
    ])
  }),
  import_zod.z.object({
    payment_mode: import_zod.z.string(),
    type: import_zod.z.enum([
      "hosted"
    ]),
    url: import_zod.z.string()
  })
]);
var zApiPhotoLabel = import_zod.z.object({
  content_id: import_zod.z.string(),
  name: import_zod.z.string(),
  same_as: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  tag: import_zod.z.string()
});
var zApiContentSet = import_zod.z.object({
  bot_id: import_zod.z.string().uuid(),
  description: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  id: import_zod.z.string().uuid(),
  items: import_zod.z.array(import_zod.z.string()),
  name: import_zod.z.string(),
  photos: import_zod.z.array(zApiPhotoLabel)
});
var zApiImageSendingBehaviour = import_zod.z.enum([
  "disabled",
  "low",
  "moderate",
  "high",
  "aggressive"
]);
var zApiMessageLock = import_zod.z.object({
  checkout_url: import_zod.z.union([
    import_zod.z.string().url(),
    import_zod.z.null()
  ]).optional(),
  price_cents: import_zod.z.number().int().gte(0),
  purchase_id: import_zod.z.string().uuid(),
  unlocked: import_zod.z.boolean()
});
var zApiModerationCategory = import_zod.z.enum([
  "underage_site_use",
  "sexual_minors",
  "beastiality",
  "sexual_violence",
  "prompt_injection"
]);
var zApiModerationSeverity = import_zod.z.enum([
  "Low",
  "Medium",
  "High",
  "Critical"
]);
var zApiModerationInfo = import_zod.z.object({
  category: zApiModerationCategory,
  reasoning: import_zod.z.string(),
  severity: zApiModerationSeverity
});
var zApiOrientation = import_zod.z.enum([
  "straight_female",
  "lesbian_female",
  "gay_man",
  "straight_man",
  "trans_mtf",
  "trans_ftm",
  "bisexual"
]);
var zContent = import_zod.z.object({
  content_hash: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  content_id: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  url: import_zod.z.string().url()
});
var zApiPurchase = import_zod.z.object({
  checkout: zApiCheckout,
  content: import_zod.z.array(zContent).optional(),
  content_ids: import_zod.z.array(import_zod.z.string()),
  id: import_zod.z.string().uuid(),
  message_id: import_zod.z.string().uuid(),
  paid_at: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  price_cents: import_zod.z.number().int().gte(0),
  requested_at: import_zod.z.string().datetime()
});
var zApiTurnAction = import_zod.z.object({
  action: import_zod.z.string(),
  content_ids: import_zod.z.array(import_zod.z.string()),
  price_cents: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional()
});
var zStageScores = import_zod.z.object({
  aftercare: import_zod.z.number(),
  close: import_zod.z.number(),
  offer: import_zod.z.number(),
  rapport: import_zod.z.number(),
  tease: import_zod.z.number()
});
var zStepCall = import_zod.z.object({
  arguments: import_zod.z.unknown(),
  content_ids: import_zod.z.array(import_zod.z.string()).optional(),
  name: import_zod.z.string(),
  result: import_zod.z.string()
});
var zStepUsage = import_zod.z.object({
  cached_tokens: import_zod.z.coerce.bigint().gte(BigInt(0)).optional(),
  completion_tokens: import_zod.z.coerce.bigint().gte(BigInt(0)),
  cost_usd: import_zod.z.number(),
  prompt_tokens: import_zod.z.coerce.bigint().gte(BigInt(0))
});
var zTurnStep = import_zod.z.object({
  calls: import_zod.z.array(zStepCall).optional(),
  model: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  private_text: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  reasoning: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  usage: import_zod.z.union([
    zStepUsage,
    import_zod.z.null()
  ]).optional()
});
var zApiTurn = import_zod.z.object({
  actions: import_zod.z.array(zApiTurnAction),
  cost_usd: import_zod.z.union([
    import_zod.z.number(),
    import_zod.z.null()
  ]).optional(),
  finished_at: import_zod.z.string().datetime(),
  id: import_zod.z.string().uuid(),
  model: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  readiness: import_zod.z.union([
    import_zod.z.number().int().gte(0),
    import_zod.z.null()
  ]).optional(),
  seconds: import_zod.z.union([
    import_zod.z.number(),
    import_zod.z.null()
  ]).optional(),
  stage: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  stage_scores: import_zod.z.union([
    zStageScores,
    import_zod.z.null()
  ]).optional(),
  started_at: import_zod.z.string().datetime(),
  steps: import_zod.z.union([
    import_zod.z.array(zTurnStep),
    import_zod.z.null()
  ]).optional()
});
var zApiUserWithStats = import_zod.z.object({
  attributes: import_zod.z.array(zApiAttribute),
  created_date: import_zod.z.string().datetime(),
  freeform: import_zod.z.string(),
  id: import_zod.z.string(),
  latest_message_time: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  message_count: import_zod.z.coerce.bigint(),
  username: import_zod.z.string()
});
var zVoiceModelName = import_zod.z.enum([
  "drama-3"
]);
var zApiVoice = import_zod.z.object({
  built_in: import_zod.z.boolean(),
  clip_transcript: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  clip_url: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  id: import_zod.z.string().uuid(),
  kind: import_zod.z.string(),
  model: zVoiceModelName,
  name: import_zod.z.string(),
  used_by: import_zod.z.array(import_zod.z.string())
});
var zApiVoiceNote = import_zod.z.object({
  duration_ms: import_zod.z.number().int().gte(0),
  format: import_zod.z.string(),
  transcript: import_zod.z.string(),
  url: import_zod.z.string()
});
var zImageSendingBehaviour = import_zod.z.enum([
  "disabled",
  "low",
  "moderate",
  "high",
  "aggressive"
]);
var zLanguage = import_zod.z.enum([
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
var zMessage = import_zod.z.object({
  video_transcript: import_zod.z.union([
    import_zod.z.string().readonly(),
    import_zod.z.null()
  ]).readonly().optional(),
  attached_media: import_zod.z.union([
    zContent,
    import_zod.z.null()
  ]).optional(),
  attached_media_items: import_zod.z.union([
    import_zod.z.array(zContent),
    import_zod.z.null()
  ]).optional(),
  from_bot: import_zod.z.boolean(),
  id: import_zod.z.union([
    import_zod.z.string().uuid(),
    import_zod.z.null()
  ]).optional(),
  lock: import_zod.z.union([
    zApiMessageLock,
    import_zod.z.null()
  ]).optional(),
  message_tone: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  moderation: import_zod.z.union([
    zApiModerationInfo,
    import_zod.z.null()
  ]).optional(),
  sent_at: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  text: import_zod.z.string(),
  voice: import_zod.z.union([
    zApiVoiceNote,
    import_zod.z.null()
  ]).optional()
});
var zCreateConversationRequest = import_zod.z.object({
  bot_id: import_zod.z.string().uuid(),
  create_user_if_not_exists: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  freeform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  image_sending_behaviour: import_zod.z.union([
    zImageSendingBehaviour,
    import_zod.z.null()
  ]).optional(),
  language: import_zod.z.union([
    zLanguage,
    import_zod.z.null()
  ]).optional(),
  platform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  segment: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  timezone: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  user_id: import_zod.z.string(),
  webhook: import_zod.z.union([
    import_zod.z.string().url(),
    import_zod.z.null()
  ]).optional(),
  with_messages: import_zod.z.union([
    import_zod.z.array(zMessage),
    import_zod.z.null()
  ]).optional()
});
var zAddMessageRequest = import_zod.z.object({
  conversation_creation_params: zCreateConversationRequest,
  create_user_if_not_exists: import_zod.z.boolean().optional(),
  message: zMessage
});
var zConversation = import_zod.z.object({
  bot_id: import_zod.z.string().uuid(),
  id: import_zod.z.string(),
  messages: import_zod.z.array(zMessage),
  user_id: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zAddMessageResponse = import_zod.z.object({
  conversation: zConversation,
  created_conversation: import_zod.z.boolean()
});
var zAdvanceClockRequest = import_zod.z.object({
  revision: import_zod.z.number().int().gte(0),
  seconds: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional()
});
var zFollowUpExplanation = import_zod.z.object({
  at: import_zod.z.string().datetime(),
  automatic_at: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  hold_until: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  idle_at: import_zod.z.string().datetime(),
  picked_at: import_zod.z.string().datetime(),
  reminder_at: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  source: import_zod.z.string(),
  spacing_at: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  zone: import_zod.z.string()
});
var zFollowUpReminder = import_zod.z.object({
  at: import_zod.z.string().datetime(),
  intent: import_zod.z.string()
});
var zSentFollowUpView = import_zod.z.object({
  id: import_zod.z.string(),
  replied_at: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  sent_at: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  source: import_zod.z.string(),
  started_at: import_zod.z.string().datetime(),
  status: import_zod.z.string(),
  text: import_zod.z.string()
});
var zContactHours = import_zod.z.object({
  end: import_zod.z.string(),
  start: import_zod.z.string()
});
var zFollowUpSettings = import_zod.z.object({
  automatic_enabled: import_zod.z.boolean(),
  cadence_hours: import_zod.z.array(import_zod.z.number().int().gte(0)),
  contact_window: zContactHours,
  enabled: import_zod.z.boolean(),
  fallback_timezone: import_zod.z.string(),
  max_unanswered: import_zod.z.number().int().gte(0),
  min_idle_minutes: import_zod.z.number().int().gte(0),
  scheduled_enabled: import_zod.z.boolean()
});
var zNextFollowUp = import_zod.z.object({
  bot_enabled: import_zod.z.boolean(),
  enabled: import_zod.z.boolean(),
  explanation: import_zod.z.union([
    zFollowUpExplanation,
    import_zod.z.null()
  ]).optional(),
  external: import_zod.z.boolean(),
  failures: import_zod.z.number().int().gte(0),
  hold_until: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  last_follow_up_at: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  last_message_at: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  max_unanswered: import_zod.z.number().int().gte(0),
  next_at: import_zod.z.union([
    import_zod.z.string().datetime(),
    import_zod.z.null()
  ]).optional(),
  override: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  reminder: import_zod.z.union([
    zFollowUpReminder,
    import_zod.z.null()
  ]).optional(),
  revision: import_zod.z.coerce.bigint(),
  sent: import_zod.z.array(zSentFollowUpView),
  settings: zFollowUpSettings,
  source: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  status: import_zod.z.string(),
  step: import_zod.z.union([
    import_zod.z.number().int().gte(0),
    import_zod.z.null()
  ]).optional(),
  steps: import_zod.z.number().int().gte(0),
  timezone: import_zod.z.string(),
  unanswered: import_zod.z.number().int().gte(0)
});
var zTestClockResponse = import_zod.z.object({
  now: import_zod.z.string().datetime(),
  revision: import_zod.z.number().int().gte(0),
  source_conversation_id: import_zod.z.string()
});
var zAdvanceClockResponse = import_zod.z.object({
  follow_up: zNextFollowUp,
  test_clock: zTestClockResponse
});
var zApiKeyInfo = import_zod.z.object({
  created_at: import_zod.z.string().datetime(),
  id: import_zod.z.string().uuid(),
  is_active: import_zod.z.boolean(),
  key_prefix: import_zod.z.string(),
  name: import_zod.z.string()
});
var zAudioFormat = import_zod.z.enum([
  "ogg_opus",
  "mpeg"
]);
var zBotSelling = import_zod.z.object({
  checkout_link_in_text: import_zod.z.boolean(),
  max_price_cents: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  min_price_cents: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  payment_mode: import_zod.z.string(),
  payment_rails: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  selling_style: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zBotKnobs = import_zod.z.object({
  bundles: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  discount: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  emoji_amount: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  first_price_cents: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  free_nudes: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  message_length: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  pace: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  personality_shy_bold: import_zod.z.union([
    import_zod.z.number(),
    import_zod.z.null()
  ]).optional(),
  personality_sweet_bratty: import_zod.z.union([
    import_zod.z.number(),
    import_zod.z.null()
  ]).optional(),
  price_step_cents: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  vibe: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  welcome_back_days: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional()
});
var zBot = zBotSelling.and(zBotKnobs).and(import_zod.z.object({
  assigned_voice_id: import_zod.z.union([
    import_zod.z.string().uuid(),
    import_zod.z.null()
  ]).optional(),
  attributes: import_zod.z.array(zApiAttribute),
  follow_ups: zFollowUpSettings,
  freeform: import_zod.z.string(),
  id: import_zod.z.string().uuid(),
  name: import_zod.z.string(),
  orientation: zApiOrientation,
  voice_enabled: import_zod.z.boolean()
}));
var zChatter = import_zod.z.object({
  id: import_zod.z.string().uuid(),
  username: import_zod.z.string()
});
var zChatterLoginRequest = import_zod.z.object({
  password: import_zod.z.string(),
  username: import_zod.z.string()
});
var zChatterLoginResponse = import_zod.z.object({
  chatter_id: import_zod.z.string().uuid(),
  token: import_zod.z.string()
});
var zClientConfig = import_zod.z.object({
  chat_images_enabled: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  image_sending_behaviour: import_zod.z.union([
    zApiImageSendingBehaviour,
    import_zod.z.null()
  ]).optional(),
  language: import_zod.z.union([
    zLanguage,
    import_zod.z.null()
  ]).optional(),
  max_delay: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  min_delay: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  platform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  segment: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  timezone: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  typing_speed: import_zod.z.union([
    import_zod.z.number(),
    import_zod.z.null()
  ]).optional(),
  webhook: import_zod.z.union([
    import_zod.z.string().url(),
    import_zod.z.null()
  ]).optional()
});
var zCloneVoiceResponse = import_zod.z.object({
  bot: zBot
});
var zSearchedMessage = import_zod.z.object({
  from_bot: import_zod.z.boolean(),
  match_end: import_zod.z.number().int().gte(0),
  match_start: import_zod.z.number().int().gte(0),
  message_text: import_zod.z.string(),
  moderation: import_zod.z.union([
    zApiModerationInfo,
    import_zod.z.null()
  ]).optional(),
  sent_at: import_zod.z.coerce.bigint()
});
var zConversationHeader = import_zod.z.object({
  bot_id: import_zod.z.string().uuid(),
  id: import_zod.z.string(),
  last_message: import_zod.z.union([
    zMessage,
    import_zod.z.null()
  ]).optional(),
  message_count: import_zod.z.number().int().gte(0),
  platform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  platform_id: import_zod.z.union([
    import_zod.z.string().uuid(),
    import_zod.z.null()
  ]).optional(),
  searched_message: import_zod.z.union([
    zSearchedMessage,
    import_zod.z.null()
  ]).optional(),
  user_id: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zFanValue = import_zod.z.object({
  average_price_cents: import_zod.z.union([
    import_zod.z.coerce.bigint().gte(BigInt(0)),
    import_zod.z.null()
  ]).optional(),
  bounds_cents: import_zod.z.union([
    import_zod.z.array(import_zod.z.number().int().gte(0)),
    import_zod.z.null()
  ]).optional(),
  purchases: import_zod.z.number().int().gte(0),
  spent_cents: import_zod.z.coerce.bigint().gte(BigInt(0)),
  spent_this_session_cents: import_zod.z.coerce.bigint().gte(BigInt(0))
});
var zLockConversion = import_zod.z.object({
  median_seconds_to_pay: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  offered: import_zod.z.number().int().gte(0),
  paid: import_zod.z.number().int().gte(0)
});
var zOpenOffer = import_zod.z.object({
  content_ids: import_zod.z.array(import_zod.z.string()),
  offered_at: import_zod.z.string().datetime(),
  price_cents: import_zod.z.number().int().gte(0),
  purchase_id: import_zod.z.string()
});
var zPricePoint = import_zod.z.object({
  at: import_zod.z.string().datetime(),
  paid: import_zod.z.boolean(),
  price_cents: import_zod.z.number().int().gte(0)
});
var zSession = import_zod.z.object({
  ended_at: import_zod.z.string().datetime(),
  messages: import_zod.z.number().int().gte(0),
  photos: import_zod.z.number().int().gte(0),
  spent_cents: import_zod.z.coerce.bigint().gte(BigInt(0)),
  started_at: import_zod.z.string().datetime()
});
var zPhotoStatus = import_zod.z.enum([
  "not_sent",
  "sent",
  "locked",
  "unlocked"
]);
var zPhotoTag = import_zod.z.enum([
  "sfw",
  "risky",
  "nude"
]);
var zGridPhoto = import_zod.z.object({
  content_id: import_zod.z.string(),
  name: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  status: zPhotoStatus,
  tag: import_zod.z.union([
    zPhotoTag,
    import_zod.z.null()
  ]).optional(),
  thumbnail_url: import_zod.z.string(),
  video_url: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zSetGrid = import_zod.z.object({
  current: import_zod.z.boolean(),
  description: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  name: import_zod.z.string(),
  photos: import_zod.z.array(zGridPhoto),
  set_id: import_zod.z.string()
});
var zConversationInsights = import_zod.z.object({
  fan_value: zFanValue,
  locks: zLockConversion,
  open_offers: import_zod.z.array(zOpenOffer),
  price_line: import_zod.z.array(zPricePoint),
  readiness_now: import_zod.z.union([
    import_zod.z.number().int().gte(0),
    import_zod.z.null()
  ]).optional(),
  sessions: import_zod.z.array(zSession),
  sets: import_zod.z.array(zSetGrid),
  stage_now: import_zod.z.union([
    zStageScores,
    import_zod.z.null()
  ]).optional()
});
var zCreateApiKeyRequest = import_zod.z.object({
  name: import_zod.z.string()
});
var zCreateApiKeyResponse = import_zod.z.object({
  api_key: import_zod.z.string(),
  key_info: zApiKeyInfo
});
var zCreateBotRequestBody = import_zod.z.object({
  attributes: import_zod.z.array(zApiAttribute).optional(),
  freeform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  name: import_zod.z.string(),
  orientation: import_zod.z.union([
    zApiOrientation,
    import_zod.z.null()
  ]).optional()
});
var zCreateBotResponse = import_zod.z.object({
  bot: zBot
});
var zCreateChatterRequestBody = import_zod.z.object({
  username: import_zod.z.string()
});
var zCreateChatterResponse = import_zod.z.object({
  chatter: zChatter,
  password: import_zod.z.string()
});
var zCreateClipVoiceForm = import_zod.z.object({
  clip: import_zod.z.string(),
  name: import_zod.z.string(),
  transcript: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zCreateConversationResponse = import_zod.z.object({
  conversation: zConversation
});
var zCreateConversionRequestBody = import_zod.z.object({
  amount: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  bot_id: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  conversation_id: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  metadata: import_zod.z.unknown().optional(),
  timestamp: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  user_id: import_zod.z.string()
});
var zCreateLibraryVoiceRequest = import_zod.z.object({
  library_voice_id: import_zod.z.string(),
  name: import_zod.z.string()
});
var zCreateSetRequest = import_zod.z.object({
  bot_id: import_zod.z.string().uuid(),
  name: import_zod.z.string()
});
var zCreateUserRequestBody = import_zod.z.object({
  attributes: import_zod.z.array(zApiAttribute).optional(),
  freeform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  id: import_zod.z.string(),
  username: import_zod.z.string()
});
var zUser = import_zod.z.object({
  attributes: import_zod.z.array(zApiAttribute),
  freeform: import_zod.z.string(),
  id: import_zod.z.string(),
  username: import_zod.z.string()
});
var zCreateUserResponse = import_zod.z.object({
  user: zUser
});
var zDeactivateApiKeyResponse = import_zod.z.object({
  message: import_zod.z.string()
});
var zDeleteContentResponse = import_zod.z.object({
  message: import_zod.z.string()
});
var zVaultImageBehaviour = import_zod.z.enum([
  "force",
  "never"
]);
var zGenerateResponseSyncRequest = import_zod.z.object({
  batch_size: import_zod.z.number().int().gte(0).optional(),
  degrade_grammar_factor: import_zod.z.union([
    import_zod.z.number(),
    import_zod.z.null()
  ]).optional(),
  override_messages: import_zod.z.union([
    import_zod.z.array(zMessage),
    import_zod.z.null()
  ]).optional(),
  vault_image_behaviour: import_zod.z.union([
    zVaultImageBehaviour,
    import_zod.z.null()
  ]).optional()
});
var zResponseCandidate = import_zod.z.object({
  messages: import_zod.z.array(zMessage)
});
var zGenerateResponseSyncResponse = import_zod.z.object({
  candidates: import_zod.z.array(zResponseCandidate)
});
var zGetBotResponse = import_zod.z.object({
  bot: zBot
});
var zGetChatterResponse = import_zod.z.object({
  chatter: zChatter
});
var zGetClientConfigResponse = import_zod.z.object({
  config: zClientConfig
});
var zSummary = import_zod.z.object({
  created_at: import_zod.z.coerce.bigint(),
  message_count: import_zod.z.number().int().gte(0),
  summary_text: import_zod.z.string()
});
var zGetConversationResponse = import_zod.z.object({
  bot_id: import_zod.z.string().uuid(),
  follow_up: zNextFollowUp,
  freeform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  insights: import_zod.z.union([
    zConversationInsights,
    import_zod.z.null()
  ]).optional(),
  is_typing: import_zod.z.boolean(),
  latest_summary: import_zod.z.union([
    zSummary,
    import_zod.z.null()
  ]).optional(),
  messages: import_zod.z.array(zMessage),
  platform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  purchases: import_zod.z.array(zApiPurchase),
  segment: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  test_clock: import_zod.z.union([
    zTestClockResponse,
    import_zod.z.null()
  ]).optional(),
  turns: import_zod.z.array(zApiTurn),
  user_id: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  webhook: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zMemoryResponse = import_zod.z.object({
  text: import_zod.z.string()
});
var zGetMemoriesResponse = import_zod.z.object({
  bot_memories: import_zod.z.array(zMemoryResponse),
  user_memories: import_zod.z.array(zMemoryResponse)
});
var zPlatform = import_zod.z.object({
  custom_instruction: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  id: import_zod.z.string(),
  name: import_zod.z.string()
});
var zGetPlatformResponse = import_zod.z.object({
  platform: zPlatform
});
var zGetUserResponse = import_zod.z.object({
  user: zUser
});
var zImageItem = import_zod.z.object({
  new_id: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  public: import_zod.z.boolean(),
  url: import_zod.z.string()
});
var zListApiKeysResponse = import_zod.z.object({
  api_keys: import_zod.z.array(zApiKeyInfo)
});
var zListBotsResponse = import_zod.z.object({
  bots: import_zod.z.array(zBot)
});
var zListChattersResponse = import_zod.z.object({
  chatters: import_zod.z.array(zChatter)
});
var zMediaTypeFilter = import_zod.z.enum([
  "image",
  "video"
]);
var zListContentQuery = import_zod.z.object({
  bot_id: import_zod.z.union([
    import_zod.z.string().uuid(),
    import_zod.z.null()
  ]).optional(),
  limit: import_zod.z.union([
    import_zod.z.number().int().gte(0),
    import_zod.z.null()
  ]).optional(),
  media_type: import_zod.z.union([
    zMediaTypeFilter,
    import_zod.z.null()
  ]).optional(),
  search: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  user_id: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zListContentResponse = import_zod.z.object({
  content: import_zod.z.array(zContent),
  private_content: import_zod.z.array(zContent),
  public_content: import_zod.z.array(zContent)
});
var zListConversationsResponse = import_zod.z.object({
  conversations: import_zod.z.array(zConversationHeader)
});
var zListPlatformsResponse = import_zod.z.object({
  platforms: import_zod.z.array(zPlatform)
});
var zListSetsResponse = import_zod.z.object({
  sets: import_zod.z.array(zApiContentSet)
});
var zListUsersResponse = import_zod.z.object({
  has_more: import_zod.z.boolean(),
  limit: import_zod.z.coerce.bigint(),
  offset: import_zod.z.coerce.bigint(),
  total_count: import_zod.z.coerce.bigint(),
  users: import_zod.z.array(zApiUserWithStats)
});
var zListVoicesResponse = import_zod.z.object({
  voices: import_zod.z.array(zApiVoice)
});
var zMarkPurchasePaidResponse = import_zod.z.object({
  purchase: zApiPurchase
});
var zRenameVoiceRequest = import_zod.z.object({
  name: import_zod.z.string()
});
var zReplySuggestion = import_zod.z.object({
  text: import_zod.z.string(),
  tone: import_zod.z.string()
});
var zSendMessageRequest = import_zod.z.object({
  message: zMessage
});
var zSetItemsRequest = import_zod.z.object({
  content_ids: import_zod.z.array(import_zod.z.string())
});
var zSpeechRequest = import_zod.z.object({
  bot_id: import_zod.z.string(),
  format: import_zod.z.union([
    zAudioFormat,
    import_zod.z.null()
  ]).optional(),
  message: import_zod.z.string(),
  url: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional()
});
var zSuggestRepliesResponse = import_zod.z.object({
  suggestions: import_zod.z.array(zReplySuggestion)
});
var zTestCopyResponse = import_zod.z.object({
  conversation_id: import_zod.z.string()
});
var zUpdateBotRequest = import_zod.z.object({
  assigned_voice_id: import_zod.z.union([
    import_zod.z.string().uuid(),
    import_zod.z.null()
  ]).optional(),
  attributes: import_zod.z.array(zApiAttribute).optional(),
  bundles: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  checkout_link_in_text: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  discount: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  emoji_amount: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  first_price_cents: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  follow_ups: import_zod.z.union([
    zFollowUpSettings,
    import_zod.z.null()
  ]).optional(),
  free_nudes: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  freeform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  images: import_zod.z.union([
    import_zod.z.array(zImageItem),
    import_zod.z.null()
  ]).optional(),
  max_price_cents: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  message_length: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  min_price_cents: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  name: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  orientation: import_zod.z.union([
    zApiOrientation,
    import_zod.z.null()
  ]).optional(),
  pace: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  payment_mode: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  payment_rails: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  personality_shy_bold: import_zod.z.union([
    import_zod.z.number(),
    import_zod.z.null()
  ]).optional(),
  personality_sweet_bratty: import_zod.z.union([
    import_zod.z.number(),
    import_zod.z.null()
  ]).optional(),
  price_step_cents: import_zod.z.union([
    import_zod.z.coerce.bigint(),
    import_zod.z.null()
  ]).optional(),
  selling_style: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  vibe: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  voice_enabled: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  welcome_back_days: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional()
});
var zUpdateBotResponse = import_zod.z.object({
  bot: zBot
});
var zUpdateClientConfigRequest = import_zod.z.object({
  chat_images_enabled: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  image_sending_behaviour: import_zod.z.union([
    zApiImageSendingBehaviour,
    import_zod.z.null()
  ]).optional(),
  language: import_zod.z.union([
    zLanguage,
    import_zod.z.null()
  ]).optional(),
  max_delay: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  min_delay: import_zod.z.union([
    import_zod.z.number().int(),
    import_zod.z.null()
  ]).optional(),
  platform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  segment: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  timezone: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  typing_speed: import_zod.z.union([
    import_zod.z.number(),
    import_zod.z.null()
  ]).optional(),
  webhook: import_zod.z.union([
    import_zod.z.string().url(),
    import_zod.z.null()
  ]).optional()
});
var zUpdateClientConfigResponse = import_zod.z.object({
  config: zClientConfig
});
var zUpdateConversationRequestBody = import_zod.z.object({
  contact_timezone: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  freeform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  image_sending_behaviour: import_zod.z.union([
    zImageSendingBehaviour,
    import_zod.z.null()
  ]).optional(),
  language: import_zod.z.union([
    zLanguage,
    import_zod.z.null()
  ]).optional(),
  platform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  segment: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional(),
  timezone: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  webhook: import_zod.z.union([
    import_zod.z.string().url(),
    import_zod.z.null()
  ]).optional()
});
var zUpdateConversationResponse = import_zod.z.object({
  success: import_zod.z.boolean()
});
var zUpdatePlatformRequestBody = import_zod.z.object({
  custom_instruction: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zUpdatePlatformResponse = import_zod.z.object({
  success: import_zod.z.boolean()
});
var zUpdateSetRequest = import_zod.z.object({
  name: import_zod.z.string()
});
var zUpdateUserRequest = import_zod.z.object({
  attributes: import_zod.z.array(zApiAttribute).optional(),
  freeform: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional(),
  username: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zUpdateUserResponse = import_zod.z.object({
  user: zUser
});
var zUploadContentRequest = import_zod.z.object({
  bot_id: import_zod.z.union([
    import_zod.z.string().uuid(),
    import_zod.z.null()
  ]).optional(),
  image_url: import_zod.z.string(),
  public: import_zod.z.boolean().optional(),
  user_id: import_zod.z.union([
    import_zod.z.string(),
    import_zod.z.null()
  ]).optional()
});
var zUploadContentResponse = import_zod.z.object({
  content: zContent,
  created: import_zod.z.boolean()
});
var zVoiceSampleRequest = import_zod.z.object({
  text: import_zod.z.string()
});
var zSetFollowUpOverrideRequest = import_zod.z.object({
  override: import_zod.z.union([
    import_zod.z.boolean(),
    import_zod.z.null()
  ]).optional()
});
var zFollowUpActionKind = import_zod.z.enum([
  "push_back",
  "skip",
  "cancel_reminder",
  "restart",
  "reset"
]);
var zFollowUpActionRequest = import_zod.z.object({
  action: zFollowUpActionKind,
  hours: import_zod.z.union([
    import_zod.z.number().int().gte(0),
    import_zod.z.null()
  ]).optional(),
  revision: import_zod.z.coerce.bigint()
});
var zFollowUpPreviewResponse = import_zod.z.object({
  messages: import_zod.z.array(zMessage)
});
var zListApiKeysData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zCreateApiKeyData = import_zod.z.object({
  body: zCreateApiKeyRequest,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zDeactivateApiKeyData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    key_id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zChatterLoginData = import_zod.z.object({
  body: zChatterLoginRequest,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zCloneVoiceData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.object({
    bot_id: import_zod.z.string()
  })
});
var zListBotsData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zCreateBotData = import_zod.z.object({
  body: zCreateBotRequestBody,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zDeleteBotData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    bot_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zDeleteBotResponse = import_zod.z.void();
var zGetBotData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    bot_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zUpdateBotData = import_zod.z.object({
  body: zUpdateBotRequest,
  path: import_zod.z.object({
    bot_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zListChattersData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zCreateChatterData = import_zod.z.object({
  body: zCreateChatterRequestBody,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zDeactivateChatterData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    chatter_id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zDeactivateChatterResponse = import_zod.z.void();
var zGetChatterData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    chatter_id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zGetClientConfigData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zUpdateClientConfigData = import_zod.z.object({
  body: zUpdateClientConfigRequest,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zListContentData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.object({
    bot_id: import_zod.z.union([
      import_zod.z.string(),
      import_zod.z.null()
    ]).optional(),
    user_id: import_zod.z.union([
      import_zod.z.string(),
      import_zod.z.null()
    ]).optional(),
    limit: import_zod.z.union([
      import_zod.z.number().int().gte(0),
      import_zod.z.null()
    ]).optional(),
    search: import_zod.z.union([
      import_zod.z.string(),
      import_zod.z.null()
    ]).optional(),
    media_type: import_zod.z.union([
      zMediaTypeFilter,
      import_zod.z.null()
    ]).optional()
  }).optional()
});
var zUploadContentData = import_zod.z.object({
  body: zUploadContentRequest,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zDeleteContentData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    content_id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zListConversationsData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.object({
    bot_id: import_zod.z.union([
      import_zod.z.string(),
      import_zod.z.null()
    ]).optional(),
    user_id: import_zod.z.union([
      import_zod.z.string(),
      import_zod.z.null()
    ]).optional(),
    conversation_id: import_zod.z.union([
      import_zod.z.string(),
      import_zod.z.null()
    ]).optional(),
    min_messages: import_zod.z.union([
      import_zod.z.number().int(),
      import_zod.z.null()
    ]).optional(),
    max_messages: import_zod.z.union([
      import_zod.z.number().int(),
      import_zod.z.null()
    ]).optional(),
    message_content: import_zod.z.union([
      import_zod.z.string(),
      import_zod.z.null()
    ]).optional(),
    min_last_message_date: import_zod.z.union([
      import_zod.z.number().int(),
      import_zod.z.null()
    ]).optional(),
    max_last_message_date: import_zod.z.union([
      import_zod.z.number().int(),
      import_zod.z.null()
    ]).optional(),
    severities: import_zod.z.union([
      import_zod.z.array(import_zod.z.string()),
      import_zod.z.null()
    ]).optional(),
    categories: import_zod.z.union([
      import_zod.z.array(import_zod.z.string()),
      import_zod.z.null()
    ]).optional(),
    platform_ids: import_zod.z.union([
      import_zod.z.array(import_zod.z.string()),
      import_zod.z.null()
    ]).optional(),
    limit: import_zod.z.union([
      import_zod.z.coerce.bigint(),
      import_zod.z.null()
    ]).optional(),
    offset: import_zod.z.union([
      import_zod.z.coerce.bigint(),
      import_zod.z.null()
    ]).optional()
  }).optional()
});
var zCreateConversationData = import_zod.z.object({
  body: zCreateConversationRequest,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zUpdateConversationData = import_zod.z.object({
  body: zUpdateConversationRequestBody,
  path: import_zod.z.object({
    conversation_id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zGetConversationData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zGenerateResponseSyncData = import_zod.z.object({
  body: zGenerateResponseSyncRequest,
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zGetMemoriesData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zSendMessageData = import_zod.z.object({
  body: zSendMessageRequest,
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zSuggestRepliesData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zAdvanceTestClockData = import_zod.z.object({
  body: zAdvanceClockRequest,
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zCreateTestCopyData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zCreateConversionData = import_zod.z.object({
  body: zCreateConversionRequestBody,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zSendMessageOrCreateConversationData = import_zod.z.object({
  body: zAddMessageRequest,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zListPlatformsData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zGetPlatformData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    platform_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zUpdatePlatformData = import_zod.z.object({
  body: zUpdatePlatformRequestBody,
  path: import_zod.z.object({
    platform_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zMarkPurchasePaidData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    purchase_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zListSetsData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.object({
    bot_id: import_zod.z.string().uuid()
  })
});
var zCreateSetData = import_zod.z.object({
  body: zCreateSetRequest,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zDeleteSetData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    set_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zDeleteSetResponse = import_zod.z.void();
var zUpdateSetData = import_zod.z.object({
  body: zUpdateSetRequest,
  path: import_zod.z.object({
    set_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zSetSetItemsData = import_zod.z.object({
  body: zSetItemsRequest,
  path: import_zod.z.object({
    set_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zSpeakData = import_zod.z.object({
  body: zSpeechRequest,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zListUsersData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.object({
    limit: import_zod.z.union([
      import_zod.z.coerce.bigint(),
      import_zod.z.null()
    ]).optional(),
    offset: import_zod.z.coerce.bigint().optional(),
    search_id: import_zod.z.union([
      import_zod.z.string(),
      import_zod.z.null()
    ]).optional(),
    search_username: import_zod.z.union([
      import_zod.z.string(),
      import_zod.z.null()
    ]).optional(),
    sort_by: import_zod.z.string().optional(),
    sort_desc: import_zod.z.boolean().optional()
  }).optional()
});
var zCreateUserData = import_zod.z.object({
  body: zCreateUserRequestBody,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zDeleteUserData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    user_id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zDeleteUserResponse = import_zod.z.void();
var zGetUserData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    user_id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zUpdateUserData = import_zod.z.object({
  body: zUpdateUserRequest,
  path: import_zod.z.object({
    user_id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zListVoicesData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zCreateClipVoiceData = import_zod.z.object({
  body: zCreateClipVoiceForm,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zCreateLibraryVoiceData = import_zod.z.object({
  body: zCreateLibraryVoiceRequest,
  path: import_zod.z.never().optional(),
  query: import_zod.z.never().optional()
});
var zDeleteVoiceData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    voice_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zDeleteVoiceResponse = import_zod.z.void();
var zRenameVoiceData = import_zod.z.object({
  body: zRenameVoiceRequest,
  path: import_zod.z.object({
    voice_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zVoiceSampleData = import_zod.z.object({
  body: zVoiceSampleRequest,
  path: import_zod.z.object({
    voice_id: import_zod.z.string().uuid()
  }),
  query: import_zod.z.never().optional()
});
var zSetFollowUpOverrideData = import_zod.z.object({
  body: zSetFollowUpOverrideRequest,
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zFollowUpActionData = import_zod.z.object({
  body: zFollowUpActionRequest,
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zPreviewFollowUpData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
});
var zStartTestClockData = import_zod.z.object({
  body: import_zod.z.never().optional(),
  path: import_zod.z.object({
    id: import_zod.z.string()
  }),
  query: import_zod.z.never().optional()
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
var import_axios = __toESM(require("axios"));

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
  const instance = import_axios.default.create(configWithoutAuth);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApiError,
  Conversation,
  PrioriChat
});
