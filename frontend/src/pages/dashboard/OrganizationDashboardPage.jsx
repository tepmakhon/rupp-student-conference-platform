import {

  useEffect,

  useCallback,

} from "react";

import {

  Link,

} from "react-router-dom";

import {

  useDispatch,

  useSelector,

} from "react-redux";

import {

  PlusCircleIcon,

  CalendarDaysIcon,

  BriefcaseIcon,

  CheckCircleIcon,

  ClockIcon,

  UserGroupIcon,

  ClipboardDocumentListIcon,

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

  getOrganizationDashboard,

} from "../../api/dashboardApi";

import {

  setDashboardLoading,

  setDashboardStats,

  setDashboardError,

} from "../../redux/slices/dashboardSlice";
import socket from "../../socket/socket";

function OrganizationDashboardPage() {

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

            await getOrganizationDashboard();

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

      "Total Events",

      value:

      stats?.totalEvents,

      icon:

      CalendarDaysIcon,

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

      "Pending Events",

      value:

      stats?.pendingEvents,

      icon:

      ClockIcon,

    },

    {

      title:

      "Total Opportunities",

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

      "Pending Opportunities",

      value:

      stats?.pendingOpportunities,

      icon:

      ClockIcon,

    },

    {

      title:

      "Registrations",

      value:

      stats?.totalRegistrations,

      icon:

      ClipboardDocumentListIcon,

    },

    {

      title:

      "Applicants",

      value:

      stats?.totalApplicants,

      icon:

      UserGroupIcon,

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

          title="Organization Dashboard"

          subtitle="Manage your events and opportunities"

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

                {/* Performance */}

                <div

                  className="

                    bg-white

                    rounded-3xl

                    border

                    shadow-sm

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

                    Performance

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

                    border

                    shadow-sm

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

                    <Link

                      to="/events/create"

                      className="

                        p-5

                        rounded-2xl

                        border

                        hover:bg-gray-50

                        transition

                        flex

                        flex-col

                        items-center

                        gap-3

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

                        p-5

                        rounded-2xl

                        border

                        hover:bg-gray-50

                        transition

                        flex

                        flex-col

                        items-center

                        gap-3

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

                        p-5

                        rounded-2xl

                        border

                        hover:bg-gray-50

                        transition

                        flex

                        flex-col

                        items-center

                        gap-3

                      "

                    >

                      <CalendarDaysIcon

                        className="

                          w-8

                          h-8

                          text-primary

                        "

                      />

                      My Events

                    </Link>

                    <Link

                      to="/organization/opportunities"

                      className="

                        p-5

                        rounded-2xl

                        border

                        hover:bg-gray-50

                        transition

                        flex

                        flex-col

                        items-center

                        gap-3

                      "

                    >

                      <BriefcaseIcon

                        className="

                          w-8

                          h-8

                          text-primary

                        "

                      />

                      My Opportunities

                    </Link>

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

export default OrganizationDashboardPage;