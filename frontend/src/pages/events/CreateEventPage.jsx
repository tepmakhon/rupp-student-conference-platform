import {

  useEffect,

  useState,

} from "react";

import toast
from "react-hot-toast";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {

  createEvent,

} from "../../api/eventApi";

import {

  getEventCategories,

} from "../../api/eventCategoryApi";

import {

  uploadToCloudinary,

} from "../../utils/cloudinaryUpload";

function CreateEventPage() {

  const [

    categories,

    setCategories,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(false);

  const [

    imageUploading,

    setImageUploading,

  ] = useState(false);

  const [

    form,

    setForm,

  ] = useState({

    title: "",

    description: "",

    location: "",

    categoryId: "",

    capacity: "",

    eventDate: "",

    bannerImageUrl: "",

  });

  useEffect(() => {

    loadCategories();

  }, []);

  const loadCategories =
    async () => {

      try {

        const data =

          await getEventCategories();

        setCategories(
          data
        );

      } catch (error) {

        console.error(
          error
        );

        toast.error(
          "Failed to load categories"
        );

      }

    };

  const handleChange =
    (e) => {

      setForm({

        ...form,

        [

          e.target.name

        ]:

        e.target.value,

      });

    };

  const handleImage =
    async (e) => {

      const file =

        e.target.files[0];

      if (!file) return;

      try {

        setImageUploading(
          true
        );

        const url =

          await uploadToCloudinary(
            file
          );

        setForm(

          (prev) => ({

            ...prev,

            bannerImageUrl:
              url,

          })

        );

        toast.success(
          "Image uploaded"
        );

      } catch (error) {

        console.error(
          error
        );

        toast.error(
          "Upload failed"
        );

      } finally {

        setImageUploading(
          false
        );

      }

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await createEvent(
          form
        );

        toast.success(
          "Event created"
        );

        setForm({

          title: "",

          description: "",

          location: "",

          categoryId: "",

          capacity: "",

          eventDate: "",

          bannerImageUrl: "",

        });

      } catch (error) {

        console.error(
          error
        );

        toast.error(

          error?.response

            ?.data?.message ||

          "Failed to create event"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      <div className="max-w-5xl mx-auto">

        <div className="mb-10">

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
              mt-3
            "
          >

            Publish a conference,
            workshop,
            seminar,
            competition,
            or campus activity.

          </p>

        </div>

        <form

          onSubmit={handleSubmit}

          className="
            bg-white
            rounded-3xl
            shadow-md
            p-10
            space-y-8
          "

        >

          <div
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >

            {/* Title */}

            <div>

              <label
                className="
                  block
                  mb-2
                  font-semibold
                  text-gray-700
                "
              >

                Event Title

              </label>

              <input

                name="title"

                value={form.title}

                onChange={handleChange}

                placeholder="Google Developer Workshop"

                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-secondary
                "

              />

            </div>

            {/* Category */}

            <div>

              <label
                className="
                  block
                  mb-2
                  font-semibold
                  text-gray-700
                "
              >

                Category

              </label>

              <select

                name="categoryId"

                value={form.categoryId}

                onChange={handleChange}

                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-secondary
                "

              >

                <option value="">

                  Select category

                </option>

                {

                  categories.map(

                    (category) => (

                      <option

                        key={category.id}

                        value={category.id}

                      >

                        {category.categoryName}

                      </option>

                    )

                  )

                }

              </select>

            </div>

            {/* Location */}

            <div>

              <label
                className="
                  block
                  mb-2
                  font-semibold
                  text-gray-700
                "
              >

                Location

              </label>

              <input

                name="location"

                value={form.location}

                onChange={handleChange}

                placeholder="RUPP Conference Hall"

                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-secondary
                "

              />

            </div>

            {/* Capacity */}

            <div>

              <label
                className="
                  block
                  mb-2
                  font-semibold
                  text-gray-700
                "
              >

                Capacity

              </label>

              <input

                type="number"

                name="capacity"

                value={form.capacity}

                onChange={handleChange}

                placeholder="100"

                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-secondary
                "

              />

            </div>

          </div>

          {/* Event Date */}

          <div>

            <label
              className="
                block
                mb-2
                font-semibold
                text-gray-700
              "
            >

              Event Date

            </label>

            <input

              type="datetime-local"

              name="eventDate"

              value={form.eventDate}

              onChange={handleChange}

              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-secondary
              "

            />

          </div>

          {/* Description */}

          <div>

            <label
              className="
                block
                mb-2
                font-semibold
                text-gray-700
              "
            >

              Description

            </label>

            <textarea

              name="description"

              rows={6}

              value={form.description}

              onChange={handleChange}

              placeholder="Describe your event..."

              className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-secondary
              "

            />

          </div>

          {/* Banner */}

          <div>

            <label
              className="
                block
                mb-3
                font-semibold
                text-gray-700
              "
            >

              Event Banner

            </label>

            <div
              className="
                border-2
                border-dashed
                border-gray-300
                rounded-2xl
                p-6
              "
            >

              <input

                type="file"

                accept="image/*"

                onChange={handleImage}

              />

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-3
                "
              >

                Recommended:
                1200 x 600 px

              </p>

            </div>

          </div>

          {

            form.bannerImageUrl && (

              <div>

                <img

                  src={form.bannerImageUrl}

                  alt="Banner"

                  className="
                    w-full
                    h-80
                    object-cover
                    rounded-2xl
                  "

                />

              </div>

            )

          }

          <button

            type="submit"

            disabled={
              loading ||

              imageUploading
            }

            className="
              w-full
              bg-primary
              hover:bg-secondary
              text-white
              py-4
              rounded-2xl
              text-lg
              font-semibold
              transition
              disabled:opacity-50
            "

          >

            {

              imageUploading

              ? "Uploading Image..."

              : loading

              ? "Creating Event..."

              : "Create Event"

            }

          </button>

        </form>

      </div>

    </DashboardLayout>

  );

}

export default CreateEventPage;