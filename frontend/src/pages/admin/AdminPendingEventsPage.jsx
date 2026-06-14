import {
  useEffect,
  useState,
  useCallback,
} from "react";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getPendingEvents,
} from "../../api/eventApi";

import PendingEventCard
from "../../components/admin/PendingEventCard";

function AdminPendingEventsPage() {

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
    useCallback(async () => {

      try {

        setLoading(true);
        setError("");

        const data =
          await getPendingEvents();

        setEvents(
          Array.isArray(data)
            ? data
            : []
        );

      } catch (error) {

        console.error(error);

        setError(
          "Failed to load pending events"
        );

      } finally {

        setLoading(false);
      }

    }, []);

  useEffect(() => {

    loadEvents();

  }, [loadEvents]);

  return (

    <DashboardLayout>

      <div
        className="
          flex
          items-center
          justify-between
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
            Pending Events
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Review and manage
            event approval requests.
          </p>

        </div>

      </div>

      {loading && (

        <div
          className="
            bg-white
            rounded-2xl
            shadow-md
            p-8
            text-center
          "
        >
          Loading pending events...
        </div>

      )}

      {!loading && error && (

        <div
          className="
            bg-red-50
            border
            border-red-200
            text-red-600
            rounded-2xl
            p-6
          "
        >
          {error}
        </div>

      )}

      {!loading &&
        !error &&
        events.length === 0 && (

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
              text-xl
              font-semibold
              text-primary
            "
          >
            No Pending Events
          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            All event requests
            have been reviewed.
          </p>

        </div>

      )}

      {!loading &&
        !error &&
        events.length > 0 && (

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "
        >

          {events.map(
            (event) => (

              <PendingEventCard
                key={event.id}
                event={event}
                onAction={
                  loadEvents
                }
              />

            )
          )}

        </div>

      )}

    </DashboardLayout>
  );
}

export default AdminPendingEventsPage;