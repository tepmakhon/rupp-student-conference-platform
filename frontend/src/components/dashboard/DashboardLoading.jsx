import { ArrowPathIcon } from "@heroicons/react/24/outline";

function DashboardLoading() {
  return (
    <div
      className="

        bg-white

        rounded-2xl

        border

        shadow-sm

        p-16

        flex

        flex-col

        items-center

        justify-center

        gap-4

      "
    >
      <ArrowPathIcon
        className="

          w-10

          h-10

          text-primary

          animate-spin

        "
      />

      <p
        className="

          text-gray-500

        "
      >
        Loading dashboard...
      </p>
    </div>
  );
}

export default DashboardLoading;
