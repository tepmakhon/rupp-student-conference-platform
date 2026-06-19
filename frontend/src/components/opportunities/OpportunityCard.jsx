import {

  Link,

} from "react-router-dom";

import {

  Briefcase,

  Calendar,

  Building2,

} from "lucide-react";

function OpportunityCard({

  opportunity,

  children,

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

      <div

        className="

          flex

          flex-col

          gap-5

        "

      >

        <div>

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

              text-gray-500

              mt-1

            "

          >

            {

              opportunity.organization

              ?.organizationName

            }

          </p>

        </div>

        <p

          className="

            text-gray-600

          "

        >

          {

            opportunity.description

          }

        </p>

        <div

          className="

            space-y-3

            text-gray-600

          "

        >

          {

            opportunity.type && (

              <div

                className="

                  flex

                  items-center

                  gap-2

                "

              >

                <Briefcase

                  size={18}

                />

                <span>

                  {

                    opportunity.type

                    .typeName

                  }

                </span>

              </div>

            )

          }

          {

            opportunity.organization && (

              <div

                className="

                  flex

                  items-center

                  gap-2

                "

              >

                <Building2

                  size={18}

                />

                <span>

                  {

                    opportunity.organization

                    .organizationName

                  }

                </span>

              </div>

            )

          }

          {

            opportunity.deadline && (

              <div

                className="

                  flex

                  items-center

                  gap-2

                "

              >

                <Calendar

                  size={18}

                />

                <span>

                  {

                    new Date(

                      opportunity.deadline

                    )

                    .toLocaleDateString()

                  }

                </span>

              </div>

            )

          }

        </div>

        <div

          className="

            flex

            flex-wrap

            gap-3

          "

        >

          <Link

            to={`/opportunities/${opportunity.id}`}

            className="

              bg-primary

              hover:bg-secondary

              text-white

              px-4

              py-2

              rounded-xl

              transition

            "

          >

            View Details

          </Link>

          {children}

        </div>

      </div>

    </div>

  );

}

export default OpportunityCard;