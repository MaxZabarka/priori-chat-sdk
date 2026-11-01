import { PrioriChat } from '../client';
import { suggestReplies } from '../client/sdk.gen';
import { SuggestRepliesResponse } from '../client/types.gen';

export interface SuggestRepliesOptions {
  conversation_id: string;
}

export async function suggestRepliesImpl(this: PrioriChat, options: SuggestRepliesOptions): Promise<SuggestRepliesResponse> {
  const result = await suggestReplies({ path: { id: options.conversation_id } });
  return result.data!;
}
