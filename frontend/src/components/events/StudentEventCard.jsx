import { Link } from "react-router-dom";

import {
  CalendarDaysIcon,
  MapPinIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

import { formatDate } from "../../utils/formatDate";

function StudentEventCard({ event }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        border
        p-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          text-primary
        "
      >
        {event.title}
      </h2>

      <div
        className="
          mt-5
          space-y-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <MapPinIcon
            className="
              w-5
              h-5
            "
          />

          {event.location}
        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <CalendarDaysIcon
            className="
              w-5
              h-5
            "
          />

          {formatDate(event.eventDate)}
        </div>
      </div>

      <div
        className="
          flex
          gap-3
          mt-8
        "
      >
        <Link
          to={`/events/${event.id}`}
          className="
            flex-1
            text-center
            border
            rounded-xl
            py-3
          "
        >
          View Details
        </Link>

        <Link
          to={`/events/${event.id}/ticket`}
          className="
            flex
            items-center
            justify-center
            gap-2
            flex-1
            rounded-xl
            bg-primary
            text-white
            py-3
          "
        >
          <TicketIcon
            className="
              w-5
              h-5
            "
          />
          Ticket
        </Link>
      </div>
    </div>
  );
}

export default StudentEventCard;
