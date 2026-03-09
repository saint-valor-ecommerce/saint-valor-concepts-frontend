import ChangeBadge from "./ChangeBadge";
import SparklineChart from "./SparkLineChart";

interface StatCardProps {
  label: string;
  value: string;
  percentage: number;
  sparklineData: number[];
  sparklineColor: string;
}

const StatCard = ({
  label,
  value,
  percentage,
  sparklineData,
  sparklineColor,
}: StatCardProps) => {
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
          <div className="flex items-center gap-3">
            <ChangeBadge percentage={percentage} />
            <span className="text-xs text-secondary">than last month</span>
          </div>
        </div>

        {/* Sparkline */}
        <div className="w-32 shrink-0">
          <SparklineChart data={sparklineData} color={sparklineColor} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
