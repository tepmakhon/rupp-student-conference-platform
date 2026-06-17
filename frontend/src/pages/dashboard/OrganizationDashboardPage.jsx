import {

  useEffect,

} from "react";

import {

  Link,

} from "react-router-dom";

import {

  PlusCircleIcon,

  CalendarDaysIcon,

  BriefcaseIcon,

} from "@heroicons/react/24/outline";

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

  getOrganizationDashboard,

} from "../../api/dashboardApi";

import {

  setDashboardLoading,

  setDashboardStats,

  setDashboardError,

} from "../../redux/slices/dashboardSlice";

function OrganizationDashboardPage() {

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

          await getOrganizationDashboard();

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

          title="Organization Dashboard"

          subtitle="Manage your events and opportunities."

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

                  title="Total Events"

                  value={

                    stats?.totalEvents

                  }

                />

                <DashboardStatCard

                  title="Approved Events"

                  value={

                    stats?.approvedEvents

                  }

                />

                <DashboardStatCard

                  title="Pending Events"

                  value={

                    stats?.pendingEvents

                  }

                />

                <DashboardStatCard

                  title="Total Opportunities"

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

                  title="Pending Opportunities"

                  value={

                    stats?.pendingOpportunities

                  }

                />

                <DashboardStatCard

                  title="Applicants"

                  value={

                    stats?.totalApplicants

                  }

                />

                <DashboardStatCard

                  title="Registrations"

                  value={

                    stats?.totalRegistrations

                  }

                />

              </DashboardStatsGrid>

              <div
                className="
                  mt-12
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-primary
                    mb-6
                  "
                >

                  Quick Actions

                </h2>

                <div
                  className="
                    grid
                    md:grid-cols-3
                    gap-6
                  "
                >

                  <Link

                    to="/events/create"

                    className="
                      bg-white
                      shadow-md
                      rounded-2xl
                      p-6
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <PlusCircleIcon

                      className="
                        w-8
                        h-8
                        text-primary
                      "
                    />

                    Create Event

                  </Link>

                  <Link

                    to="/opportunities/create"

                    className="
                      bg-white
                      shadow-md
                      rounded-2xl
                      p-6
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <BriefcaseIcon

                      className="
                        w-8
                        h-8
                        text-primary
                      "
                    />

                    Create Opportunity

                  </Link>

                  <Link

                    to="/organization/events"

                    className="
                      bg-white
                      shadow-md
                      rounded-2xl
                      p-6
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <CalendarDaysIcon

                      className="
                        w-8
                        h-8
                        text-primary
                      "
                    />

                    Manage Events

                  </Link>

                </div>

              </div>

            </>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default OrganizationDashboardPage;