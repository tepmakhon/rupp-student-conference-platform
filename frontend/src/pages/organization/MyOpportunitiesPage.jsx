import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getMyOpportunities,
} from "../../api/opportunityApi";

function MyOpportunitiesPage() {

  const [
    opportunities,
    setOpportunities,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    loadMyOpportunities();

  }, []);

  const loadMyOpportunities =
    async () => {

      try {

        setLoading(true);

        const data =
          await getMyOpportunities();

        setOpportunities(

          Array.isArray(data)

          ? data

          : []

        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to load opportunities"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1
            className="
              text-4xl
              font-bold
              text-primary
            "
          >

            My Opportunities

          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            Manage your opportunities.

          </p>

        </div>

        {

          loading

          ? (

            <div
              className="
                text-center
                py-20
              "
            >

              Loading...

            </div>

          )

          : opportunities.length === 0

          ? (

            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-10
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  text-primary
                "
              >

                No Opportunities

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

                  (
                    opportunity
                  ) => (

                    <div

                      key={
                        opportunity.id
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
                          text-2xl
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
                          mt-3
                        "
                      >

                        {
                          opportunity.description
                        }

                      </p>

                      <div
                        className="
                          flex
                          gap-4
                          mt-6
                        "
                      >

                        <Link

                          to={`/organization/opportunities/${opportunity.id}/applicants`}

                          className="
                            bg-primary
                            hover:bg-secondary
                            text-white
                            px-5
                            py-2
                            rounded-xl
                            transition
                          "

                        >

                          View Applicants

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

export default MyOpportunitiesPage;