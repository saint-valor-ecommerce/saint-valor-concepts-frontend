import { Gem } from "@/types/carousel";
import GemPlaceholder from "./GemPlaceHolder";

export default function GemSliderTrack({ gems }: { gems: Gem[] }) {
  return (
    <div className="w-full overflow-hidden mb-14">
      <div className="flex w-max animate-marquee items-center gap-4 md:gap-6 lg:gap-20">
        {[...gems, ...gems, ...gems, ...gems].map((gem, i) => (
          <GemPlaceholder key={`${gem.id}-${i}`} gem={gem} />
        ))}
      </div>
    </div>
  );
}
