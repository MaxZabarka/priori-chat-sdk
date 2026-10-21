import { PrioriChat } from '../client';
import { createSet, deleteSet, listSets, setSetItems, updateSet } from '../client/sdk.gen';
import { ApiContentSet, ListSetsResponse } from '../client/types.gen';

export interface CreateSetOptions {
  bot_id: string;
  name: string;
  description: string;
}

export interface ListSetsOptions {
  bot_id: string;
}

export interface UpdateSetOptions {
  set_id: string;
  name: string;
  description: string;
}

export interface DeleteSetOptions {
  set_id: string;
}

export interface SetSetItemsOptions {
  set_id: string;
  /** Content ids in suggested order. Items of the set left out become loose; listed items leave any other set. */
  content_ids: string[];
}

export async function createSetImpl(this: PrioriChat, options: CreateSetOptions): Promise<ApiContentSet> {
  const result = await createSet({ body: options });
  return result.data!;
}

export async function listSetsImpl(this: PrioriChat, options: ListSetsOptions): Promise<ListSetsResponse> {
  const result = await listSets({ query: options });
  return result.data!;
}

export async function updateSetImpl(this: PrioriChat, options: UpdateSetOptions): Promise<ApiContentSet> {
  const { set_id, ...body } = options;
  const result = await updateSet({ path: { set_id }, body });
  return result.data!;
}

export async function deleteSetImpl(this: PrioriChat, options: DeleteSetOptions): Promise<void> {
  await deleteSet({ path: options });
}

export async function setSetItemsImpl(this: PrioriChat, options: SetSetItemsOptions): Promise<ApiContentSet> {
  const { set_id, ...body } = options;
  const result = await setSetItems({ path: { set_id }, body });
  return result.data!;
}
