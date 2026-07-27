"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { liraToCents } from "@/lib/money";
import type { Category, ProductWithOptions } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { Modal } from "./Modal";
import { ImageUploadField } from "./ImageUploadField";

type DraftOption = {
  id?: string;
  name: string;
  price_diff_lira: string;
  is_default: boolean;
};

type DraftGroup = {
  id?: string;
  name: string;
  type: "single" | "multi";
  is_required: boolean;
  options: DraftOption[];
};

function toDraftGroups(product: ProductWithOptions | null): DraftGroup[] {
  if (!product) return [];
  return product.product_option_groups.map((g) => ({
    id: g.id,
    name: g.name,
    type: g.type,
    is_required: g.is_required,
    options: g.product_options.map((o) => ({
      id: o.id,
      name: o.name,
      price_diff_lira: o.price_diff ? String(o.price_diff / 100) : "",
      is_default: o.is_default,
    })),
  }));
}

export function ProductFormModal({
  product,
  categories,
  defaultCategoryId,
  nextSortOrder,
  onClose,
  onSaved,
}: {
  product: ProductWithOptions | null;
  categories: Category[];
  defaultCategoryId: string;
  nextSortOrder: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? defaultCategoryId);
  const [priceLira, setPriceLira] = useState(
    product ? String(product.base_price / 100) : "",
  );
  const [imageUrl, setImageUrl] = useState<string | null>(product?.image_url ?? null);
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [groups, setGroups] = useState<DraftGroup[]>(toDraftGroups(product));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addGroup() {
    setGroups((gs) => [...gs, { name: "", type: "single", is_required: false, options: [] }]);
  }

  function updateGroup(index: number, patch: Partial<DraftGroup>) {
    setGroups((gs) => gs.map((g, i) => (i === index ? { ...g, ...patch } : g)));
  }

  function removeGroup(index: number) {
    setGroups((gs) => gs.filter((_, i) => i !== index));
  }

  function addOption(groupIndex: number) {
    setGroups((gs) =>
      gs.map((g, i) =>
        i === groupIndex
          ? { ...g, options: [...g.options, { name: "", price_diff_lira: "", is_default: false }] }
          : g,
      ),
    );
  }

  function updateOption(groupIndex: number, optionIndex: number, patch: Partial<DraftOption>) {
    setGroups((gs) =>
      gs.map((g, i) =>
        i === groupIndex
          ? {
              ...g,
              options: g.options.map((o, oi) => (oi === optionIndex ? { ...o, ...patch } : o)),
            }
          : g,
      ),
    );
  }

  function removeOption(groupIndex: number, optionIndex: number) {
    setGroups((gs) =>
      gs.map((g, i) =>
        i === groupIndex ? { ...g, options: g.options.filter((_, oi) => oi !== optionIndex) } : g,
      ),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError(tr.admin.common.requiredField);
      return;
    }

    setSaving(true);
    setError(null);
    const supabase = createClient();

    const payload = {
      name,
      description: description.trim() ? description : null,
      category_id: categoryId,
      base_price: priceLira.trim() ? liraToCents(Number(priceLira)) : 0,
      image_url: imageUrl,
      is_active: isActive,
    };

    let productId = product?.id;

    if (productId) {
      const { error: updateError } = await supabase
        .from("products")
        .update(payload)
        .eq("id", productId);
      if (updateError) {
        setError(tr.admin.common.error);
        setSaving(false);
        return;
      }
      // Opsiyon gruplarını sadeleştirmek için baştan yaz.
      await supabase.from("product_option_groups").delete().eq("product_id", productId);
    } else {
      const { data: inserted, error: insertError } = await supabase
        .from("products")
        .insert({ ...payload, sort_order: nextSortOrder })
        .select("id")
        .single();
      if (insertError || !inserted) {
        setError(tr.admin.common.error);
        setSaving(false);
        return;
      }
      productId = inserted.id;
    }

    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];
      if (!group.name.trim()) continue;

      const { data: insertedGroup, error: groupError } = await supabase
        .from("product_option_groups")
        .insert({
          product_id: productId,
          name: group.name,
          type: group.type,
          is_required: group.is_required,
          sort_order: gi,
        })
        .select("id")
        .single();

      if (groupError || !insertedGroup) continue;

      const optionRows = group.options
        .filter((o) => o.name.trim())
        .map((o, oi) => ({
          group_id: insertedGroup.id,
          name: o.name,
          price_diff: o.price_diff_lira.trim() ? liraToCents(Number(o.price_diff_lira)) : 0,
          is_default: o.is_default,
          sort_order: oi,
        }));

      if (optionRows.length > 0) {
        await supabase.from("product_options").insert(optionRows);
      }
    }

    onSaved();
  }

  return (
    <Modal
      title={product ? tr.admin.productForm.editTitle : tr.admin.productForm.addTitle}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="product-name" className="text-sm font-medium text-dark">
            {tr.admin.productForm.name}
          </label>
          <input
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-gold/30 px-3 py-2 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="product-description" className="text-sm font-medium text-dark">
            {tr.admin.productForm.description}
          </label>
          <textarea
            id="product-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="rounded-md border border-gold/30 px-3 py-2 focus:border-gold focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <label htmlFor="product-category" className="text-sm font-medium text-dark">
              {tr.admin.productForm.category}
            </label>
            <select
              id="product-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="rounded-md border border-gold/30 px-3 py-2 focus:border-gold focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-28 flex-col gap-1.5">
            <label htmlFor="product-price" className="text-sm font-medium text-dark">
              {tr.admin.productForm.price}
            </label>
            <input
              id="product-price"
              type="number"
              step="0.01"
              min="0"
              value={priceLira}
              onChange={(e) => setPriceLira(e.target.value)}
              className="rounded-md border border-gold/30 px-3 py-2 focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-dark">{tr.admin.productForm.image}</span>
          <ImageUploadField value={imageUrl} onChange={setImageUrl} folder="products" />
        </div>

        <label className="flex items-center gap-2 text-sm text-dark">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          {tr.admin.productForm.isActive}
        </label>

        <div className="border-t border-gold/20 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-dark">
              {tr.admin.productForm.options.title}
            </span>
            <button
              type="button"
              onClick={addGroup}
              className="text-sm font-semibold text-terra"
            >
              {tr.admin.productForm.options.add}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {groups.map((group, gi) => (
              <div key={gi} className="rounded-md border border-gold/20 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <input
                    placeholder={tr.admin.productForm.options.groupName}
                    value={group.name}
                    onChange={(e) => updateGroup(gi, { name: e.target.value })}
                    className="flex-1 rounded-md border border-gold/30 px-2 py-1.5 text-sm focus:border-gold focus:outline-none"
                  />
                  <select
                    value={group.type}
                    onChange={(e) => updateGroup(gi, { type: e.target.value as "single" | "multi" })}
                    className="rounded-md border border-gold/30 px-2 py-1.5 text-sm focus:border-gold focus:outline-none"
                  >
                    <option value="single">{tr.admin.productForm.options.typeSingle}</option>
                    <option value="multi">{tr.admin.productForm.options.typeMulti}</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeGroup(gi)}
                    className="text-sm text-red-600"
                  >
                    {tr.admin.productForm.options.remove}
                  </button>
                </div>

                <label className="mb-2 flex items-center gap-2 text-xs text-muted">
                  <input
                    type="checkbox"
                    checked={group.is_required}
                    onChange={(e) => updateGroup(gi, { is_required: e.target.checked })}
                  />
                  {tr.admin.productForm.options.required}
                </label>

                <div className="flex flex-col gap-2">
                  {group.options.map((option, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        placeholder={tr.admin.productForm.options.optionName}
                        value={option.name}
                        onChange={(e) => updateOption(gi, oi, { name: e.target.value })}
                        className="flex-1 rounded-md border border-gold/30 px-2 py-1 text-sm focus:border-gold focus:outline-none"
                      />
                      <input
                        type="number"
                        step="0.01"
                        placeholder={tr.admin.productForm.options.priceDiff}
                        value={option.price_diff_lira}
                        onChange={(e) => updateOption(gi, oi, { price_diff_lira: e.target.value })}
                        className="w-24 rounded-md border border-gold/30 px-2 py-1 text-sm focus:border-gold focus:outline-none"
                      />
                      <label className="flex items-center gap-1 text-xs text-muted">
                        <input
                          type="checkbox"
                          checked={option.is_default}
                          onChange={(e) => updateOption(gi, oi, { is_default: e.target.checked })}
                        />
                        {tr.admin.productForm.options.isDefault}
                      </label>
                      <button
                        type="button"
                        onClick={() => removeOption(gi, oi)}
                        className="text-sm text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(gi)}
                    className="self-start text-xs font-semibold text-terra"
                  >
                    {tr.admin.productForm.options.addOption}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

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
