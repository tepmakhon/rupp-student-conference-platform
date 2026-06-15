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

        setLoading(true);

        const data =
          await getSavedOpportunities();

        setOpportunities(
          Array.isArray(data)
            ? data
            : []
        );

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

          loading

          ? (

            <div
              className="
                flex
                justify-center
                py-10
              "
            >

              <p
                className="
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
                p-8
                shadow-md
                text-center
              "
            >

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-700
                "
              >

                No saved opportunities yet

              </h2>

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
                  (item) => {

                    const opportunity =
                      item.opportunity;

                    if (
                      !opportunity
                    ) {
                      return null;
                    }

                    return (

                      <div

                        key={
                          `${item.studentId}-${item.opportunityId}`
                        }

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

                          {
                            opportunity.title
                          }

                        </h2>

                        <p
                          className="
                            text-gray-600
                            mt-2
                            line-clamp-3
                          "
                        >

                          {
                            opportunity.description
                          }

                        </p>

                        <div
                          className="
                            mt-4
                          "
                        >

                          <Link

                            to={
                              `/opportunities/${opportunity.id}`
                            }

                            className="
                              inline-block
                              bg-primary
                              hover:bg-secondary
                              text-white
                              px-4
                              py-2
                              rounded-lg
                              transition
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