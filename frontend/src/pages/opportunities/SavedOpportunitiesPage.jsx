import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getSavedOpportunities,
} from "../../api/opportunityApi";

import toast from "react-hot-toast";

function SavedOpportunitiesPage() {

  const [
    opportunities,
    setOpportunities,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    loadSavedOpportunities();

  }, []);

  const loadSavedOpportunities =
    async () => {

      try {

        const data =
          await getSavedOpportunities();

        setOpportunities(data);

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to load saved opportunities"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <DashboardLayout>

      <div>

        <h1
          className="
            text-3xl
            font-bold
            text-primary
            mb-8
          "
        >
          Saved Opportunities
        </h1>

        {
          loading ? (

            <p>
              Loading...
            </p>

          ) : opportunities.length === 0 ? (

            <div
              className="
                bg-white
                rounded-2xl
                p-8
                shadow-md
              "
            >
              No saved opportunities yet.
            </div>

          ) : (

            <div
              className="
                grid
                gap-6
              "
            >

              {
                opportunities.map(
                  (item) => {

                    const opportunity =
                      item.opportunity;

                    return (

                      <div
                        key={item.id}
                        className="
                          bg-white
                          rounded-2xl
                          shadow-md
                          p-6
                        "
                      >

                        <h2
                          className="
                            text-xl
                            font-bold
                            text-primary
                          "
                        >
                          {opportunity.title}
                        </h2>

                        <p
                          className="
                            text-gray-600
                            mt-2
                          "
                        >
                          {opportunity.description}
                        </p>

                        <div
                          className="
                            mt-4
                          "
                        >

                          <Link
                            to={`/opportunities/${opportunity.id}`}
                            className="
                              bg-primary
                              text-white
                              px-4
                              py-2
                              rounded-lg
                            "
                          >
                            View Details
                          </Link>

                        </div>

                      </div>

                    );
                  }
                )
              }

            </div>

          )
        }

      </div>

    </DashboardLayout>
  );
}

export default SavedOpportunitiesPage;