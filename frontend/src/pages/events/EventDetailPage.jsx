import { useEffect, useState, useCallback } from "react";

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

  const [event, setEvent] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [registering, setRegistering] = useState(false);

  const loadEvent = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const data = await getEventById(id);

      setEvent(data);
    } catch (error) {
      console.error(error);

      setError("Failed to load event");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadEvent();
  }, [loadEvent]);

  const handleRegister = async () => {
    try {
      setRegistering(true);

      await registerForEvent(id);

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
        <ErrorState message={error} />
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
          <EventRegisterButton
            registering={registering}

            onRegister={handleRegister}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EventDetailPage;
