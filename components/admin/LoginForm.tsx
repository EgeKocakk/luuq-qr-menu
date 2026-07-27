"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { tr } from "@/i18n/tr";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });

    if (signInError) {
      setError(
        signInError.message.toLowerCase().includes("invalid")
          ? tr.admin.login.invalidCredentials
          : tr.admin.login.genericError,
      );
      setSubmitting(false);
      return;
    }

    router.push("/admin/menu");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-cream/90">
          {tr.admin.login.email}
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md border border-gold/30 bg-cream/10 px-3 py-2 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-cream/90">
          {tr.admin.login.password}
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-gold/30 bg-cream/10 px-3 py-2 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
        />
      </div>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-md bg-terra px-4 py-2.5 font-semibold text-cream transition-colors hover:bg-terra/90 disabled:opacity-60"
      >
        {submitting ? tr.admin.login.submitting : tr.admin.login.submit}
      </button>
    </form>
  );
}
