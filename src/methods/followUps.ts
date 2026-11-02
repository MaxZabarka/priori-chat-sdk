import { zAdvanceClockResponse, zTestCopyResponse } from "../client/zod.gen";
import { PrioriChat } from '../client';
import { createTestCopy, advanceTestClock } from '../client/sdk.gen';
import type { AdvanceClockRequest } from '../client/types.gen';

export async function createTestCopyImpl(this: PrioriChat, options: {id: string}) {
  const result = await createTestCopy({path: options});
  return zTestCopyResponse.parse(result.data);
}
export async function advanceTestClockImpl(this: PrioriChat, options: AdvanceClockRequest & {id: string}) {
  const {id, ...body} = options;
  const result = await advanceTestClock({path: {id}, body});
  return zAdvanceClockResponse.parse(result.data);
}
