import { createBot, listBots, getBot, updateBot, deleteBot } from "../client/sdk.gen";
import type {
  CreateBotRequest,
  CreateBotResponse,
  ListBotsResponse,
  GetBotData,
  GetBotResponse,
  UpdateBotData,
  UpdateBotResponse,
  DeleteBotData
} from "../client/types.gen";
import type { PrioriChat } from "../client";

export async function createBotImpl(
  this: PrioriChat,
  options: CreateBotRequest
): Promise<CreateBotResponse> {
  const result = await createBot({
    body: options,
  });

  return result.data!;
}

export async function listBotsImpl(
  this: PrioriChat
): Promise<ListBotsResponse> {
  const result = await listBots();

  return result.data!;
}

export async function getBotImpl(
  this: PrioriChat,
  options: GetBotData['path']
): Promise<GetBotResponse> {
  const result = await getBot({
    path: options,
  });

  return result.data!;
}

export async function updateBotImpl(
  this: PrioriChat,
  options: UpdateBotData['path'] & UpdateBotData['body']
): Promise<UpdateBotResponse> {
  const { bot_id, ...body } = options;
  
  const result = await updateBot({
    path: { bot_id },
    body,
  });

  return result.data!;
}

export async function deleteBotImpl(
  this: PrioriChat,
  options: DeleteBotData['path']
): Promise<void> {
  await deleteBot({
    path: options,
  });
}