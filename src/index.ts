export { PrioriChat, ApiError, type CreateConversationOptions } from "./client";
export {
  Conversation,
  type ConversationOptions,
  type ConversationCallbacks,
  type Message,
  type AttachedMedia,
  type ConversationWithId,
  type ConversationWithUserBot,
} from "./conversation";
export { type ListConversationsOptions, type GetConversationOptions } from "./methods/conversations";
export type {
  CreateConversationResponse,
  GetConversationResponse,
  ListConversationsResponse,
  ConversationHeader,
  GetMemoriesResponse,
  MemoryResponse,
  Conversation as ConversationType,
  SearchedMessage,
  Bot,
  CreateBotRequest,
  CreateBotResponse,
  GetBotResponse,
  ListBotsResponse,
  UpdateBotRequest,
  UpdateBotResponse
} from "./client/types.gen";

