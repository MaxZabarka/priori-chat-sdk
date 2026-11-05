import { zAdvanceClockResponse, zTestCopyResponse, zNextFollowUp, zFollowUpPreviewResponse } from "../client/zod.gen";
import { PrioriChat } from '../client';
import { createTestCopy, advanceTestClock, setFollowUpOverride, setFollowUpRules, followUpAction, startTestClock, previewFollowUp } from '../client/sdk.gen';
import type { AdvanceClockRequest, FollowUpActionRequest, FollowUpRules, SetFollowUpOverrideRequest } from '../client/types.gen';

export async function createTestCopyImpl(this: PrioriChat, options: {id: string}) {
  const result = await createTestCopy({path: options});
  return zTestCopyResponse.parse(result.data);
}
export async function advanceTestClockImpl(this: PrioriChat, options: AdvanceClockRequest & {id: string}) {
  const {id, ...body} = options;
  const result = await advanceTestClock({path: {id}, body});
  return zAdvanceClockResponse.parse(result.data);
}
export async function setFollowUpOverrideImpl(this: PrioriChat, options: SetFollowUpOverrideRequest & {id: string}) {
  const {id, ...body} = options;
  const result = await setFollowUpOverride({path: {id}, body});
  return zNextFollowUp.parse(result.data);
}
export async function followUpActionImpl(this: PrioriChat, options: FollowUpActionRequest & {id: string}) {
  const {id, ...body} = options;
  const result = await followUpAction({path: {id}, body});
  return zNextFollowUp.parse(result.data);
}
export async function startTestClockImpl(this: PrioriChat, options: {id: string}) {
  const result = await startTestClock({path: options});
  return zAdvanceClockResponse.parse(result.data);
}
export async function previewFollowUpImpl(this: PrioriChat, options: {id: string}) {
  const result = await previewFollowUp({path: options});
  return zFollowUpPreviewResponse.parse(result.data);
}
export async function setFollowUpRulesImpl(this: PrioriChat, options: FollowUpRules & {id: string}) {
  const {id, ...body} = options;
  const result = await setFollowUpRules({path: {id}, body});
  return zNextFollowUp.parse(result.data);
}
