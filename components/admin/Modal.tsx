export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-dark/60 p-4">
      <button type="button" aria-label="Kapat" onClick={onClose} className="absolute inset-0" />

      <div className="relative flex max-h-[85vh] w-full max-w-md flex-col overflow-y-auto rounded-lg bg-cream p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-xl text-dark">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-cream-dark"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
