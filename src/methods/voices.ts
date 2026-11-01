import { PrioriChat } from '../client';
import { createClipVoice, createLibraryVoice, deleteVoice, listVoices, renameVoice, voiceSample } from '../client/sdk.gen';
import { ApiVoice, ListVoicesResponse } from '../client/types.gen';

export interface CreateClipVoiceOptions {
  name: string;
  /** 5 to 60 seconds of clear speech with no music, at most 15 MB: MP3, WAV, M4A, OGG or WebM. */
  clip: Blob | File;
  /** What the clip says; the copy is closer with it. */
  transcript?: string;
}

export interface CreateLibraryVoiceOptions {
  name: string;
  /** The voice's id in the provider's library. */
  library_voice_id: string;
}

export interface RenameVoiceOptions {
  voice_id: string;
  name: string;
}

export interface DeleteVoiceOptions {
  voice_id: string;
}

export interface VoiceSampleOptions {
  voice_id: string;
  /** A line in the model's script style, like "[teasing] Hey you. [soft laugh] Miss me?" */
  text: string;
}

export async function listVoicesImpl(this: PrioriChat): Promise<ListVoicesResponse> {
  const result = await listVoices();
  return result.data!;
}

export async function createClipVoiceImpl(this: PrioriChat, options: CreateClipVoiceOptions): Promise<ApiVoice> {
  const result = await createClipVoice({ body: options });
  return result.data!;
}

export async function createLibraryVoiceImpl(this: PrioriChat, options: CreateLibraryVoiceOptions): Promise<ApiVoice> {
  const result = await createLibraryVoice({ body: options });
  return result.data!;
}

export async function renameVoiceImpl(this: PrioriChat, options: RenameVoiceOptions): Promise<ApiVoice> {
  const { voice_id, ...body } = options;
  const result = await renameVoice({ path: { voice_id }, body });
  return result.data!;
}

export async function deleteVoiceImpl(this: PrioriChat, options: DeleteVoiceOptions): Promise<void> {
  await deleteVoice({ path: options });
}

export async function voiceSampleImpl(this: PrioriChat, options: VoiceSampleOptions): Promise<Blob> {
  const { voice_id, ...body } = options;
  const result = await voiceSample({ path: { voice_id }, body, responseType: 'blob' });
  return result.data as unknown as Blob;
}
