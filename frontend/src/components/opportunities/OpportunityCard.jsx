import { Link } from "react-router-dom";

import { Calendar, Building2, ArrowRight } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

function OpportunityCard({ opportunity }) {
  return (
    <div
      className="

        bg-white

        rounded-3xl

        overflow-hidden

        shadow-sm

        border

        hover:shadow-xl

        hover:-translate-y-1

        transition

        duration-300

      "
    >
      <div
        className="

          relative

          h-60

        "
      >
        <img
          src={opportunity.coverImageUrl || "https://placehold.co/800x500"}

          alt={opportunity.title}

          className="

            w-full

            h-full

            object-cover

          "
        />

        <div
          className="

            absolute

            top-5

            left-5

          "
        >
          <span
            className="

              px-4

              py-2

              rounded-full

              bg-gold

              text-black

              font-semibold

              text-sm

            "
          >
            {opportunity.type?.typeName}
          </span>
        </div>
      </div>

      <div
        className="

          p-7

          space-y-5

        "
      >
        <div>
          <h2
            className="

              text-2xl

              font-bold

              text-primary

              line-clamp-2

            "
          >
            {opportunity.title}
          </h2>

          <p
            className="

              text-gray-600

              mt-3

              line-clamp-3

            "
          >
            {opportunity.description}
          </p>
        </div>

        <div
          className="

            space-y-3

            text-gray-500

            text-sm

          "
        >
          <div
            className="

              flex

              items-center

              gap-2

            "
          >
            <Building2 size={18} />

            <span>
              {opportunity.organization?.organizationName || "Organization"}
            </span>
          </div>

          <div
            className="

              flex

              items-center

              gap-2

            "
          >
            <Calendar size={18} />

            <span>
              {opportunity.deadline
                ? formatDate(opportunity.deadline)
                : "No deadline"}
            </span>
          </div>
        </div>

        <Link
          to={`/opportunities/${opportunity.id}`}

          className="

            flex

            items-center

            justify-center

            gap-2

            w-full

            bg-primary

            hover:bg-secondary

            text-white

            py-4

            rounded-2xl

            font-semibold

            transition

          "
        >
          View Details
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default OpportunityCard;
