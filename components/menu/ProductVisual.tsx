import Image from "next/image";
import { ProductImagePlaceholder } from "./ProductImagePlaceholder";

/** Boyutu/şekli çağıran taraf className ile belirler (aspect-square, w-[Npx] vb.) */
export function ProductVisual({
  imageUrl,
  name,
  className = "",
}: {
  imageUrl: string | null;
  name: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {imageUrl ? (
        <Image src={imageUrl} alt={name} fill sizes="200px" className="object-cover" />
      ) : (
        <ProductImagePlaceholder className="h-full w-full" />
      )}
    </div>
  );
}
