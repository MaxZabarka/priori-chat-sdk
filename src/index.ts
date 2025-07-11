export { PrioriChat, ApiError, type CreateConversationOptions } from "./client";
export { 
  Conversation, 
  type ConversationOptions, 
  type ConversationCallbacks, 
  type Message, 
  type AttachedMedia,
  type ConversationWithId,
  type ConversationWithUserBot
} from "./conversation";
export { type ListConversationsOptions, type GetConversationOptions } from "./methods/conversations";
export type { 
  CreateConversationResponse, 
  GetConversationResponse, 
  ListConversationsResponse 
} from "./client/types.gen";

