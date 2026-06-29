import { useEffect, useState, useCallback } from "react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import ErrorState from "../../components/common/ErrorState";

import EmptyState from "../../components/common/EmptyState";

import PendingEventCard from "../../components/admin/PendingEventCard";

import { getPendingEvents } from "../../api/eventApi";

function AdminPendingEventsPage() {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getPendingEvents();

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);

      setError("Failed to load pending events");
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

          max-w-7xl

          mx-auto

          space-y-8

        "
      >
        <PageHeader
          title="Pending Events"

          description="Review and manage event approval requests."
        />

        {loading && <LoadingState message="Loading pending events..." />}

        {!loading && error && <ErrorState message={error} />}

        {!loading && !error && events.length === 0 && (
          <EmptyState
            title="No Pending Events"

            description="All event requests have been reviewed."
          />
        )}

        {!loading && !error && events.length > 0 && (
          <div
            className="

                grid

                grid-cols-1

                lg:grid-cols-2

                gap-6

              "
          >
            {events.map((event) => (
              <PendingEventCard
                key={event.id}

                event={event}

                onAction={loadEvents}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AdminPendingEventsPage;
