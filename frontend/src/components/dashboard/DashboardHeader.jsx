function DashboardHeader({
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

          Student Dashboard

        </h1>

        <p
          className="
            text-gray-500

            mt-2
          "
        >

          Track your activities,
          events and opportunities.

        </p>

      </div>

      <button

        onClick={
          onRefresh
        }

        className="
          self-start

          md:self-auto

          bg-primary

          hover:bg-secondary

          text-white

          px-5

          py-3

          rounded-2xl

          transition
        "
      >

        Refresh

      </button>

    </div>

  );

}

export default DashboardHeader;