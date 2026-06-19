import {

  useEffect,

  useState,

  useCallback,

} from "react";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import PageHeader
from "../../components/common/PageHeader";

import LoadingState
from "../../components/common/LoadingState";

import EmptyState
from "../../components/common/EmptyState";

import EventCard
from "../../components/events/EventCard";

import {

  getMyRegisteredEvents,

} from "../../api/eventApi";

function StudentMyEventsPage() {

  const [

    events,

    setEvents,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const loadEvents =

    useCallback(

      async () => {

        try {

          setLoading(

            true

          );

          const data =

            await getMyRegisteredEvents();

          const normalized =

            Array.isArray(

              data

            )

            ?

            data

            .map(

              (

                registration

              ) =>

              registration.event

            )

            .filter(

              Boolean

            )

            :

            [];

          setEvents(

            normalized

          );

        }

        catch (error) {

          console.error(

            error

          );

          toast.error(

            "Failed to load events"

          );

        }

        finally {

          setLoading(

            false

          );

        }

      },

      []

    );

  useEffect(() => {

    loadEvents();

  },

  [

    loadEvents,

  ]);

  return (

    <DashboardLayout>

      <div

        className="

          max-w-7xl

          mx-auto

        "

      >

        <PageHeader

          title="My Events"

          description="Events you registered for."

        />

        {

          loading

          &&

          <LoadingState />

        }

        {

          !loading

          &&

          events.length === 0

          &&

          (

            <EmptyState

              title="No Events Yet"

              description="You have not registered for any events."

            />

          )

        }

        {

          !loading

          &&

          events.length > 0

          &&

          (

            <div

              className="

                grid

                grid-cols-1

                md:grid-cols-2

                xl:grid-cols-3

                gap-6

              "

            >

              {

                events.map(

                  (

                    event

                  ) => (

                    <EventCard

                      key={

                        event.id

                      }

                      event={

                        event

                      }

                    />

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