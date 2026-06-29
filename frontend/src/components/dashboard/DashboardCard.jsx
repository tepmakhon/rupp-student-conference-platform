function DashboardCard({
  title,

  value,
}) {
  return (
    <div
      className="

        bg-white

        rounded-2xl

        shadow-md

        p-6

      "
    >
      <p
        className="

          text-gray-500

          mb-2

        "
      >
        {title}
      </p>

      <h2
        className="

          text-4xl

          font-bold

          text-primary

        "
      >
        {value || 0}
      </h2>
    </div>
  );
}

export default DashboardCard;
