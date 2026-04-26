import Image from "next/image";
import { Gem } from "@/types/carousel";

const sizeMap: Record<Gem["size"], string> = {
  md: "w-[80px] h-[80px]",
};

export default function GemPlaceholder({ gem }: { gem: Gem }) {
  return (
    <div
      className={`
        ${sizeMap[gem.size]}
        relative shrink-0 rounded-full overflow-hidden cursor-pointer
        transition-transform duration-300 ease-out
        hover:scale-110 hover:shadow-[0_8px_28px_rgba(0,0,0,0.16)]
      `}
    >
      <Image
        src={gem.src}
        alt={gem.alt}
        fill
        sizes="(max-width: 640px) 90px, (max-width: 768px) 112px, 112px"
        className="object-cover"
      />
    </div>
  );
}
