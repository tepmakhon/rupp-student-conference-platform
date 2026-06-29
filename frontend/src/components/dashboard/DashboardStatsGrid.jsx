function DashboardStatsGrid({ children }) {
  return (
    <div
      className="

        grid

        grid-cols-1

        sm:grid-cols-2

        xl:grid-cols-3

        2xl:grid-cols-4

        gap-6

      "
    >
      {children}
    </div>
  );
}

export default DashboardStatsGrid;
