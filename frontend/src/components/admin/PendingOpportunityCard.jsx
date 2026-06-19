import {

  useState,

} from "react";

import toast
from "react-hot-toast";

import {

  approveOpportunity,

  rejectOpportunity,

} from "../../api/opportunityApi";

import {

  BriefcaseIcon,

  BuildingOfficeIcon,

  CalendarDaysIcon,

  CheckCircleIcon,

  XCircleIcon,

} from "@heroicons/react/24/outline";

import {

  formatDate,

} from "../../utils/formatDate";

function PendingOpportunityCard({

  opportunity,

  onAction,

}) {

  const [

    processing,

    setProcessing,

  ] = useState(false);

  const handleApprove =

    async () => {

      try {

        setProcessing(

          true

        );

        await approveOpportunity(

          opportunity.id

        );

        toast.success(

          "Opportunity approved"

        );

        await onAction();

      }

      catch (error) {

        console.error(

          error

        );

        toast.error(

          error?.response

          ?.data?.message

          ||

          "Failed to approve opportunity"

        );

      }

      finally {

        setProcessing(

          false

        );

      }

    };

  const handleReject =

    async () => {

      try {

        setProcessing(

          true

        );

        await rejectOpportunity(

          opportunity.id

        );

        toast.success(

          "Opportunity rejected"

        );

        await onAction();

      }

      catch (error) {

        console.error(

          error

        );

        toast.error(

          error?.response

          ?.data?.message

          ||

          "Failed to reject opportunity"

        );

      }

      finally {

        setProcessing(

          false

        );

      }

    };

  return (

    <div

      className="

        bg-white

        border

        border-gray-200

        rounded-2xl

        shadow-sm

        hover:shadow-lg

        transition-all

        duration-300

        p-6

      "

    >

      {/* Header */}

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

        <span

          className="

            inline-flex

            items-center

            px-3

            py-1

            mt-3

            rounded-full

            text-xs

            font-semibold

            bg-yellow-100

            text-yellow-700

          "

        >

          Pending Approval

        </span>

      </div>

      {/* Description */}

      <p

        className="

          mt-5

          text-gray-600

          leading-relaxed

        "

      >

        {

          opportunity.description

          ||

          "No description available"

        }

      </p>

      {/* Information */}

      <div

        className="

          mt-6

          space-y-4

        "

      >

        <div

          className="

            flex

            items-center

            gap-3

            text-gray-700

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

              opportunity.organization

              ?.organizationName

              ||

              "Unknown Organization"

            }

          </span>

        </div>

        <div

          className="

            flex

            items-center

            gap-3

            text-gray-700

          "

        >

          <BriefcaseIcon

            className="

              w-5

              h-5

            "

          />

          <span>

            {

              opportunity.type

              ?.typeName

              ||

              "Unknown Type"

            }

          </span>

        </div>

        {

          opportunity.deadline

          && (

            <div

              className="

                flex

                items-center

                gap-3

                text-gray-700

              "

            >

              <CalendarDaysIcon

                className="

                  w-5

                  h-5

                "

              />

              <span>

                {

                  formatDate(

                    opportunity.deadline

                  )

                }

              </span>

            </div>

          )

        }

      </div>

      {/* Actions */}

      <div

        className="

          flex

          flex-col

          sm:flex-row

          gap-4

          mt-8

        "

      >

        <button

          onClick={

            handleApprove

          }

          disabled={

            processing

          }

          className="

            flex-1

            flex

            items-center

            justify-center

            gap-2

            bg-secondary

            hover:bg-green-700

            text-white

            py-3

            rounded-xl

            font-medium

            transition

            disabled:opacity-50

          "

        >

          <CheckCircleIcon

            className="

              w-5

              h-5

            "

          />

          {

            processing

            ?

            "Processing..."

            :

            "Approve"

          }

        </button>

        <button

          onClick={

            handleReject

          }

          disabled={

            processing

          }

          className="

            flex-1

            flex

            items-center

            justify-center

            gap-2

            bg-red-600

            hover:bg-red-700

            text-white

            py-3

            rounded-xl

            font-medium

            transition

            disabled:opacity-50

          "

        >

          <XCircleIcon

            className="

              w-5

              h-5

            "

          />

          {

            processing

            ?

            "Processing..."

            :

            "Reject"

          }

        </button>

      </div>

    </div>

  );

}

export default PendingOpportunityCard;