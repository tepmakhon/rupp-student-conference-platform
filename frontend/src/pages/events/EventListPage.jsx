import { useEffect, useRef, useState } from "react";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import EventGrid from "../../components/events/EventGrid";
import StudentEventsSearch from "../../components/events/StudentEventsSearch";
import EventFilterBar from "../../components/events/EventFilterBar";
import { getEventCategories } from "../../api/eventCategoryApi";
import { getApprovedEvents } from "../../api/eventApi";
import Pagination from "../../components/common/Pagination";
function EventListPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);

  const debounceRef = useRef(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });
  const loadCategories = async () => {
    try {
      const data = await getEventCategories();
      setCategories(data || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadEvents();
  }, [page, debouncedKeyword, categoryId]);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [keyword]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getApprovedEvents({
        page,
        limit: 10,
        keyword: debouncedKeyword,
        categoryId,
      });

      setEvents(data.events || []);

      setPagination(
        data.pagination || {
          page: 1,
          totalPages: 1,
          total: 0,
        }
      );
    } catch (error) {
      console.error(error);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <PageHeader
          title="Events"
          description="Explore approved events"
        />

        <div className="flex flex-col md:flex-row gap-4">
          <StudentEventsSearch
            value={keyword}
            onChange={(value) => {
              setKeyword(value);
              setPage(1);
            }}
          />

          <EventFilterBar
            categories={categories}
            value={categoryId}
            onChange={(value) => {
              setCategoryId(value);
              setPage(1);
            }}
          />
        </div>

        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState message={error} />
        )}

        {!loading && !error && events.length === 0 && (
          <EmptyState
            title="No Events"
            description="No events found"
          />
        )}

        {!loading &&
          !error &&
          events.length > 0 && (
            <>
              <EventGrid events={events} />

              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
              />
            </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default EventListPage;