import {
  CalendarDaysIcon,
  MapPinIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import { formatDate } from "../../utils/formatDate";

function EventInfoGrid({ event }) {
  return (
    <div
      className="

        grid

        md:grid-cols-3

        gap-6

      "
    >
      <InfoCard
        icon={CalendarDaysIcon}

        title="Date"

        value={formatDate(event.eventDate)}
      />

      <InfoCard
        icon={MapPinIcon}

        title="Location"

        value={event.location}
      />

      <InfoCard
        icon={UserGroupIcon}

        title="Capacity"

        value={event.capacity || "Unlimited"}
      />
    </div>
  );
}

function InfoCard({
  icon: Icon,

  title,

  value,
}) {
  return (
    <div
      className="

        bg-white

        border

        rounded-3xl

        p-6

        shadow-sm

      "
    >
      <Icon
        className="

          w-8

          h-8

          text-primary

          mb-4

        "
      />

      <p
        className="

          text-sm

          text-gray-500

        "
      >
        {title}
      </p>

      <h3
        className="

          text-lg

          font-bold

          mt-2

        "
      >
        {value}
      </h3>
    </div>
  );
}

export default EventInfoGrid;
