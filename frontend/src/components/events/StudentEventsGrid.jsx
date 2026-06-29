import StudentEventCard from "./StudentEventCard";

function StudentEventsGrid({ events }) {
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
      {events.map((event) => (
        <StudentEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default StudentEventsGrid;
