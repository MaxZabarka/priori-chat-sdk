import { listChatters, createChatter, getChatter, deactivateChatter } from "../client/sdk.gen";
import type {
  CreateChatterRequestBody,
  CreateChatterResponse,
  ListChattersResponse,
  GetChatterData,
  GetChatterResponse,
  DeactivateChatterData
} from "../client/types.gen";
import type { PrioriChat } from "../client";

export async function listChattersImpl(
  this: PrioriChat
): Promise<ListChattersResponse> {
  const result = await listChatters();

  return result.data!;
}

export async function createChatterImpl(
  this: PrioriChat,
  options: CreateChatterRequestBody
): Promise<CreateChatterResponse> {
  const result = await createChatter({
    body: options,
  });

  return result.data!;
}

export async function getChatterImpl(
  this: PrioriChat,
  options: GetChatterData['path']
): Promise<GetChatterResponse> {
  const result = await getChatter({
    path: options,
  });

  return result.data!;
}

export async function deactivateChatterImpl(
  this: PrioriChat,
  options: DeactivateChatterData['path']
): Promise<void> {
  await deactivateChatter({
    path: options,
  });
}
