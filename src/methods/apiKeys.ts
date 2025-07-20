import { listApiKeys, createApiKey, deactivateApiKey } from "../client/sdk.gen";
import type {
  CreateApiKeyData,
  CreateApiKeyResponse,
  ListApiKeysResponse,
  DeactivateApiKeyData,
  DeactivateApiKeyResponse
} from "../client/types.gen";
import type { PrioriChat } from "../client";

export async function listApiKeysImpl(
  this: PrioriChat
): Promise<ListApiKeysResponse> {
  const result = await listApiKeys();

  return result.data!;
}

export async function createApiKeyImpl(
  this: PrioriChat,
  options: CreateApiKeyData['body']
): Promise<CreateApiKeyResponse> {
  const result = await createApiKey({
    body: options,
  });

  return result.data!;
}

export async function deactivateApiKeyImpl(
  this: PrioriChat,
  options: DeactivateApiKeyData['path']
): Promise<DeactivateApiKeyResponse> {
  const result = await deactivateApiKey({
    path: options,
  });

  return result.data!;
}