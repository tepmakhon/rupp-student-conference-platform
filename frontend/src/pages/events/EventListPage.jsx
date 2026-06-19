import {

  useEffect,

  useState,

  useCallback,

} from "react";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import EventCard
from "../../components/events/EventCard";

import LoadingState
from "../../components/common/LoadingState";

import ErrorState
from "../../components/common/ErrorState";

import EmptyState
from "../../components/common/EmptyState";

import PageHeader
from "../../components/common/PageHeader";

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

  const [

    error,

    setError,

  ] = useState("");

  const loadEvents =

    useCallback(

      async () => {

        try {

          setLoading(

            true

          );

          setError(

            ""

          );

          const data =

            await getApprovedEvents();

          setEvents(

            data?.events

            ||

            data

            ||

            []

          );

        }

        catch (error) {

          console.error(

            error

          );

          setError(

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

          title="Events"

          description="Explore approved events."

        />

        {

          loading

          &&

          <LoadingState />

        }

        {

          !loading

          &&

          error

          &&

          (

            <ErrorState

              message={

                error

              }

            />

          )

        }

        {

          !loading

          &&

          !error

          &&

          events.length === 0

          &&

          (

            <EmptyState

              title="No Events"

              description="No events available."

            />

          )

        }

        {

          !loading

          &&

          !error

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

export default EventListPage;