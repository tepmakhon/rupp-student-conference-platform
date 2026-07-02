function AnalyticsFilterBar({ month, year, setMonth, setYear }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();

  return (
    <div
      className="
        flex
        gap-4
        mb-6
      "
    >
      <select
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        className="
          border
          rounded-xl
          px-4
          py-2
        "
      >
        {months.map((m, index) => (
          <option key={m} value={index + 1}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="
          border
          rounded-xl
          px-4
          py-2
        "
      >
        {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AnalyticsFilterBar;
