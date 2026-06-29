import {
  useEffect,
  useCallback,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  SparklesIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import DashboardHeader
from "../../components/dashboard/DashboardHeader";

import DashboardLoading
from "../../components/dashboard/DashboardLoading";

import DashboardError
from "../../components/dashboard/DashboardError";

import DashboardStatsGrid
from "../../components/dashboard/DashboardStatsGrid";

import DashboardStatCard
from "../../components/dashboard/DashboardStatCard";

import RecentOpportunities
from "../../components/dashboard/RecentOpportunities";

import UpcomingEvents
from "../../components/dashboard/UpcomingEvents";

import RecentActivities
from "../../components/dashboard/RecentActivities";

import LeaderboardPreview
from "../../components/dashboard/LeaderboardPreview";

import ProfileCompletion
from "../../components/dashboard/ProfileCompletion";

import {
  getStudentDashboard,
} from "../../api/dashboardApi";

import {
  setDashboardLoading,
  setDashboardStats,
  setDashboardError,
} from "../../redux/slices/dashboardSlice";

import socket from "../../socket/socket";

function StudentDashboardPage() {
  const dispatch =
    useDispatch();

  const user = useSelector(
    state => state.auth.user
  );

  const {
    stats,
    loading,
    error,
  } = useSelector(
    state => state.dashboard
  );
  
  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = useCallback(async () => {

    try {

      dispatch(
        setDashboardLoading(true)
      );

      dispatch(
        setDashboardError(null)
      );

      const data =
        await getStudentDashboard();

      dispatch(
        setDashboardStats(data)
      );

    }

    catch (error) {

      console.error(error);

      dispatch(
        setDashboardError(
          "Failed to load dashboard"
        )
      );

    }

    finally {

      dispatch(
        setDashboardLoading(false)
      );

    }

  }, [dispatch]);
  
  useEffect(() => {

    loadDashboard();

  }, [loadDashboard]);

  useEffect(() => {

    const refreshDashboard = () => {

      loadDashboard();

    };

    socket.on(
      "dashboard_update",
      refreshDashboard
    );

    return () => {

      socket.off(
        "dashboard_update",
        refreshDashboard
      );

    };

  }, [loadDashboard]);
  return (

    <DashboardLayout>

      <div
        className="
          max-w-7xl
          mx-auto
          space-y-8
        "
      >

        <DashboardHeader

          title="Student Dashboard"

          subtitle="Track your activities and opportunities"

          loading={loading}

          onRefresh={
            loadDashboard
          }

        />

        {loading && (
          <DashboardLoading />
        )}

        {!loading && error && (

          <DashboardError
            message={error}
          />

        )}

        {!loading && !error && (

          <>

            <DashboardStatsGrid>

              <DashboardStatCard

                title="Activity Score"

                value={
                  stats?.activityScore
                }

                icon={
                  SparklesIcon
                }

              />

              <DashboardStatCard

                title="Registrations"

                value={
                  stats?.totalRegistrations
                }

                icon={
                  CalendarDaysIcon
                }

              />

              <DashboardStatCard

                title="Applications"

                value={
                  stats?.totalApplications
                }

                icon={
                  BriefcaseIcon
                }

              />

              <DashboardStatCard

                title="Saved Opportunities"

                value={
                  stats?.savedOpportunities
                }

                icon={
                  BookmarkIcon
                }

              />

            </DashboardStatsGrid>

            <ProfileCompletion 
              profile={
                user?.profile
              }/>

            <RecentOpportunities />

            <UpcomingEvents

              events={
                stats?.upcomingEvents
              }

            />

            <RecentActivities

              activities={
                stats?.recentActivities
              }

            />

            <LeaderboardPreview />

          </>

        )}

      </div>

    </DashboardLayout>

  );

}

export default StudentDashboardPage;