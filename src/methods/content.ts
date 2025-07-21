import { listContent, uploadContent, deleteContent } from "../client/sdk.gen";
import type {
  ListContentData,
  ListContentResponse,
  UploadContentData,
  UploadContentResponse,
  DeleteContentData,
  DeleteContentResponse
} from "../client/types.gen";
import type { PrioriChat } from "../client";

export async function listContentImpl(
  this: PrioriChat,
  options: ListContentData['query']
): Promise<ListContentResponse> {
  const result = await listContent({
    query: options,
  });

  return result.data!;
}

export async function uploadContentImpl(
  this: PrioriChat,
  options: UploadContentData['body']
): Promise<UploadContentResponse> {
  const result = await uploadContent({
    body: options,
  });

  return result.data!;
}

export async function deleteContentImpl(
  this: PrioriChat,
  options: DeleteContentData['path']
): Promise<DeleteContentResponse> {
  const result = await deleteContent({
    path: options,
  });

  return result.data!;
}