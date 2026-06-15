import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import PendingOpportunityCard
from "../../components/admin/PendingOpportunityCard";

import {
  getPendingOpportunities,
} from "../../api/opportunityApi";

import {
  CircleAlert,
} from "lucide-react";

function AdminPendingOpportunitiesPage() {

  const [
    opportunities,
    setOpportunities,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const loadOpportunities =
    async () => {

      try {

        setLoading(true);

        const data =
          await getPendingOpportunities();

        setOpportunities(
          data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    loadOpportunities();

  }, []);

  return (

    <DashboardLayout>

      <div
        className="
          flex
          items-center
          gap-3
          mb-8
        "
      >

        <CircleAlert
          size={34}
          className="
            text-primary
          "
        />

        <h1
          className="
            text-4xl
            font-bold
            text-primary
          "
        >

          Pending Opportunities

        </h1>

      </div>

      {

        loading

        ? (

          <div
            className="
              flex
              justify-center
              py-20
            "
          >

            <p
              className="
                text-lg
                text-gray-500
              "
            >

              Loading...

            </p>

          </div>

        )

        : opportunities.length === 0

        ? (

          <div
            className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              p-10
              text-center
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                text-gray-700
              "
            >

              No Pending Opportunities

            </h2>

            <p
              className="
                text-gray-500
                mt-2
              "
            >

              Everything has been reviewed.

            </p>

          </div>

        )

        : (

          <div
            className="
              grid
              gap-6
            "
          >

            {

              opportunities.map(
                (
                  opportunity
                ) => (

                  <PendingOpportunityCard

                    key={
                      opportunity.id
                    }

                    opportunity={
                      opportunity
                    }

                    onAction={
                      loadOpportunities
                    }

                  />

                )
              )

            }

          </div>

        )

      }

    </DashboardLayout>

  );
}

export default AdminPendingOpportunitiesPage;