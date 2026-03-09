import { ArrowUp, ArrowDown } from "lucide-react";

interface ChangeBadgeProps {
  percentage: number;
}

const ChangeBadge = ({ percentage }: ChangeBadgeProps) => {
  const isPositive = percentage >= 0;

  return (
    <div
      className={`px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold ${
        isPositive ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
      }`}
    >
      {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      <span>{Math.abs(percentage).toFixed(2)}%</span>
    </div>
  );
};

export default ChangeBadge;
