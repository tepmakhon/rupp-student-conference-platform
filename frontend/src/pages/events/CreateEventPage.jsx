import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  createEvent,
} from "../../api/eventApi";

function CreateEventPage() {

  const navigate =
    useNavigate();

  const [

    formData,

    setFormData,

  ] = useState({

    title: "",

    description: "",

    location: "",

    categoryId: "",

    capacity: "",

    bannerImageUrl: "",

    eventDate: "",

  });

  const [

    loading,

    setLoading,

  ] = useState(false);

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:

          e.target.value,

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await createEvent({

          ...formData,

          capacity:

            formData.capacity

            ? Number(

                formData.capacity

              )

            : null,

        });

        toast.success(

          "Event created"

        );

        navigate(

          "/organization/events"

        );

      } catch (error) {

        console.error(
          error
        );

        toast.error(

          error?.response?.data?.message ||

          "Failed to create event"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      <div
        className="
          max-w-3xl
          mx-auto
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            text-primary
            mb-8
          "
        >

          Create Event

        </h1>

        <form

          onSubmit={
            handleSubmit
          }

          className="
            bg-white
            rounded-2xl
            shadow-md
            p-8
            space-y-6
          "
        >

          <input

            name="title"

            placeholder="Title"

            value={
              formData.title
            }

            onChange={
              handleChange
            }

            required

            className="
              w-full
              border
              p-3
              rounded-xl
            "

          />

          <textarea

            name="description"

            placeholder="Description"

            value={
              formData.description
            }

            onChange={
              handleChange
            }

            required

            rows={5}

            className="
              w-full
              border
              p-3
              rounded-xl
            "

          />

          <input

            name="location"

            placeholder="Location"

            value={
              formData.location
            }

            onChange={
              handleChange
            }

            required

            className="
              w-full
              border
              p-3
              rounded-xl
            "

          />

          <input

            name="categoryId"

            placeholder="Category ID"

            value={
              formData.categoryId
            }

            onChange={
              handleChange
            }

            required

            className="
              w-full
              border
              p-3
              rounded-xl
            "

          />

          <input

            name="capacity"

            type="number"

            placeholder="Capacity"

            value={
              formData.capacity
            }

            onChange={
              handleChange
            }

            className="
              w-full
              border
              p-3
              rounded-xl
            "

          />

          <input

            name="bannerImageUrl"

            placeholder="Banner Image URL"

            value={
              formData.bannerImageUrl
            }

            onChange={
              handleChange
            }

            className="
              w-full
              border
              p-3
              rounded-xl
            "

          />

          <input

            name="eventDate"

            type="datetime-local"

            value={
              formData.eventDate
            }

            onChange={
              handleChange
            }

            required

            className="
              w-full
              border
              p-3
              rounded-xl
            "

          />

          <button

            type="submit"

            disabled={
              loading
            }

            className="
              w-full
              bg-primary
              hover:bg-secondary
              text-white
              py-3
              rounded-xl
            "

          >

            {

              loading

              ?

              "Creating..."

              :

              "Create Event"

            }

          </button>

        </form>

      </div>

    </DashboardLayout>

  );

}

export default CreateEventPage;