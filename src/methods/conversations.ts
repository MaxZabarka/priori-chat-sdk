import { createConversation, listConversations, getConversation } from "../client/sdk.gen";
import type { CreateConversationOptions } from "../client";
import type {
  CreateConversationResponse,
  ListConversationsResponse,
  GetConversationResponse
} from "../client/types.gen";
import type { PrioriChat } from "../client";

export async function createConversationImpl(
  this: PrioriChat,
  options: CreateConversationOptions
): Promise<CreateConversationResponse> {
  const result = await createConversation({
    body: {
      bot_id: options.bot_id,
      user_id: options.user_id,
      create_user_if_not_exists: options.create_user_if_not_exists,
      with_messages: options.with_messages?.map(msg => ({
        ...msg,
        attached_media: msg.attached_media ? { content_id: '', url: msg.attached_media.url } : undefined,
      })),
    },
  });

  return result.data!;
}

/**
 * Options for listing conversations
 */
export interface ListConversationsOptions {
  bot_id?: string;
  user_id?: string;
}

export async function listConversationsImpl(
  this: PrioriChat,
  options?: ListConversationsOptions
): Promise<ListConversationsResponse> {
  const result = await listConversations({
    query: options ? {
      bot_id: options.bot_id,
      user_id: options.user_id,
    } : undefined,
  });

  return result.data!;
}

/**
 * Options for getting a conversation by ID
 */
export interface GetConversationOptions {
  id: string;
}

export async function getConversationImpl(
  this: PrioriChat,
  options: GetConversationOptions
): Promise<GetConversationResponse> {
  const result = await getConversation({
    path: {
      id: options.id,
    },
  });

  return result.data!;
}

