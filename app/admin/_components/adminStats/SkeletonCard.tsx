const SkeletonCard = () => (
  <div className="rounded-2xl border border-[#C9A050]/10 bg-white px-6 py-5 shadow-sm">
    <div className="h-3 w-20 rounded-full bg-[#F5F0E8] animate-pulse mb-3" />
    <div className="h-8 w-28 rounded-full bg-[#F5F0E8] animate-pulse mb-3" />
    <div className="h-4 w-16 rounded-full bg-[#F5F0E8] animate-pulse" />
  </div>
);

export default SkeletonCard;
