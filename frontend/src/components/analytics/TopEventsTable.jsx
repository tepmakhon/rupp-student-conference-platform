function TopEventsTable({ events }) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-8
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          text-primary
          mb-6
        "
      >
        Top Events
      </h2>

      <table className="w-full">
        <thead>
          <tr
            className="
              text-left
              border-b
            "
          >
            <th className="pb-3">Event</th>

            <th className="pb-3 text-right">Participants</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              className="
                border-b
                last:border-none
              "
            >
              <td className="py-4">{event.title}</td>

              <td
                className="
                  py-4
                  text-right
                  font-semibold
                  text-primary
                "
              >
                {event._count.registrations}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopEventsTable;
