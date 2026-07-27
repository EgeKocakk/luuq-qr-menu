"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Category } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { Modal } from "./Modal";

export function CategoryFormModal({
  category,
  nextSortOrder,
  onClose,
  onSaved,
}: {
  category: Category | null;
  nextSortOrder: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(category?.name ?? "");
  const [isActive, setIsActive] = useState(category?.is_active ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError(tr.admin.common.requiredField);
      return;
    }

    setSaving(true);
    setError(null);
    const supabase = createClient();

    const { error: saveError } = category
      ? await supabase.from("categories").update({ name, is_active: isActive }).eq("id", category.id)
      : await supabase
          .from("categories")
          .insert({ name, is_active: isActive, sort_order: nextSortOrder });

    if (saveError) {
      setError(tr.admin.common.error);
      setSaving(false);
      return;
    }

    onSaved();
  }

  return (
    <Modal
      title={category ? tr.admin.categoryForm.editTitle : tr.admin.categoryForm.addTitle}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="category-name" className="text-sm font-medium text-dark">
            {tr.admin.categoryForm.name}
          </label>
          <input
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-gold/30 px-3 py-2 focus:border-gold focus:outline-none"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-dark">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          {tr.admin.categoryForm.isActive}
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm text-muted hover:bg-cream-dark"
          >
            {tr.admin.common.cancel}
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-terra px-4 py-2 text-sm font-semibold text-cream hover:bg-terra/90 disabled:opacity-60"
          >
            {saving ? tr.admin.common.saving : tr.admin.common.save}
          </button>
        </div>
      </form>
    </Modal>
  );
}
