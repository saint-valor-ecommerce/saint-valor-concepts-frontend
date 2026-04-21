import LinkButton from "../ui/LinkButton";
import GemSliderTrack from "./GemSliderTrack";
import { gems } from "@/data/gems";

export default function JewelryCarousel() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden py-10">
      {/* Heading */}
      <div className="text-center mb-14 max-w-lg">
        <h2 className="font-medium mb-4 text-4xl">
          Custom Jewelry, <br className="hidden sm:block" />
          Crafted Around You
        </h2>
        <p className="px-4 text-sm">
          Work with Saint Valor to create a piece that reflects your story,
          style, and individuality.
        </p>
      </div>

      {/* Slider */}
      <GemSliderTrack gems={gems} />

      {/* CTA */}
      <div className="flex flex-col items-center gap-3">
        <LinkButton href="/shop" label="View all" variant="primary" size="sm" />
      </div>
    </section>
  );
}
