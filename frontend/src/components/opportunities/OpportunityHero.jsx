import { Briefcase, Building2, Calendar } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

function OpportunityHero({ opportunity }) {
  return (
    <div
      className="
        relative
        h-[450px]
        rounded-3xl
        overflow-hidden
      "
    >
      <img
        src={opportunity.coverImageUrl || "https://placehold.co/1200x500"}

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
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/40
          to-transparent
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-10
          text-white
        "
      >
        <div
          className="
            flex
            flex-wrap
            gap-3
            mb-5
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
            "
          >
            {opportunity.type?.typeName}
          </span>

          <span
            className="
              px-4
              py-2
              rounded-full
              bg-white/20
              backdrop-blur-sm
            "
          >
            {opportunity.status}
          </span>
        </div>

        <h1
          className="
            text-5xl
            font-bold
          "
        >
          {opportunity.title}
        </h1>

        <div
          className="
            flex
            flex-wrap
            gap-8
            mt-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Building2 size={20} />

            <span>{opportunity.organization?.organizationName}</span>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Calendar size={20} />

            <span>
              {opportunity.deadline
                ? formatDate(opportunity.deadline)
                : "No deadline"}
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Briefcase size={20} />

            <span>{opportunity.type?.typeName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpportunityHero;
