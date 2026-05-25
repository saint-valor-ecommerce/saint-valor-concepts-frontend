import StatsSection from "../../_components/adminStats/StatsSection";

const page = () => {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Desktop view */}
      <div className="hidden lg:block">
        <StatsSection />
      </div>

      {/* Mobile view fallback */}
      <div className="lg:hidden flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
        <div className="bg-white/80 backdrop-blur-md border border-gold/15 p-8 shadow-sm flex flex-col items-center max-w-sm mx-auto">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-5">
            <svg
              className="w-6 h-6 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-charcoal tracking-tight">
            Desktop View Required
          </h2>
          <p className="mt-3 text-xs leading-relaxed text-secondary">
            The Saint Valor administrator dashboard is optimized for wider
            viewports to manage analytics, inventory, and orders effectively.
          </p>
          <div className="mt-6 w-12 h-px bg-gold/30" />
          <p className="mt-4 text-[10px] text-gold font-medium uppercase tracking-widest">
            saint valor admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
