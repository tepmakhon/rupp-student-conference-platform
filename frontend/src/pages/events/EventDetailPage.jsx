import useApiQuery from "../../hooks/useApiQuery";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import LoadingState from "../../components/common/LoadingState";

import ErrorState from "../../components/common/ErrorState";

import EventDetailHero from "../../components/events/EventDetailHero";

import EventInfoGrid from "../../components/events/EventInfoGrid";

import EventDescription from "../../components/events/EventDescription";

import EventRegisterButton from "../../components/events/EventRegisterButton";

import { getEventById, registerForEvent } from "../../api/eventApi";

function EventDetailPage() {
  const { id } = useParams();

  const role = useSelector((state) => state.auth.role);
  const [registering, setRegistering] = useState(false);
  const [registeredId, setRegisteredId] = useState(null);
  const loader = useCallback(() => getEventById(id), [id]);
  const { data: event, loading, error, retry } = useApiQuery(loader);

  const handleRegister = async () => {
    try {
      setRegistering(true);

      await registerForEvent(id);

      setRegisteredId(id);
      toast.success("Successfully registered");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingState />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <ErrorState message={error} onRetry={retry} />
      </DashboardLayout>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <DashboardLayout>
      <div
        className="

          max-w-7xl

          mx-auto

          space-y-8

        "
      >
        <EventDetailHero event={event} />

        <EventInfoGrid event={event} />

        <EventDescription description={event.description} />

        <div
          className="

            flex

            justify-center

          "
        >
          {role === "STUDENT" && event.status === "APPROVED" && (registeredId === id
            ? <Link to="/my-events" className="bg-primary text-white px-6 py-3 rounded-xl">View my registrations</Link>
            : <EventRegisterButton
            registering={registering}

            onRegister={handleRegister}
          />)}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EventDetailPage;
