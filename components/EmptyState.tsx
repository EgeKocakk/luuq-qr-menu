export function EmptyState({
  message,
  variant = "light",
}: {
  message: string;
  variant?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-24 text-center">
      <p className={variant === "dark" ? "text-cream/60" : "text-muted"}>{message}</p>
    </div>
  );
}
