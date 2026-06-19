import {

  CalendarDaysIcon,

  BuildingOfficeIcon,

} from "@heroicons/react/24/outline";

import {

  formatDate,

} from "../../utils/formatDate";

function ApplicationCard({

  application,

}) {

  const statusColor = {

    PENDING:

      "bg-gray-100 text-gray-700",

    REVIEWING:

      "bg-yellow-100 text-yellow-700",

    ACCEPTED:

      "bg-green-100 text-green-700",

    REJECTED:

      "bg-red-100 text-red-700",

  };

  return (

    <div

      className="

        bg-white

        rounded-2xl

        border

        shadow-sm

        hover:shadow-md

        transition

        p-6

      "

    >

      <div

        className="

          flex

          justify-between

          items-start

          gap-6

        "

      >

        <div

          className="

            flex-1

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

              application.opportunity

              ?.title

            }

          </h2>

          <div

            className="

              flex

              items-center

              gap-2

              text-gray-500

              mt-3

            "

          >

            <BuildingOfficeIcon

              className="

                w-5

                h-5

              "

            />

            <span>

              {

                application.opportunity

                ?.organization

                ?.organizationName

              }

            </span>

          </div>

          <div

            className="

              flex

              items-center

              gap-2

              text-gray-500

              mt-3

            "

          >

            <CalendarDaysIcon

              className="

                w-5

                h-5

              "

            />

            <span>

              Applied:

              {" "}

              {

                formatDate(

                  application.appliedAt

                )

              }

            </span>

          </div>

        </div>

        <span

          className={`

            px-4

            py-2

            rounded-full

            text-sm

            font-semibold

            ${

              statusColor[

                application.applicationStatus

              ]

            }

          `}

        >

          {

            application.applicationStatus

          }

        </span>

      </div>

    </div>

  );

}

export default ApplicationCard;