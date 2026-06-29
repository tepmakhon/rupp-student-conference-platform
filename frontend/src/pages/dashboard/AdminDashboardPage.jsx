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

import socket from "../../socket/socket";

function AdminDashboardPage() {
  const dispatch =
    useDispatch();

  const {

    stats,

    loading,

    error,

  } = useSelector(

    state =>

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

        catch (

          error

        ) {

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

          space-y-8

        "

      >

        <DashboardHeader

          title="Admin Dashboard"

          subtitle="Manage and monitor the entire RUPP Platform"

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

                {

                  dashboardCards.map(

                    card => (

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

              {/* Bottom Section */}

              <div

                className="

                  grid

                  grid-cols-1

                  lg:grid-cols-2

                  gap-8

                "

              >

                {/* Summary */}

                <div

                  className="

                    bg-white

                    rounded-3xl

                    shadow-sm

                    border

                    p-6

                  "

                >

                  <h3

                    className="

                      text-2xl

                      font-bold

                      text-primary

                      mb-6

                    "

                  >

                    Platform Summary

                  </h3>

                  <div

                    className="

                      space-y-5

                    "

                  >

                    <div

                      className="

                        flex

                        justify-between

                      "

                    >

                      <span>

                        Event Approval Rate

                      </span>

                      <span

                        className="

                          font-bold

                          text-green-600

                        "

                      >

                        {

                          stats?.totalEvents

                          ?

                          Math.round(

                            (

                              stats.approvedEvents

                              /

                              stats.totalEvents

                            )

                            * 100

                          )

                          :

                          0

                        }%

                      </span>

                    </div>

                    <div

                      className="

                        flex

                        justify-between

                      "

                    >

                      <span>

                        Opportunity Approval Rate

                      </span>

                      <span

                        className="

                          font-bold

                          text-green-600

                        "

                      >

                        {

                          stats?.totalOpportunities

                          ?

                          Math.round(

                            (

                              stats.approvedOpportunities

                              /

                              stats.totalOpportunities

                            )

                            * 100

                          )

                          :

                          0

                        }%

                      </span>

                    </div>

                  </div>

                </div>

                {/* Quick Actions */}

                <div

                  className="

                    bg-white

                    rounded-3xl

                    shadow-sm

                    border

                    p-6

                  "

                >

                  <h3

                    className="

                      text-2xl

                      font-bold

                      text-primary

                      mb-6

                    "

                  >

                    Quick Actions

                  </h3>

                  <div

                    className="

                      grid

                      grid-cols-2

                      gap-4

                    "

                  >

                    <button

                      className="

                        p-4

                        border

                        rounded-xl

                        hover:bg-gray-50

                        transition

                      "

                    >

                      Review Events

                    </button>

                    <button

                      className="

                        p-4

                        border

                        rounded-xl

                        hover:bg-gray-50

                        transition

                      "

                    >

                      Review Opportunities

                    </button>

                    <button

                      className="

                        p-4

                        border

                        rounded-xl

                        hover:bg-gray-50

                        transition

                      "

                    >

                      Manage Skills

                    </button>

                    <button

                      className="

                        p-4

                        border

                        rounded-xl

                        hover:bg-gray-50

                        transition

                      "

                    >

                      Manage Universities

                    </button>

                  </div>

                </div>

              </div>

            </>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default AdminDashboardPage;