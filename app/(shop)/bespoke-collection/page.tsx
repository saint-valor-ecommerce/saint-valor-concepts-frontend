import { CustomJewelrySection } from "@/components/bespoke/CustomJewelry";
import LinkButton from "@/components/ui/LinkButton";

const page = () => {
  const bgUrl = "/images/hero-bg.png";
  return (
    <>
      <section
        className="relative w-full min-h-130 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative w-full max-w-5xl px-6 md:px-10 text-center space-y-6">
          <h1 className="text-ivory font-medium leading-tight tracking-wide text-3xl sm:text-4xl md:text-5xl">
            Custom Jewelry Designed Around
            <br />
            Your Story
          </h1>

          <p className="mt-4 text-ivory/80 text-sm md:text-xl lg:text-base max-w-2xl mx-auto leading-relaxed">
            A personalized design experience creating refined pieces that
            reflect your vision, moments, and individuality.
          </p>

          <LinkButton
            href="/shop"
            label="Shop Now"
            size="sm"
            variant="primary"
          />
        </div>
      </section>

      <CustomJewelrySection />
    </>
  );
};

export default page;
