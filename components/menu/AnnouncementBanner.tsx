export function AnnouncementBanner({ text }: { text: string }) {
  return (
    <div className="bg-terra px-6 py-2.5 text-center text-sm font-medium text-cream">
      {text}
    </div>
  );
}
