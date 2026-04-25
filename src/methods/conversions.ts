import { PrioriChat } from '../client';
import { createConversion } from '../client/sdk.gen';
import { CreateConversionRequestBody } from '../client/types.gen';

export async function createConversionImpl(
  this: PrioriChat,
  options: CreateConversionRequestBody,
): Promise<void> {
  await createConversion({ body: options });
}
