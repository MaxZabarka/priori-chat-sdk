import { PrioriChat } from '../client';
import { markPurchasePaid } from '../client/sdk.gen';
import { MarkPurchasePaidResponse } from '../client/types.gen';

export interface MarkPurchasePaidOptions {
  purchase_id: string;
}

export async function markPurchasePaidImpl(
  this: PrioriChat,
  options: MarkPurchasePaidOptions,
): Promise<MarkPurchasePaidResponse> {
  const result = await markPurchasePaid({ path: options });
  return result.data!;
}
