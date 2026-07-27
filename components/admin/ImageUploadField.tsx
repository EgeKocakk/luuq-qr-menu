"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMenuImage } from "@/lib/supabase/storage";
import { tr } from "@/i18n/tr";

export function ImageUploadField({
  value,
  onChange,
  folder,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  folder: "products";
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const url = await uploadMenuImage(supabase, file, folder);
      onChange(url);
    } catch {
      setError(tr.admin.common.error);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-cream-dark">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-center text-[10px] text-muted">{tr.admin.menu.noImage}</span>
        )}
      </div>

      <label className="cursor-pointer rounded-md border border-gold/30 px-3 py-1.5 text-sm text-dark hover:border-gold">
        {uploading ? tr.admin.productForm.uploading : tr.admin.productForm.uploadImage}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {value ? (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-sm text-red-600 hover:underline"
        >
          {tr.admin.productForm.removeImage}
        </button>
      ) : null}

      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </div>
  );
}
