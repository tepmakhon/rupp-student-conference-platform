import MyEventCard from "./MyEventCard";

function MyEventsGrid({
  events,

  onDelete,
}) {
  return (
    <div
      className="

        grid

        gap-6

      "
    >
      {events.map((event) => (
        <MyEventCard
          key={event.id}

          event={event}

          onDelete={() => onDelete(event)}
        />
      ))}
    </div>
  );
}

export default MyEventsGrid;
