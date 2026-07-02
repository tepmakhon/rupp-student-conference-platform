import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

function AnalyticsBarChart({ data }) {
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
        Monthly Comparison
      </h2>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar dataKey="registrations" fill="#2563EB" radius={[6, 6, 0, 0]} />

          <Bar dataKey="applications" fill="#16A34A" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsBarChart;
