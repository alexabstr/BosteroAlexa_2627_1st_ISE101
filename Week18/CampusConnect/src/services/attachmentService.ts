
import { supabase } from "../lib/supabase";
import type { ImagePickerAsset } from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";

const BUCKET_NAME = "campus-attachments";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function uploadTaskAttachment(
  taskId: string,
  image: ImagePickerAsset
) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in to upload an attachment.");
  }

  if (!image.mimeType || !["image/jpeg", "image/png", "image/webp"].includes(image.mimeType)) {
    throw new Error("Unsupported image type.");
  }

  const fileInfo = await FileSystem.getInfoAsync(image.uri);

  if (!fileInfo.exists || !fileInfo.size || fileInfo.size > MAX_FILE_SIZE) {
    throw new Error("Image must be available and no larger than 5 MB.");
  }

  const fileBase64 = await FileSystem.readAsStringAsync(image.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const binaryString = atob(fileBase64);
  const bytes = new Uint8Array(binaryString.length);

  for (let index = 0; index < binaryString.length; index++) {
    bytes[index] = binaryString.charCodeAt(index);
  }

  const extension =
    image.mimeType === "image/png"
      ? "png"
      : image.mimeType === "image/webp"
        ? "webp"
        : "jpg";

  const objectPath = `${user.id}/${taskId}/${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(objectPath, bytes, {
      contentType: image.mimeType,
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data, error: metadataError } = await supabase
    .from("task_attachments")
    .insert({
      task_id: taskId,
      owner_id: user.id,
      bucket_name: BUCKET_NAME,
      object_path: objectPath,
      mime_type: image.mimeType,
      file_size: fileInfo.size,
    })
    .select()
    .single();

  if (metadataError) {
    const { error: cleanupError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([objectPath]);

    if (cleanupError) {
      console.warn("Uploaded object cleanup failed.");
    }

    console.error("Metadata save error:", metadataError);

throw new Error(
  `Metadata save failed: ${metadataError.message}`
);
  }

  return data;
}
