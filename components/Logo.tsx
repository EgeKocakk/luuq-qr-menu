import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/luuq-logo.png"
      alt="LUUQ Coffee Roastery"
      width={370}
      height={188}
      priority
      className={`h-auto w-40 ${className}`}
    />
  );
}
