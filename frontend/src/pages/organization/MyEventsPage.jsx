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

import PageHeader

from "../../components/common/PageHeader";

import LoadingState

from "../../components/common/LoadingState";

import EmptyState

from "../../components/common/EmptyState";

import DeleteConfirmationModal

from "../../components/admin/DeleteConfirmationModal";

import MyEventsGrid

from "../../components/events/MyEventsGrid";

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

  const [

    selected,

    setSelected,

  ] = useState(null);

  const [

    deleteOpen,

    setDeleteOpen,

  ] = useState(false);

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

          await getMyEvents();

        setEvents(

          Array.isArray(

            data

          )

          ? data

          : []

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

  const openDelete =

    (

      event

    ) => {

      setSelected(

        event

      );

      setDeleteOpen(

        true

      );

    };

  const handleDelete =

    async () => {

      try {

        await deleteEvent(

          selected.id

        );

        toast.success(

          "Event deleted"

        );

        setDeleteOpen(

          false

        );

        loadEvents();

      }

      catch (

        error

      ) {

        console.error(

          error

        );

        toast.error(

          error?.response

          ?.data?.message ||

          "Delete failed"

        );

      }

    };

  return (

    <DashboardLayout>

      <div

        className="

          max-w-7xl

          mx-auto

          space-y-8

        "

      >

        <div

          className="

            flex

            flex-col

            md:flex-row

            md:items-center

            md:justify-between

            gap-6

          "

        >

          <PageHeader

            title="My Events"

            description="Manage all your events"

          />

          <Link

            to="/events/create"

            className="

              bg-primary

              hover:bg-secondary

              text-white

              px-6

              py-3

              rounded-xl

              font-medium

            "

          >

            Create Event

          </Link>

        </div>

        {

          loading &&

          <LoadingState />

        }

        {

          !loading &&

          events.length === 0 && (

            <EmptyState

              title="No Events Yet"

              description="Create your first event"

            />

          )

        }

        {

          !loading &&

          events.length > 0 && (

            <MyEventsGrid

              events={

                events

              }

              onDelete={

                openDelete

              }

            />

          )

        }

        <DeleteConfirmationModal

          open={

            deleteOpen

          }

          title={

            selected?.title

          }

          onClose={() =>

            setDeleteOpen(

              false

            )

          }

          onConfirm={

            handleDelete

          }

        />

      </div>

    </DashboardLayout>

  );

}

export default MyEventsPage;