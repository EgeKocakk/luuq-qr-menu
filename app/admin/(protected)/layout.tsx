import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/admin/Sidebar";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { tr } from "@/i18n/tr";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-dark px-6 text-center text-cream">
        <h1 className="font-serif text-2xl">{tr.admin.unauthorized.title}</h1>
        <p className="text-cream/70">{tr.admin.unauthorized.message}</p>
        <LogoutButton className="rounded-md bg-terra px-4 py-2 text-sm font-semibold text-cream" />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 bg-cream">{children}</main>
    </div>
  );
}
