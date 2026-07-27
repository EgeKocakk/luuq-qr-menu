import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { tr } from "@/i18n/tr";

export default function AdminLoginPage() {
  return (
    <div className="motif-bg flex flex-1 flex-col items-center justify-center gap-8 bg-dark px-6 py-16">
      <Logo />
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-center font-serif text-2xl text-cream">{tr.admin.login.title}</h1>
        <LoginForm />
      </div>
    </div>
  );
}
