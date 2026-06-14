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

import RecentOpportunities from "../../components/dashboard/RecentOpportunities";

function DashboardPage() {

  const dispatch =
    useDispatch();

  const {
    stats,
    loading,
  } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        dispatch(
          setDashboardLoading(true)
        );

        const data =
          await getStudentDashboard();

        dispatch(
          setDashboardStats(data)
        );

      } catch (error) {

        console.error(error);

        dispatch(
          setDashboardError(
            "Failed to load dashboard"
          )
        );

      } finally {

        dispatch(
          setDashboardLoading(false)
        );
      }
    };

  if (loading) {

    return (

      <DashboardLayout>

        <div>
          Loading Dashboard...
        </div>

      </DashboardLayout>
    );
  }

return (

  <DashboardLayout>

    <div>

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
    
      {/* Statistics Cards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            p-6
            shadow-md
          "
        >

          <p
            className="
              text-gray-500
              mb-2
            "
          >
            Activity Score
          </p>

          <h2
            className="
              text-4xl
              font-bold
              text-gold
            "
          >
            {stats?.activityScore || 0}
          </h2>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            p-6
            shadow-md
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
              text-secondary
            "
          >
            {stats?.totalRegistrations || 0}
          </h2>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            p-6
            shadow-md
          "
        >

          <p
            className="
              text-gray-500
              mb-2
            "
          >
            Applications
          </p>

          <h2
            className="
              text-4xl
              font-bold
              text-primary
            "
          >
            {stats?.totalApplications || 0}
          </h2>

        </div>

      </div>

      {/* Recent Opportunities */}

      <div className="mt-8">

        <RecentOpportunities />

      </div>

    </div>

  </DashboardLayout>
);
}

export default DashboardPage;