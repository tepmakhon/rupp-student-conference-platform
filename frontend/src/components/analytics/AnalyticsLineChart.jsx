import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function AnalyticsLineChart({ data }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-8
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          text-primary
          mb-6
        "
      >
        Monthly Trend
      </h2>

      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="registrations"
            stroke="#2563EB"
            strokeWidth={3}
            dot
          />

          <Line
            type="monotone"
            dataKey="applications"
            stroke="#16A34A"
            strokeWidth={3}
            dot
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsLineChart;
