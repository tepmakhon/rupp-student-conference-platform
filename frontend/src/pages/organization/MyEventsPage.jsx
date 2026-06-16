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

        console.error(error);

        toast.error(
          "Failed to load events"
        );

      } finally {

        setLoading(false);

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

        <div
          className="
            flex
            justify-between
            items-center
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

              Manage your events.

            </p>

          </div>

          <Link

            to="/events/create"

            className="
              bg-primary
              hover:bg-secondary
              text-white
              px-5
              py-3
              rounded-xl
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
                          justify-between
                          items-center
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

                              event.status

                            }

                          </p>

                        </div>

                        <Link

                          to={
                            `/organization/events/${event.id}/registrations`
                          }

                          className="
                            bg-secondary
                            text-white
                            px-4
                            py-2
                            rounded-xl
                          "
                        >

                          View Registrations

                        </Link>

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