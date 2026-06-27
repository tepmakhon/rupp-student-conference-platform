import {

  useEffect,

  useState,

  useMemo,

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

import StudentEventsGrid

from "../../components/events/StudentEventsGrid";

import StudentEventsSearch

from "../../components/events/StudentEventsSearch";

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

      catch (

        error

      ) {

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

    };

  const filteredEvents =
    useMemo(() => {

      return events.filter(event =>

        event?.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

      );

    }, [
      events,
      search,
    ]);
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

          title="My Events"

          description="Events you registered for"

        />

        <StudentEventsSearch

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

          filteredEvents.length === 0 && (

            <EmptyState

              title="No Events Yet"

              description="You have not registered for any events"

            />

          )

        }

        {

          !loading &&

          filteredEvents.length > 0 && (

            <StudentEventsGrid

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

export default StudentMyEventsPage;