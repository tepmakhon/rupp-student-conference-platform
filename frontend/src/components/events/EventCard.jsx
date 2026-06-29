import { Link } from "react-router-dom";

import {
  CalendarDaysIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

import { formatDate } from "../../utils/formatDate";

function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event.id}`}

      className="group"
    >
      <div
        className="

          bg-white

          rounded-3xl

          overflow-hidden

          shadow-sm

          border

          hover:shadow-xl

          transition-all

          duration-300

          hover:-translate-y-1

        "
      >
        {/* Banner */}

        <div
          className="

            relative

            overflow-hidden

          "
        >
          <img
            src={
              event.bannerImageUrl || "https://placehold.co/800x500?text=Event"
            }

            alt={event.title}

            className="

              w-full

              h-56

              object-cover

              group-hover:scale-105

              transition

              duration-500

            "
          />

          {/* Category */}

          <div
            className="

              absolute

              top-4

              left-4

            "
          >
            <span
              className="

                bg-white/95

                backdrop-blur

                px-4

                py-2

                rounded-full

                text-xs

                font-semibold

                text-primary

              "
            >
              {event.category?.categoryName || "Event"}
            </span>
          </div>

          {/* Status */}

          <div
            className="

              absolute

              top-4

              right-4

            "
          >
            <span
              className={`

                px-4

                py-2

                rounded-full

                text-xs

                font-semibold

                ${
                  event.status === "APPROVED"
                    ? "bg-green-100 text-green-700"
                    : event.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }

              `}
            >
              {event.status || "APPROVED"}
            </span>
          </div>
        </div>

        {/* Body */}

        <div
          className="

            p-6

            space-y-5

          "
        >
          {/* Title */}

          <h2
            className="

              text-2xl

              font-bold

              text-primary

              line-clamp-2

            "
          >
            {event.title}
          </h2>

          {/* Organization */}

          <div
            className="

              flex

              items-center

              gap-3

              text-gray-600

            "
          >
            <BuildingOffice2Icon
              className="

                w-5

                h-5

              "
            />

            <span>
              {event.organization?.organizationName || "Organization"}
            </span>
          </div>

          {/* Date */}

          <div
            className="

              flex

              items-center

              gap-3

              text-gray-600

            "
          >
            <CalendarDaysIcon
              className="

                w-5

                h-5

              "
            />

            <span>{formatDate(event.eventDate)}</span>
          </div>

          {/* Footer */}

          <div
            className="

              border-t

              pt-5

              flex

              justify-between

              items-center

            "
          >
            {/* Capacity */}

            <div
              className="

                flex

                items-center

                gap-2

                text-gray-500

                text-sm

              "
            >
              <UserGroupIcon
                className="

                  w-5

                  h-5

                "
              />

              <span>{event.capacity || "Unlimited"}</span>
            </div>

            {/* Category */}

            <div
              className="

                flex

                items-center

                gap-2

                text-secondary

                text-sm

                font-medium

              "
            >
              <TagIcon
                className="

                  w-5

                  h-5

                "
              />

              {event.category?.categoryName}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
