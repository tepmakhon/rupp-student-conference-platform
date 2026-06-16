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
  getStudentDashboard,
} from "../../api/dashboardApi";

import {

  setDashboardLoading,

  setDashboardStats,

  setDashboardError,

} from "../../redux/slices/dashboardSlice";

import RecentOpportunities
from "../../components/dashboard/RecentOpportunities";

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

      <div className="max-w-7xl mx-auto">

        <h1

          className="

            text-4xl

            font-bold

            text-primary

            mb-8

          "

        >

          Student Dashboard

        </h1>

        {

          loading && (

            <div>

              Loading dashboard...

            </div>

          )

        }

        {

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

            <>

              <div

                className="

                  grid

                  md:grid-cols-3

                  gap-6

                "

              >

                <div

                  className="

                    bg-white

                    p-6

                    rounded-2xl

                    shadow-md

                  "

                >

                  <p>

                    Activity Score

                  </p>

                  <h2

                    className="

                      text-4xl

                      font-bold

                    "

                  >

                    {

                      stats
                        ?.activityScore || 0

                    }

                  </h2>

                </div>

                <div

                  className="

                    bg-white

                    p-6

                    rounded-2xl

                    shadow-md

                  "

                >

                  <p>

                    Event Registrations

                  </p>

                  <h2

                    className="

                      text-4xl

                      font-bold

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

                    p-6

                    rounded-2xl

                    shadow-md

                  "

                >

                  <p>

                    Applications

                  </p>

                  <h2

                    className="

                      text-4xl

                      font-bold

                    "

                  >

                    {

                      stats
                        ?.totalApplications || 0

                    }

                  </h2>

                </div>

              </div>

              <div

                className="mt-8"

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