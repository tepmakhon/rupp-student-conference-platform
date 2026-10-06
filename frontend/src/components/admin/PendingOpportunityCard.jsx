import ModerationActions from "./ModerationActions";



import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import { formatDate } from "../../utils/formatDate";

function PendingOpportunityCard({
  opportunity,

  onAction,
}) {
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
          {opportunity.title}
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
        {opportunity.description || "No description available"}
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
            {opportunity.organization?.organizationName ||
              "Unknown Organization"}
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

          <span>{opportunity.type?.typeName || "Unknown Type"}</span>
        </div>

        {opportunity.deadline && (
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

            <span>{formatDate(opportunity.deadline)}</span>
          </div>
        )}
      </div>

      <ModerationActions type="opportunity" id={opportunity.id} onAction={onAction} />
    </div>
  );
}

export default PendingOpportunityCard;
