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
  getOpportunities,
} from "../../api/opportunityApi";

function OpportunityListPage() {

  const [
    opportunities,
    setOpportunities,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    loadOpportunities();

  }, []);

  const loadOpportunities =
    async () => {

      try {

        const data =
          await getOpportunities();

        setOpportunities(
          data.opportunities
        );

      } catch (error) {
          console.log(error.response?.data);
          console.log(error.response?.status);
        }finally {
        setLoading(false);
      }
    };

  return (

    <DashboardLayout>

      <div className="p-6">

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Opportunities
        </h1>

        {
          loading
            ? (
              <p>
                Loading...
              </p>
            )
            : (
              <div
                className="
                  grid
                  gap-4
                "
              >

                {
                  opportunities.map(
                    (
                      opportunity
                    ) => (

                      <div
                        key={
                          opportunity.id
                        }
                        className="
                          bg-white
                          p-5
                          rounded-xl
                          shadow
                        "
                      >
                        <img
                          src={
                            opportunity.coverImageUrl ||
                            "https://placehold.co/600x300?text=No+Image"
                          }
                          alt={opportunity.title}
                          className="
                            w-full
                            h-48
                            object-cover
                            rounded-lg
                            mb-4
                          "
                        />                        
                        <h2
                          className="
                            text-xl
                            font-bold
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
                            to={`/opportunities/${opportunity.id}`}
                            className="
                              bg-blue-600
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

                    )
                  )
                }

              </div>
            )
        }

      </div>

    </DashboardLayout>
  );
}

export default OpportunityListPage;