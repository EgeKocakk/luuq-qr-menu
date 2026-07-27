import Link from "next/link";
import { tr } from "@/i18n/tr";
import { LogoutButton } from "./LogoutButton";

const links = [
  { href: "/admin/menu", label: tr.admin.sidebar.menu },
  { href: "/admin/qr", label: tr.admin.sidebar.qr },
  { href: "/admin/settings", label: tr.admin.sidebar.settings },
];

export function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col justify-between border-r border-gold/20 bg-dark p-4 text-cream">
      <nav className="flex flex-col gap-1">
        <span className="mb-4 px-2 font-serif text-lg tracking-wide text-gold">LUUQ</span>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-sm text-cream/85 transition-colors hover:bg-cream/10"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-1">
        <Link
          href="/"
          className="rounded-md px-3 py-2 text-sm text-cream/60 transition-colors hover:bg-cream/10"
        >
          {tr.admin.sidebar.viewSite}
        </Link>
        <LogoutButton className="rounded-md px-3 py-2 text-left text-sm text-cream/60 transition-colors hover:bg-cream/10" />
      </div>
    </aside>
  );
}
