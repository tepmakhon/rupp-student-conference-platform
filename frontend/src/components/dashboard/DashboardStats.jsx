import {
  TrophyIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

import DashboardStatCard from "./DashboardStatCard";

function DashboardStats({ dashboard }) {
  const stats = [
    {
      title: "Activity Score",

      value: dashboard.activityScore,

      icon: TrophyIcon,
    },

    {
      title: "Registrations",

      value: dashboard.registrations,

      icon: CalendarDaysIcon,
    },

    {
      title: "Applications",

      value: dashboard.applications,

      icon: BriefcaseIcon,
    },

    {
      title: "Saved",

      value: dashboard.saved,

      icon: BookmarkIcon,
    },
  ];

  return (
    <div
      className="
        grid

        grid-cols-1

        sm:grid-cols-2

        xl:grid-cols-4

        gap-6

        mb-8
      "
    >
      {stats.map((item) => (
        <DashboardStatCard
          key={item.title}

          {...item}
        />
      ))}
    </div>
  );
}

export default DashboardStats;
