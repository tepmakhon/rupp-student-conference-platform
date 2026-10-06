import ErrorState from "../../components/common/ErrorState";
import useApiQuery from "../../hooks/useApiQuery";
import { useState } from "react";



import DashboardLayout from "../../components/layouts/DashboardLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingState from "../../components/common/LoadingState";

import EmptyState from "../../components/common/EmptyState";

import StudentEventsGrid from "../../components/events/StudentEventsGrid";

import StudentEventsSearch from "../../components/events/StudentEventsSearch";

import { getMyRegisteredEvents } from "../../api/eventApi";

function StudentMyEventsPage() {
  const [search, setSearch] = useState("");
  const { data, loading, error, retry: loadEvents } = useApiQuery(getMyRegisteredEvents);
  const events = Array.isArray(data) ? data.map((registration) => registration.event).filter(Boolean) : [];

  const filteredEvents = events.filter((event) =>
    event?.title?.toLowerCase().includes(search.toLowerCase()),
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
          title="My Events"

          description="Events you registered for"
        />

        <StudentEventsSearch
          value={search}

          onChange={setSearch}
        />

        {error && <ErrorState message={error} onRetry={loadEvents} />}

        {loading && <LoadingState />}

        {!loading && !error && filteredEvents.length === 0 && (
          <EmptyState
            title="No Events Yet"

            description="You have not registered for any events"
          />
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <StudentEventsGrid events={filteredEvents} />
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudentMyEventsPage;
