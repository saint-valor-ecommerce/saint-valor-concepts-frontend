import { TeamGrid } from "./TeamGrid";

const TEAM_MEMBERS = [
  {
    id: "jamiu",
    name: "Jamiu Gbadamosi",
    role: "Founder & Creative Director",
    imageSrc: "/images/IMG_5490.JPG.jpeg",
  },
];

const Team = () => {
  return (
    <section className="bg-ivory py-14 md:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-charcoal text-3xl md:text-4xl font-medium leading-tight">
            The Visionary Behind <br className="hidden sm:block" />
            Saint Valor
          </h3>

          <p className="text-charcoal/70 text-sm mt-4 leading-relaxed">
            A curated selection of fine jewelry designed to reflect elegance,
            confidence, and enduring style.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 md:mt-14">
          <TeamGrid members={TEAM_MEMBERS} />
        </div>
      </div>
    </section>
  );
};

export default Team;
