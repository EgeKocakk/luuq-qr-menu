"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { tr } from "@/i18n/tr";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleLogout} className={className}>
      {tr.admin.sidebar.logout}
    </button>
  );
}
