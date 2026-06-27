import {
  Link,
} from "react-router-dom";

function MyEventActions({

  event,

  onDelete,

}) {

  return (

    <div

      className="

        flex

        flex-wrap

        gap-3

      "

    >

      <Link

        to={`/organization/events/${event.id}/registrations`}

        className="

          bg-primary

          text-white

          px-4

          py-3

          rounded-xl

        "

      >

        Registrations

      </Link>

      <Link

        to={`/events/${event.id}/attendance`}

        className="

          bg-blue-600

          hover:bg-blue-700

          text-white

          px-4

          py-3

          rounded-xl

        "

      >

        Attendance

      </Link>

      <Link

        to={`/organization/events/${event.id}/edit`}

        className="

          bg-secondary

          text-white

          px-4

          py-3

          rounded-xl

        "

      >

        Edit

      </Link>

      <button

        onClick={

          onDelete

        }

        className="

          bg-red-600

          hover:bg-red-700

          text-white

          px-4

          py-3

          rounded-xl

        "

      >

        Delete

      </button>

    </div>

  );

}

export default MyEventActions;