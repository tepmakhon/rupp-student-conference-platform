import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import {
  ChartBarIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  UserGroupIcon,
  TrophyIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import AnalyticsGrid from "../../components/analytics/AnalyticsGrid";
import AnalyticsLoading from "../../components/analytics/AnalyticsLoading";
import ExportButtons from "../../components/analytics/ExportButtons";
import AnalyticsBarChart from "../../components/analytics/AnalyticsBarChart";
import AnalyticsPieChart from "../../components/analytics/AnalyticsPieChart";
import AnalyticsLineChart from "../../components/analytics/AnalyticsLineChart";

import {
  getStudentAnalytics,
  getOrganizationAnalytics,
  getAdminAnalytics,
} from "../../api/analyticsApi";

function AnalyticsPage() {
  const role = useSelector((state) => state.auth.role);

  const [loading, setLoading] = useState(true);

  const [cards, setCards] = useState([]);
  const chartData = cards.map((card) => ({
    name: card.title,
    value: Number(card.value),
  }));
  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      let data;

      if (role === "STUDENT") {
        data = await getStudentAnalytics();

        setCards([
          {
            title: "Activity Score",
            value: data.activityScore,
            icon: TrophyIcon,
          },
          {
            title: "Registered Events",
            value: data.registrations,
            icon: CalendarDaysIcon,
          },
          {
            title: "Applications",
            value: data.applications,
            icon: BriefcaseIcon,
          },
          {
            title: "Saved",
            value: data.saved,
            icon: BriefcaseIcon,
          },
        ]);
      }

      if (role === "ORGANIZATION") {
        data = await getOrganizationAnalytics();

        setCards([
          {
            title: "Events",
            value: data.events,
            icon: CalendarDaysIcon,
          },
          {
            title: "Opportunities",
            value: data.opportunities,
            icon: BriefcaseIcon,
          },
          {
            title: "Participants",
            value: data.registrations,
            icon: UserGroupIcon,
          },
          {
            title: "Applications",
            value: data.applications,
            icon: BriefcaseIcon,
          },
        ]);
      }

      if (role === "ADMIN") {
        data = await getAdminAnalytics();

        setCards([
          {
            title: "Students",
            value: data.students,
            icon: UserGroupIcon,
          },
          {
            title: "Organizations",
            value: data.organizations,
            icon: BuildingOfficeIcon,
          },
          {
            title: "Events",
            value: data.events,
            icon: CalendarDaysIcon,
          },
          {
            title: "Opportunities",
            value: data.opportunities,
            icon: BriefcaseIcon,
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div
        className="
          max-w-7xl
          mx-auto
          space-y-8
        "
      >
        <PageHeader
          title="Analytics"
          description="Platform analytics overview."
        />

        {loading ? (
          <AnalyticsLoading />
        ) : (
          <>
            <AnalyticsGrid cards={cards} />

            <div
              className="
                grid
                lg:grid-cols-2
                gap-8
              "
            >
              <AnalyticsBarChart data={chartData} />

              <AnalyticsPieChart data={chartData} />
            </div>

            <AnalyticsLineChart data={chartData} />

            <ExportButtons />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AnalyticsPage;
