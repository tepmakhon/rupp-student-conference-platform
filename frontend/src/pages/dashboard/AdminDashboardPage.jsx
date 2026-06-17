import {

  useEffect,

} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

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

import {

  getAdminDashboard,

} from "../../api/dashboardApi";

import {

  setDashboardLoading,

  setDashboardStats,

  setDashboardError,

} from "../../redux/slices/dashboardSlice";

function AdminDashboardPage() {

  const dispatch =
    useDispatch();

  const {

    stats,

    loading,

    error,

  } = useSelector(

    (state) =>

      state.dashboard

  );

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        dispatch(

          setDashboardLoading(
            true
          )

        );

        dispatch(

          setDashboardError(
            null
          )

        );

        const data =

          await getAdminDashboard();

        dispatch(

          setDashboardStats(
            data
          )

        );

      } catch (error) {

        console.error(
          error
        );

        dispatch(

          setDashboardError(

            "Failed to load dashboard"

          )

        );

      } finally {

        dispatch(

          setDashboardLoading(
            false
          )

        );

      }

    };

  return (

    <DashboardLayout>

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        <DashboardHeader

          title="Admin Dashboard"

          subtitle="Platform overview and analytics."

          loading={
            loading
          }

          onRefresh={
            loadDashboard
          }

        />

        {

          loading &&

          <DashboardLoading />

        }

        {

          !loading &&

          error && (

            <DashboardError

              message={
                error
              }

            />

          )

        }

        {

          !loading &&

          !error && (

            <DashboardStatsGrid>

              <DashboardStatCard

                title="Students"

                value={
                  stats?.totalStudents
                }

              />

              <DashboardStatCard

                title="Organizations"

                value={
                  stats?.totalOrganizations
                }

              />

              <DashboardStatCard

                title="Events"

                value={
                  stats?.totalEvents
                }

              />

              <DashboardStatCard

                title="Pending Events"

                value={
                  stats?.pendingEvents
                }

              />

              <DashboardStatCard

                title="Approved Events"

                value={
                  stats?.approvedEvents
                }

              />

              <DashboardStatCard

                title="Rejected Events"

                value={
                  stats?.rejectedEvents
                }

              />

              <DashboardStatCard

                title="Opportunities"

                value={
                  stats?.totalOpportunities
                }

              />

              <DashboardStatCard

                title="Approved Opportunities"

                value={
                  stats?.approvedOpportunities
                }

              />

              <DashboardStatCard

                title="Applications"

                value={
                  stats?.totalApplications
                }

              />

            </DashboardStatsGrid>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default AdminDashboardPage;