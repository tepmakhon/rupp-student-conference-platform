import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getApprovedEvents,
} from "../../api/eventApi";

function EventListPage() {

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

        const data =
          await getApprovedEvents();

        setEvents(
          data.events
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {

    return (
      <DashboardLayout>
        Loading Events...
      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <h1
        className="
          text-4xl
          font-bold
          text-primary
          mb-8
        "
      >
        Events
      </h1>

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {
          events.map(
            (event) => (

              <Link
                key={event.id}
                to={`/events/${event.id}`}
              >

                <div
                  className="
                    bg-white
                    rounded-2xl
                    shadow-md
                    overflow-hidden
                    hover:shadow-xl
                    transition
                  "
                >

                  <img
                    src={
                      event.bannerImageUrl ||
                      "https://placehold.co/600x400?text=Event"
                    }
                    alt={event.title}
                    className="
                      w-full
                      h-48
                      object-cover
                    "
                  />

                  <div className="p-5">

                    <h2
                      className="
                        text-xl
                        font-bold
                        text-primary
                      "
                    >
                      {event.title}
                    </h2>

                    <p
                      className="
                        text-gray-500
                        mt-2
                      "
                    >
                      {
                        event.organization
                          ?.organizationName
                      }
                    </p>

                  </div>

                </div>

              </Link>

            )
          )
        }

      </div>

    </DashboardLayout>
  );
}

export default EventListPage;