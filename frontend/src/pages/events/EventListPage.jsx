import {

  useEffect,

  useState,

  useMemo,

} from "react";

import DashboardLayout

from "../../components/layouts/DashboardLayout";

import PageHeader

from "../../components/common/PageHeader";

import LoadingState

from "../../components/common/LoadingState";

import ErrorState

from "../../components/common/ErrorState";

import EmptyState

from "../../components/common/EmptyState";

import EventGrid

from "../../components/events/EventGrid";

import EventSearch

from "../../components/events/EventSearch";

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

  const [

    search,

    setSearch,

  ] = useState("");

  useEffect(() => {

    loadEvents();

  }, []);

  const loadEvents =

    async () => {

      try {

        setLoading(

          true

        );

        const data =

          await getApprovedEvents();

        setEvents(

          data.events ||

          []

        );

      }

      catch (

        error

      ) {

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

    };

  const filteredEvents =

    useMemo(

      () => {

        return events.filter(

          (

            event

          ) =>

            event.title

            .toLowerCase()

            .includes(

              search

              .toLowerCase()

            )

        );

      },

      [

        events,

        search,

      ]

    );

  return (

    <DashboardLayout>

      <div

        className="

          max-w-7xl

          mx-auto

          space-y-8

        "

      >

        <PageHeader

          title="Events"

          description="Explore approved events"

        />

        <EventSearch

          value={

            search

          }

          onChange={

            setSearch

          }

        />

        {

          loading &&

          <LoadingState />

        }

        {

          !loading &&

          error && (

            <ErrorState

              message={

                error

              }

            />

          )

        }

        {

          !loading &&

          !error &&

          filteredEvents.length === 0 && (

            <EmptyState

              title="No Events"

              description="No events found"

            />

          )

        }

        {

          !loading &&

          !error &&

          filteredEvents.length > 0 && (

            <EventGrid

              events={

                filteredEvents

              }

            />

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default EventListPage;