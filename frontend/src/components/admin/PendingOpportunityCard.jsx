import toast from "react-hot-toast";

import {
  approveOpportunity,
  rejectOpportunity,
} from "../../api/opportunityApi";

import {
  Briefcase,
  Building2,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";

function PendingOpportunityCard({
  opportunity,
  onAction,
}) {

  const handleApprove =
    async () => {

      try {

        await approveOpportunity(
          opportunity.id
        );

        toast.success(
          "Opportunity approved"
        );

        onAction();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data?.message ||
          "Failed to approve opportunity"
        );
      }
    };

  const handleReject =
    async () => {

      try {

        await rejectOpportunity(
          opportunity.id
        );

        toast.success(
          "Opportunity rejected"
        );

        onAction();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data?.message ||
          "Failed to reject opportunity"
        );
      }
    };

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        p-6
      "
    >

      {/* Header */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Briefcase
              size={22}
              className="
                text-primary
              "
            />

            <h2
              className="
                text-2xl
                font-bold
                text-primary
              "
            >
              {opportunity.title}
            </h2>

          </div>

          <p
            className="
              text-gray-600
              mt-3
            "
          >
            {opportunity.description}
          </p>

        </div>

      </div>

      {/* Information */}

      <div
        className="
          mt-6
          space-y-3
          text-gray-700
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Building2 size={18} />

          <span>

            {
              opportunity.organization
                ?.organizationName
            }

          </span>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Briefcase size={18} />

          <span>

            {
              opportunity.type
                ?.typeName
            }

          </span>

        </div>

        {

          opportunity.deadline && (

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <Calendar
                size={18}
              />

              <span>

                {new Date(
                  opportunity.deadline
                ).toLocaleDateString()}

              </span>

            </div>

          )

        }

      </div>

      {/* Actions */}

      <div
        className="
          flex
          gap-4
          mt-8
        "
      >

        <button

          onClick={
            handleApprove
          }

          className="
            flex
            items-center
            justify-center
            gap-2

            flex-1

            bg-green-600

            hover:bg-green-700

            text-white

            py-3

            rounded-xl

            font-semibold

            transition
          "
        >

          <CheckCircle
            size={18}
          />

          Approve

        </button>

        <button

          onClick={
            handleReject
          }

          className="
            flex
            items-center
            justify-center
            gap-2

            flex-1

            bg-red-600

            hover:bg-red-700

            text-white

            py-3

            rounded-xl

            font-semibold

            transition
          "
        >

          <XCircle
            size={18}
          />

          Reject

        </button>

      </div>

    </div>

  );
}

export default PendingOpportunityCard;