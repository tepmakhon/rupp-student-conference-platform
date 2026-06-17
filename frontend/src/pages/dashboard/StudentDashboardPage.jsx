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

import RecentOpportunities
from "../../components/dashboard/RecentOpportunities";

import {

  getStudentDashboard,

} from "../../api/dashboardApi";

import {

  setDashboardLoading,

  setDashboardStats,

  setDashboardError,

} from "../../redux/slices/dashboardSlice";

function StudentDashboardPage() {

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

          await getStudentDashboard();

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

          title="Student Dashboard"

          subtitle="Track your activities and opportunities."

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

            <>

              <DashboardStatsGrid>

                <DashboardStatCard

                  title="Activity Score"

                  value={

                    stats?.activityScore

                  }

                />

                <DashboardStatCard

                  title="Registrations"

                  value={

                    stats?.totalRegistrations

                  }

                />

                <DashboardStatCard

                  title="Applications"

                  value={

                    stats?.totalApplications

                  }

                />

                <DashboardStatCard

                  title="Saved Opportunities"

                  value={

                    stats?.savedOpportunities

                  }

                />

              </DashboardStatsGrid>

              <div
                className="mt-10"
              >

                <RecentOpportunities />

              </div>

            </>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default StudentDashboardPage;