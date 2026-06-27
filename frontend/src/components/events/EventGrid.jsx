import EventCard from "./EventCard";

function EventGrid({
  events,
}) {

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >

      {events.map(
        (event) => (

          <EventCard
            key={event.id}
            event={event}
          />

        )
      )}

    </div>

  );

}

export default EventGrid;