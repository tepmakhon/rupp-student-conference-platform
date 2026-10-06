import ModerationActions from "./ModerationActions";



import {
  CalendarDaysIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

import { formatDate } from "../../utils/formatDate";

function PendingEventCard({
  event,

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

      <div
        className="

          flex

          justify-between

          items-start

          gap-4

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
            {event.title}
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
      </div>

      {/* Description */}

      <p
        className="

          mt-5

          text-gray-600

          leading-relaxed

        "
      >
        {event.description || "No description available"}
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
            {event.organization?.organizationName || "Unknown Organization"}
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
          <MapPinIcon
            className="

              w-5

              h-5

            "
          />

          <span>{event.location || "No location"}</span>
        </div>

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

          <span>{formatDate(event.eventDate)}</span>
        </div>

        {event.category && (
          <div
            className="

                flex

                items-center

                gap-3

                text-secondary

                font-medium

              "
          >
            <TagIcon
              className="

                  w-5

                  h-5

                "
            />

            <span>{event.category.categoryName}</span>
          </div>
        )}
      </div>

      <ModerationActions type="event" id={event.id} onAction={onAction} />
    </div>
  );
}

export default PendingEventCard;
