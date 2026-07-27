export function CampaignBanner({ text }: { text: string }) {
  return (
    <div className="px-4">
      <div className="flex aspect-[2.5/1] w-full items-center justify-center overflow-hidden rounded-lg bg-cream-dark shadow-[0_4px_10px_rgba(59,42,38,0.12)]">
        <p className="px-6 text-center font-serif text-lg text-dark">{text}</p>
      </div>
    </div>
  );
}
