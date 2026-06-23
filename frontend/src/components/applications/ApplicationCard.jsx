import {

  CalendarDaysIcon,

  BuildingOfficeIcon,

} from "@heroicons/react/24/outline";

import {

  formatDate,

} from "../../utils/formatDate";

import ApplicationStatusBadge
from "./ApplicationStatusBadge";

function ApplicationCard({

  application,

}) {

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

        <ApplicationStatusBadge

          status={

            application.applicationStatus

          }

        />

      </div>

    </div>

  );

}

export default ApplicationCard;