import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import EventForm from "../../components/events/EventForm";

import { createEvent } from "../../api/eventApi";

import { getEventCategories } from "../../api/eventCategoryApi";

function CreateEventPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getEventCategories();

      setCategories(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (form) => {
    try {
      await createEvent(form);

      toast.success("Event created");

      navigate("/organization/events");
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <DashboardLayout>
      <div
        className="
          max-w-4xl
          mx-auto
        "
      >
        <div
          className="
            mb-8
          "
        >
          <h1
            className="
              text-4xl
              font-bold
              text-primary
            "
          >
            Create Event
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Publish a new event for students.
          </p>
        </div>

        {loading ? (
          <div
            className="
                text-center
                py-20
              "
          >
            Loading...
          </div>
        ) : (
          <EventForm
            categories={categories}

            onSubmit={handleCreate}

            submitText="Create Event"
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default CreateEventPage;
