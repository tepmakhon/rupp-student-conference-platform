import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getOpportunities,
} from "../../api/opportunityApi";

import toast
from "react-hot-toast";

function OpportunityListPage() {

  const role =
    useSelector(
      (state) =>
        state.auth.role
    );

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

        setLoading(true);

        const data =

          await getOpportunities();

        setOpportunities(

          data.opportunities || []

        );

      } catch (error) {

        console.error(
          error
        );

        toast.error(

          "Failed to load opportunities"

        );

      } finally {

        setLoading(false);

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

        {/* Header */}

        <div

          className="

            flex

            flex-col

            md:flex-row

            md:items-center

            md:justify-between

            gap-4

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

              Opportunities

            </h1>

            <p

              className="

                text-gray-600

                mt-2

              "

            >

              Discover internships,

              scholarships,

              volunteer programs,

              part-time jobs,

              and full-time careers.

            </p>

          </div>

          {

            role ===

            "ORGANIZATION"

            &&

            (

              <Link

                to="/opportunities/create"

                className="

                  bg-primary

                  hover:bg-secondary

                  text-white

                  px-6

                  py-3

                  rounded-xl

                  transition

                  font-medium

                  w-fit

                "

              >

                Create Opportunity

              </Link>

            )

          }

        </div>

        {

          loading

          ? (

            <div

              className="

                flex

                justify-center

                items-center

                py-20

              "

            >

              <p

                className="

                  text-lg

                  text-gray-500

                "

              >

                Loading opportunities...

              </p>

            </div>

          )

          : opportunities.length === 0

          ? (

            <div

              className="

                bg-white

                rounded-2xl

                shadow-md

                p-12

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

                No Opportunities Found

              </h2>

              <p

                className="

                  text-gray-600

                  mt-3

                "

              >

                There are currently

                no opportunities

                available.

              </p>

            </div>

          )

          : (

            <div

              className="

                grid

                grid-cols-1

                md:grid-cols-2

                xl:grid-cols-3

                gap-8

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

                        shadow-lg

                        overflow-hidden

                        hover:shadow-xl

                        transition-all

                        duration-300

                      "

                    >

                      <img

                        src={

                          opportunity.coverImageUrl ||

                          "https://placehold.co/600x300?text=Opportunity"

                        }

                        alt={

                          opportunity.title

                        }

                        className="

                          w-full

                          h-56

                          object-cover

                        "

                      />

                      <div

                        className="p-6"

                      >

                        <span

                          className="

                            inline-block

                            bg-secondary/10

                            text-secondary

                            px-3

                            py-1

                            rounded-full

                            text-sm

                            font-medium

                          "

                        >

                          {

                            opportunity.type

                              ?.typeName ||

                            "Opportunity"

                          }

                        </span>

                        <h2

                          className="

                            text-xl

                            font-bold

                            text-primary

                            mt-3

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

                          <p

                            className="

                              text-sm

                              text-gray-500

                            "

                          >

                            Deadline:

                            {" "}

                            {

                              opportunity.deadline

                              ?

                              new Date(

                                opportunity.deadline

                              )

                              .toLocaleDateString()

                              :

                              "No Deadline"

                            }

                          </p>

                        </div>

                        <Link

                          to={

                            `/opportunities/${opportunity.id}`

                          }

                          className="

                            mt-5

                            inline-block

                            bg-primary

                            hover:bg-secondary

                            text-white

                            px-5

                            py-3

                            rounded-xl

                            transition

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