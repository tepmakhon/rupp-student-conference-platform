import {
  Link,
} from "react-router-dom";

function MyEventActions({

  event,

  onDelete,

}) {

  const buttonStyle = `
    min-w-[110px]
    text-center
    px-4
    py-2
    rounded-lg
    text-sm
    font-medium
    transition-colors
    duration-200
  `;

  return (

    <div
      className="
        flex
        items-center
        flex-wrap
        gap-2
      "
    >

      <Link
        to={`/organization/events/${event.id}/registrations`}
        className={`
          ${buttonStyle}
          bg-primary
          hover:bg-secondary
          text-white
        `}
      >
        Registrations
      </Link>

      <Link
        to={`/events/${event.id}/attendance`}
        className={`
          ${buttonStyle}
          bg-blue-600
          hover:bg-blue-700
          text-white
        `}
      >
        Attendance
      </Link>

      <Link
        to={`/organization/events/${event.id}/edit`}
        className={`
          ${buttonStyle}
          bg-green-600
          hover:bg-green-700
          text-white
        `}
      >
        Edit
      </Link>

      <button
        onClick={onDelete}
        className={`
          ${buttonStyle}
          bg-red-600
          hover:bg-red-700
          text-white
        `}
      >
        Delete
      </button>

    </div>

  );

}

export default MyEventActions;