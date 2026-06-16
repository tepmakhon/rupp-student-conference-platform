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

            "Failed to load organization dashboard"

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

              Organization Dashboard

            </h1>

            <p

              className="

                text-gray-500

                mt-2

              "

            >

              Manage your events and opportunities.

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

                xl:grid-cols-4

                gap-6

              "

            >

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

                  Total Events

                </p>

                <h2

                  className="

                    text-4xl

                    font-bold

                    text-primary

                  "

                >

                  {

                    stats
                      ?.totalEvents || 0

                  }

                </h2>

              </div>

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

                  Opportunities

                </p>

                <h2

                  className="

                    text-4xl

                    font-bold

                    text-secondary

                  "

                >

                  {

                    stats
                      ?.totalOpportunities || 0

                  }

                </h2>

              </div>

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

                  Event Registrations

                </p>

                <h2

                  className="

                    text-4xl

                    font-bold

                    text-gold

                  "

                >

                  {

                    stats
                      ?.totalRegistrations || 0

                  }

                </h2>

              </div>

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

                  Applicants

                </p>

                <h2

                  className="

                    text-4xl

                    font-bold

                    text-primary

                  "

                >

                  {

                    stats
                      ?.totalApplicants || 0

                  }

                </h2>

              </div>

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default OrganizationDashboardPage;