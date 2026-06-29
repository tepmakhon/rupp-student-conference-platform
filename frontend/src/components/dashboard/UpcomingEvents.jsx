function UpcomingEvents({ events = [] }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-6
      "
    >
      <h3
        className="
          text-2xl
          font-bold
          text-primary
          mb-6
        "
      >
        Upcoming Events
      </h3>

      <div
        className="
          space-y-4
        "
      >
        {events.length === 0 && (
          <p
            className="
                text-gray-500
              "
          >
            No upcoming events
          </p>
        )}

        {events.map((event) => (
          <div
            key={event.id}

            className="
                  border-b
                  pb-4
                "
          >
            <h4
              className="
                    font-semibold
                  "
            >
              {event.title}
            </h4>

            <p
              className="
                    text-sm
                    text-gray-500
                  "
            >
              {event.location}
            </p>

            <p
              className="
                    text-sm
                    text-secondary
                  "
            >
              {new Date(event.eventDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEvents;
