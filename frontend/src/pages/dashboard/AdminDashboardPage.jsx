import {

  useEffect,

  useCallback,

} from "react";

import {

  useDispatch,

  useSelector,

} from "react-redux";

import {

  UsersIcon,

  BuildingOffice2Icon,

  CalendarDaysIcon,

  ClockIcon,

  CheckCircleIcon,

  XCircleIcon,

  BriefcaseIcon,

  DocumentTextIcon,

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

  const loadDashboard =

    useCallback(

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

        }

        catch (error) {

          console.error(

            error

          );

          dispatch(

            setDashboardError(

              "Failed to load dashboard"

            )

          );

        }

        finally {

          dispatch(

            setDashboardLoading(

              false

            )

          );

        }

      },

      [

        dispatch,

      ]

    );

  useEffect(() => {

    loadDashboard();

  },

  [

    loadDashboard,

  ]);

  const dashboardCards = [

    {

      title:

      "Students",

      value:

      stats?.totalStudents,

      icon:

      UsersIcon,

    },

    {

      title:

      "Organizations",

      value:

      stats?.totalOrganizations,

      icon:

      BuildingOffice2Icon,

    },

    {

      title:

      "Events",

      value:

      stats?.totalEvents,

      icon:

      CalendarDaysIcon,

    },

    {

      title:

      "Pending Events",

      value:

      stats?.pendingEvents,

      icon:

      ClockIcon,

    },

    {

      title:

      "Approved Events",

      value:

      stats?.approvedEvents,

      icon:

      CheckCircleIcon,

    },

    {

      title:

      "Rejected Events",

      value:

      stats?.rejectedEvents,

      icon:

      XCircleIcon,

    },

    {

      title:

      "Opportunities",

      value:

      stats?.totalOpportunities,

      icon:

      BriefcaseIcon,

    },

    {

      title:

      "Approved Opportunities",

      value:

      stats?.approvedOpportunities,

      icon:

      CheckCircleIcon,

    },

    {

      title:

      "Applications",

      value:

      stats?.totalApplications,

      icon:

      DocumentTextIcon,

    },

  ];

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

          !loading

          &&

          error

          &&

          (

            <DashboardError

              message={

                error

              }

            />

          )

        }

        {

          !loading

          &&

          !error

          &&

          (

            <DashboardStatsGrid>

              {

                dashboardCards.map(

                  (

                    card

                  ) => (

                    <DashboardStatCard

                      key={

                        card.title

                      }

                      title={

                        card.title

                      }

                      value={

                        card.value

                      }

                      icon={

                        card.icon

                      }

                    />

                  )

                )

              }

            </DashboardStatsGrid>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default AdminDashboardPage;