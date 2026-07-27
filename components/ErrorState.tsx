import Link from "next/link";
import { tr } from "@/i18n/tr";

export function ErrorState({
  message,
  onRetry,
  variant = "light",
}: {
  message: string;
  onRetry?: () => void;
  variant?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className={variant === "dark" ? "text-cream/60" : "text-muted"}>{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-md bg-terra px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-terra/90"
        >
          {tr.menu.retry}
        </button>
      ) : (
        <Link
          href="/"
          className="rounded-md bg-terra px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-terra/90"
        >
          {tr.menu.retry}
        </Link>
      )}
    </div>
  );
}
