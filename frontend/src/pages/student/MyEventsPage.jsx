import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getMyRegisteredEvents,
} from "../../api/eventApi";

import toast
from "react-hot-toast";

function StudentMyEventsPage() {

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
          await getMyRegisteredEvents();

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

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

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
              text-gray-600
              mt-2
            "
          >

            Events you registered for.

          </p>

        </div>

        {
          loading ? (

            <div
              className="
                flex
                justify-center
                py-20
              "
            >

              Loading...

            </div>

          ) : events.length === 0 ? (

            <div
              className="
                bg-white
                p-10
                rounded-2xl
                shadow-md
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
                  mt-2
                "
              >

                You have not registered for any events.

              </p>

            </div>

          ) : (

            <div
              className="
                grid
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >

              {
                events.map(
                  (
                    registration
                  ) => (

                    <div
                      key={
                        registration.id
                      }
                      className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        overflow-hidden
                      "
                    >

                      <img

                        src={
                          registration.event
                            ?.bannerImageUrl ||

                          "https://placehold.co/600x300?text=Event"

                        }

                        alt={
                          registration.event
                            ?.title
                        }

                        className="
                          w-full
                          h-52
                          object-cover
                        "
                      />

                      <div className="p-6">

                        <h2
                          className="
                            text-2xl
                            font-bold
                            text-primary
                          "
                        >

                          {
                            registration.event
                              ?.title
                          }

                        </h2>

                        <p
                          className="
                            text-gray-600
                            mt-3
                            line-clamp-3
                          "
                        >

                          {
                            registration.event
                              ?.description
                          }

                        </p>

                        <p
                          className="
                            text-sm
                            text-gray-500
                            mt-4
                          "
                        >

                          Event Date:

                          {" "}

                          {

                            new Date(

                              registration.event.eventDate

                            ).toLocaleDateString()

                          }

                        </p>

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

export default StudentMyEventsPage;