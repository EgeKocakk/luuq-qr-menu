import type { SupabaseClient } from "@supabase/supabase-js";
import { resizeImageFile } from "../image";

const BUCKET = "menu-images";

export async function uploadMenuImage(
  supabase: SupabaseClient,
  file: File,
  folder: "products",
): Promise<string> {
  const resized = await resizeImageFile(file);
  const path = `${folder}/${crypto.randomUUID()}.jpg`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, resized, {
    contentType: "image/jpeg",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
