import { PrioriChat } from '../client';
import { getPlatform, listPlatforms, updatePlatform } from '../client/sdk.gen';
import {
  GetPlatformResponse,
  ListPlatformsResponse,
  UpdatePlatformResponse,
  UpdatePlatformRequestBody,
} from '../client/types.gen';

export async function listPlatformsImpl(this: PrioriChat): Promise<ListPlatformsResponse> {
  const result = await listPlatforms({});
  return result.data!;
}

export interface GetPlatformOptions {
  platform_id: string;
}

export async function getPlatformImpl(
  this: PrioriChat,
  options: GetPlatformOptions,
): Promise<GetPlatformResponse> {
  const result = await getPlatform({ path: options });
  return result.data!;
}

export interface UpdatePlatformOptions extends UpdatePlatformRequestBody {
  platform_id: string;
}

export async function updatePlatformImpl(
  this: PrioriChat,
  options: UpdatePlatformOptions,
): Promise<UpdatePlatformResponse> {
  const { platform_id, ...body } = options;
  const result = await updatePlatform({
    path: { platform_id },
    body,
  });
  return result.data!;
}
