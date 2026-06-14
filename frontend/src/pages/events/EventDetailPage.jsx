import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getEventById,
  registerForEvent,
} from "../../api/eventApi";

function EventDetailPage() {

  const { id } =
    useParams();

  const [
    event,
    setEvent,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    loadEvent();

  }, [id]);

  const loadEvent =
    async () => {

      try {

        const data =
          await getEventById(id);

        setEvent(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  const handleRegister =
    async () => {

      try {

        await registerForEvent(id);

        toast.success(
          "Successfully registered!"
        );

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Registration failed"
        );

      }
    };

  if (loading) {

    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <div
        className="
          bg-white
          rounded-2xl
          shadow-lg
          overflow-hidden
        "
      >

        <img
          src={
            event.bannerImageUrl ||
            "https://placehold.co/1200x500?text=Event"
          }
          alt={event.title}
          className="
            w-full
            h-96
            object-cover
          "
        />

        <div className="p-8">

          <h1
            className="
              text-4xl
              font-bold
              text-primary
              mb-4
            "
          >
            {event.title}
          </h1>

          <p
            className="
              text-gray-600
              mb-6
            "
          >
            {
              event.organization
                ?.organizationName
            }
          </p>

          <p
            className="
              text-gray-700
              mb-8
            "
          >
            {event.description}
          </p>

          <button
            onClick={
              handleRegister
            }
            className="
              bg-primary
              text-white
              px-6
              py-3
              rounded-xl
            "
          >
            Register Event
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default EventDetailPage;