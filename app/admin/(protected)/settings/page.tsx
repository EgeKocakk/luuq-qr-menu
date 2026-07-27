"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Settings } from "@/lib/types";
import { tr } from "@/i18n/tr";
import { PageHeader } from "@/components/admin/PageHeader";
import { ErrorState } from "@/components/ErrorState";

type LoadState = "loading" | "ready" | "error";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [announcement, setAnnouncement] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoadState("loading");
    const supabase = createClient();
    const { data, error } = await supabase.from("settings").select("*").single();

    if (error) {
      setLoadState("error");
      return;
    }

    const row = data as Settings;
    setSettings(row);
    setAnnouncement(row.announcement ?? "");
    setLoadState("ready");
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount'ta sunucudan veri çekme
    load();
  }, [load]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSavedMessage(null);
    const supabase = createClient();

    await supabase
      .from("settings")
      .update({ announcement: announcement.trim() ? announcement : null })
      .eq("id", true);

    setSaving(false);
    setSavedMessage(tr.admin.settings.saved);
  }

  if (loadState === "loading") {
    return (
      <div className="flex flex-col gap-4 p-6">
        <div className="h-8 w-48 animate-pulse rounded-md bg-cream-dark" />
        <div className="h-32 animate-pulse rounded-lg bg-cream-dark" />
      </div>
    );
  }

  if (loadState === "error" || !settings) {
    return <ErrorState message={tr.admin.common.error} onRetry={load} />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title={tr.admin.settings.title} />

      <form
        onSubmit={handleSave}
        className="flex max-w-md flex-col gap-5 rounded-lg border border-gold/20 bg-white p-5"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="announcement" className="text-sm font-medium text-dark">
            {tr.admin.settings.announcement}
          </label>
          <textarea
            id="announcement"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder={tr.admin.settings.announcementPlaceholder}
            rows={3}
            className="rounded-md border border-gold/30 px-3 py-2 focus:border-gold focus:outline-none"
          />
          <p className="text-xs text-muted">{tr.admin.settings.announcementHelp}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="self-start rounded-md bg-terra px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-terra/90 disabled:opacity-60"
          >
            {saving ? tr.admin.common.saving : tr.admin.common.save}
          </button>
          {savedMessage ? <span className="text-sm text-green-700">{savedMessage}</span> : null}
        </div>
      </form>
    </div>
  );
}
