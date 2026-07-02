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
import AnalyticsFilterBar from "../../components/analytics/AnalyticsFilterBar";
import {
  getStudentAnalytics,
  getOrganizationAnalytics,
  getAdminAnalytics,
} from "../../api/analyticsApi";
import TopEventsTable from "../../components/analytics/TopEventsTable";

function AnalyticsPage() {
  const role = useSelector((state) => state.auth.role);

  const [loading, setLoading] = useState(true);

  const [cards, setCards] = useState([]);
  const today = new Date();
  const [trendData, setTrendData] = useState([]);

  const [month, setMonth] = useState(today.getMonth() + 1);

  const [year, setYear] = useState(today.getFullYear());

  const [topEvents, setTopEvents] = useState([]);
  useEffect(() => {
    loadAnalytics();
  }, [month, year, role]);

  const loadAnalytics = async () => {
    try {
      let data;

      if (role === "STUDENT") {
        data = await getStudentAnalytics({
          month,
          year,
        });
        setTrendData(
          data.monthlyTrend.registrations.map((item, index) => ({
            month: item.month,
            registrations: item.value,
            applications: data.monthlyTrend.applications[index].value,
          })),
        );

        setCards([
          {
            title: "Registered Events",
            value: data.summary.registrations,
            growth: data.growth.registrations,
            icon: CalendarDaysIcon,
          },
          {
            title: "Applications",
            value: data.summary.applications,
            growth: data.growth.applications,
            icon: BriefcaseIcon,
          },
          {
            title: "Saved",
            value: data.summary.saved,
            growth: data.growth.saved,
            icon: BriefcaseIcon,
          },
          {
            title: "Activity Score",
            value: data.summary.activityScore,
            growth: null,
            icon: TrophyIcon,
          },
        ]);
      }

      if (role === "ORGANIZATION") {
        data = await getOrganizationAnalytics({
          month,
          year,
        });
        setTopEvents(data.topEvents);
        setTrendData(
          data.monthlyTrend.registrations.map((item, index) => ({
            month: item.month,
            registrations: item.value,
            applications: data.monthlyTrend.applications[index].value,
          })),
        );

        setCards([
          {
            title: "Events",
            value: data.summary.events,
            growth: data.growth.events,
            icon: CalendarDaysIcon,
          },
          {
            title: "Opportunities",
            value: data.summary.opportunities,
            growth: data.growth.opportunities,
            icon: BriefcaseIcon,
          },
          {
            title: "Participants",
            value: data.summary.registrations,
            growth: data.growth.registrations,
            icon: UserGroupIcon,
          },
          {
            title: "Applications",
            value: data.summary.applications,
            growth: data.growth.applications,
            icon: BriefcaseIcon,
          },
        ]);
      }

      if (role === "ADMIN") {
        data = await getAdminAnalytics({
          month,
          year,
        });
        setTrendData(
          data.monthlyTrend.registrations.map((item, index) => ({
            month: item.month,
            registrations: item.value,
            applications: data.monthlyTrend.applications[index].value,
          })),
        );

        setCards([
          {
            title: "Students",
            value: data.summary.students,
            growth: data.growth.students,
            icon: UserGroupIcon,
          },
          {
            title: "Organizations",
            value: data.summary.organizations,
            growth: data.growth.organizations,
            icon: BuildingOfficeIcon,
          },
          {
            title: "Events",
            value: data.summary.events,
            growth: data.growth.events,
            icon: CalendarDaysIcon,
          },
          {
            title: "Opportunities",
            value: data.summary.opportunities,
            growth: data.growth.opportunities,
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
            <AnalyticsFilterBar
              month={month}
              year={year}
              setMonth={setMonth}
              setYear={setYear}
            />
            <AnalyticsGrid cards={cards} />

            <div
              className="
                grid
                lg:grid-cols-2
                gap-8
              "
            >
              <AnalyticsBarChart data={trendData} />
              <AnalyticsPieChart
                data={cards.map((card) => ({
                  name: card.title,
                  value: Number(card.value),
                }))}
              />
            </div>

            <AnalyticsLineChart data={trendData} />
            {role === "ORGANIZATION" && <TopEventsTable events={topEvents} />}
            <ExportButtons />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AnalyticsPage;
