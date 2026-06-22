import {

  Link,

} from "react-router-dom";

import {

  PencilSquareIcon,

  TrashIcon,

  UserGroupIcon,

} from "@heroicons/react/24/outline";

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

          flex

          items-center

          gap-2

          bg-primary

          text-white

          px-4

          py-3

          rounded-xl

        "

      >

        <UserGroupIcon

          className="

            w-5

            h-5

          "

        />

        Registrations

      </Link>

      <Link

        to={`/organization/events/${event.id}/edit`}

        className="

          flex

          items-center

          gap-2

          bg-secondary

          text-white

          px-4

          py-3

          rounded-xl

        "

      >

        <PencilSquareIcon

          className="

            w-5

            h-5

          "

        />

        Edit

      </Link>

      <button

        onClick={

          onDelete

        }

        className="

          flex

          items-center

          gap-2

          bg-red-600

          text-white

          px-4

          py-3

          rounded-xl

        "

      >

        <TrashIcon

          className="

            w-5

            h-5

          "

        />

        Delete

      </button>

    </div>

  );

}

export default MyEventActions;