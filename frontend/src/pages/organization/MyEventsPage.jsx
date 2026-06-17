import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getMyEvents,
  deleteEvent,
} from "../../api/eventApi";

function MyEventsPage() {

  const [

    events,

    setEvents,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  useEffect(() => {

    loadEvents();

  }, []);

  const loadEvents =
    async () => {

      try {

        setLoading(true);

        const data =

          await getMyEvents();

        setEvents(

          Array.isArray(data)

          ? data

          : []

        );

      } catch (error) {

        console.error(
          error
        );

        toast.error(

          "Failed to load events"

        );

      } finally {

        setLoading(false);

      }

    };

  const handleDelete =
    async (id) => {

      try {

        const confirmed =

          window.confirm(

            "Delete this event?"

          );

        if (

          !confirmed

        ) {

          return;

        }

        await deleteEvent(
          id
        );

        toast.success(
          "Event deleted"
        );

        loadEvents();

      } catch (error) {

        console.error(
          error
        );

        toast.error(

          error?.response?.data?.message ||

          "Failed to delete event"

        );

      }

    };

  return (

    <DashboardLayout>

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        {/* Header */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:justify-between
            md:items-center
            gap-6
            mb-8
          "
        >

          <div>

            <h1
              className="
                text-4xl
                font-bold
                text-primary
              "
            >

              My Events

            </h1>

            <p
              className="
                text-gray-500
                mt-2
              "
            >

              Manage all your events.

            </p>

          </div>

          <Link

            to="/events/create"

            className="
              bg-primary
              hover:bg-secondary
              text-white
              px-6
              py-3
              rounded-xl
              transition
            "
          >

            Create Event

          </Link>

        </div>

        {

          loading

          ? (

            <div
              className="
                text-center
                py-20
              "
            >

              Loading...

            </div>

          )

          : events.length === 0

          ? (

            <div
              className="
                bg-white
                rounded-2xl
                shadow-md
                p-10
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  text-primary
                "
              >

                No Events Yet

              </h2>

              <p
                className="
                  text-gray-500
                  mt-3
                "
              >

                Create your first event.

              </p>

            </div>

          )

          : (

            <div
              className="
                grid
                gap-6
              "
            >

              {

                events.map(

                  (
                    event
                  ) => (

                    <div

                      key={
                        event.id
                      }

                      className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        p-6
                      "
                    >

                      <div
                        className="
                          flex
                          flex-col
                          md:flex-row
                          md:justify-between
                          md:items-center
                          gap-6
                        "
                      >

                        <div>

                          <h2
                            className="
                              text-2xl
                              font-bold
                              text-primary
                            "
                          >

                            {

                              event.title

                            }

                          </h2>

                          <p
                            className="
                              text-gray-500
                              mt-2
                            "
                          >

                            {

                              event.location

                            }

                          </p>

                          <p
                            className="
                              text-sm
                              text-gray-500
                              mt-2
                            "
                          >

                            {

                              event.eventDate

                              ?

                              new Date(

                                event.eventDate

                              ).toLocaleDateString()

                              :

                              ""

                            }

                          </p>

                          <span
                            className="
                              inline-block
                              mt-3
                              px-3
                              py-1
                              rounded-full
                              bg-gray-100
                              text-gray-700
                              text-sm
                            "
                          >

                            {

                              event.status

                            }

                          </span>

                        </div>

                        <div
                          className="
                            flex
                            flex-wrap
                            gap-3
                          "
                        >

                          <Link

                            to={

                              `/organization/events/${event.id}/registrations`

                            }

                            className="
                              bg-primary
                              hover:bg-secondary
                              text-white
                              px-4
                              py-2
                              rounded-xl
                              transition
                            "

                          >

                            Registrations

                          </Link>

                          <Link

                            to={

                              `/organization/events/${event.id}/edit`

                            }

                            className="
                              bg-secondary
                              hover:bg-secondary/90
                              text-white
                              px-4
                              py-2
                              rounded-xl
                              transition
                            "

                          >

                            Edit

                          </Link>

                          <button

                            onClick={() =>

                              handleDelete(

                                event.id

                              )

                            }

                            className="
                              bg-red-600
                              hover:bg-red-700
                              text-white
                              px-4
                              py-2
                              rounded-xl
                              transition
                            "

                          >

                            Delete

                          </button>

                        </div>

                      </div>

                    </div>

                  )

                )

              }

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default MyEventsPage;