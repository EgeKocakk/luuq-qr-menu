export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-muted">{message}</p>
      <a
        href="/"
        className="rounded-md bg-terra px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-terra/90"
      >
        Tekrar dene
      </a>
    </div>
  );
}
