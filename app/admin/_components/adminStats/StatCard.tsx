interface StatCardProps {
  label: string;
  value: string;
}

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white px-6 py-5 shadow-sm">
      {/* Label */}
      <p className="text-xs font-semibold text-secondary mb-3">{label}</p>

      {/* Value row */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-light text-charcoal leading-none tracking-tight mb-3">
            {value}{" "}
            <span className="text-sm text-charcoal font-normal">Total</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
