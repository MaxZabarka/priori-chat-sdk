import { getClientConfig, updateClientConfig } from "../client/sdk.gen";
import type {
  GetClientConfigResponse,
  UpdateClientConfigData,
  UpdateClientConfigResponse,
} from "../client/types.gen";
import type { PrioriChat } from "../client";

export async function getClientConfigImpl(
  this: PrioriChat,
): Promise<GetClientConfigResponse> {
  const result = await getClientConfig({ client: this["client"] });
  return result.data!;
}

export async function updateClientConfigImpl(
  this: PrioriChat,
  options: UpdateClientConfigData["body"],
): Promise<UpdateClientConfigResponse> {
  const result = await updateClientConfig({
    client: this["client"],
    body: options,
  });
  return result.data!;
}
