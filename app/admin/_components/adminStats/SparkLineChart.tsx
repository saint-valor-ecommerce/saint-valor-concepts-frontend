import { LineChart, Line, ResponsiveContainer } from "recharts";

interface SparklineChartProps {
  data: number[];
  color: string;
}

const SparklineChart = ({ data, color }: SparklineChartProps) => {
  const formatted = data.map((value) => ({ value }));

  return (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart
        data={formatted}
        style={{ background: "#f3f4f6", borderRadius: "8px" }}
        margin={{ top: 20, right: 8, bottom: 8, left: 8 }}
      >
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SparklineChart;
