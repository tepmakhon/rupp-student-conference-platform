import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

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

            "Failed to load admin dashboard"

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

        <div

          className="

            flex

            justify-between

            items-center

            mb-8

          "

        >

          <div>

            <h1

              className="

                text-4xl

                font-bold

                text-primary

              "

            >

              Admin Dashboard

            </h1>

            <p

              className="

                text-gray-500

                mt-2

              "

            >

              Platform overview and analytics.

            </p>

          </div>

          <button

            onClick={
              loadDashboard
            }

            disabled={
              loading
            }

            className="

              bg-primary

              hover:bg-secondary

              text-white

              px-5

              py-3

              rounded-xl

              transition

              disabled:opacity-50

            "

          >

            Refresh

          </button>

        </div>

        {

          loading && (

            <div

              className="

                bg-white

                rounded-2xl

                shadow-md

                p-12

                text-center

              "

            >

              Loading dashboard...

            </div>

          )

        }

        {

          !loading &&

          error && (

            <div

              className="

                bg-red-50

                border

                border-red-200

                text-red-600

                rounded-2xl

                p-6

                mb-8

              "

            >

              {error}

            </div>

          )

        }

        {

          !loading &&

          !error && (

            <div

              className="

                grid

                grid-cols-1

                md:grid-cols-2

                xl:grid-cols-3

                gap-6

              "

            >

              <DashboardCard

                title="Students"

                value={
                  stats?.totalStudents
                }

              />

              <DashboardCard

                title="Organizations"

                value={
                  stats?.totalOrganizations
                }

              />

              <DashboardCard

                title="Events"

                value={
                  stats?.totalEvents
                }

              />

              <DashboardCard

                title="Pending Events"

                value={
                  stats?.pendingEvents
                }

              />

              <DashboardCard

                title="Approved Events"

                value={
                  stats?.approvedEvents
                }

              />

              <DashboardCard

                title="Rejected Events"

                value={
                  stats?.rejectedEvents
                }

              />

              <DashboardCard

                title="Opportunities"

                value={
                  stats?.totalOpportunities
                }

              />

              <DashboardCard

                title="Approved Opportunities"

                value={
                  stats?.approvedOpportunities
                }

              />

              <DashboardCard

                title="Applications"

                value={
                  stats?.totalApplications
                }

              />

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}

function DashboardCard({

  title,

  value,

}) {

  return (

    <div

      className="

        bg-white

        rounded-2xl

        shadow-md

        p-6

      "

    >

      <p

        className="

          text-gray-500

          mb-2

        "

      >

        {title}

      </p>

      <h2

        className="

          text-4xl

          font-bold

          text-primary

        "

      >

        {value || 0}

      </h2>

    </div>

  );

}

export default AdminDashboardPage;