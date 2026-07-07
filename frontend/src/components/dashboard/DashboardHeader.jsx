function DashboardHeader({
  title,
  subtitle,
  loading,
  onRefresh,
}) {
  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        mb-8
      "
    >
      <div>
        <h1
          className="
            text-4xl
            font-bold
            text-primary
          "
        >
          {title}
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          {subtitle}
        </p>
      </div>

      <button
        onClick={onRefresh}
        disabled={loading}
        className="
          self-start
          md:self-auto
          bg-primary
          hover:bg-secondary
          disabled:opacity-50
          disabled:cursor-not-allowed
          text-white
          px-5
          py-3
          rounded-2xl
          transition
        "
      >
        {loading ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}

export default DashboardHeader;