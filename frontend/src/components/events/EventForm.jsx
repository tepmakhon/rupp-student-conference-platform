import {
  useState,
} from "react";

import toast
from "react-hot-toast";

import {
  uploadToCloudinary,
} from "../../utils/cloudinaryUpload";

function EventForm({

  initialData,

  categories,

  onSubmit,

  submitText,

}) {

  const [

    form,

    setForm,

  ] = useState({

    title:
      initialData?.title || "",

    description:
      initialData?.description || "",

    location:
      initialData?.location || "",

    categoryId:
      initialData?.categoryId || "",

    capacity:
      initialData?.capacity || "",

    eventDate:
      initialData?.eventDate || "",

    bannerImageUrl:
      initialData?.bannerImageUrl || "",

  });

  const [

    loading,

    setLoading,

  ] = useState(false);

  const [

    imageUploading,

    setImageUploading,

  ] = useState(false);

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

        setLoading(
          true
        );

        await onSubmit(
          form
        );

      } finally {

        setLoading(
          false
        );

      }

    };

  return (

    <form

      onSubmit={
        handleSubmit
      }

      className="

        bg-white

        p-8

        rounded-3xl

        shadow-md

        space-y-6

      "

    >

      {/* Title */}

      <div>

        <label

          className="

            block

            mb-2

            font-semibold

          "

        >

          Event Title

        </label>

        <input

          name="title"

          value={
            form.title
          }

          onChange={
            handleChange
          }

          className="

            w-full

            border

            rounded-xl

            p-3

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

          "

        >

          Description

        </label>

        <textarea

          name="description"

          rows={5}

          value={
            form.description
          }

          onChange={
            handleChange
          }

          className="

            w-full

            border

            rounded-xl

            p-3

          "

        />

      </div>

      {/* Location */}

      <div>

        <label

          className="

            block

            mb-2

            font-semibold

          "

        >

          Location

        </label>

        <input

          name="location"

          value={
            form.location
          }

          onChange={
            handleChange
          }

          className="

            w-full

            border

            rounded-xl

            p-3

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

          "

        >

          Category

        </label>

        <select

          name="categoryId"

          value={
            form.categoryId
          }

          onChange={
            handleChange
          }

          className="

            w-full

            border

            rounded-xl

            p-3

          "

        >

          <option value="">

            Select category

          </option>

          {

            categories.map(

              (

                category

              ) => (

                <option

                  key={
                    category.id
                  }

                  value={
                    category.id
                  }

                >

                  {

                    category.categoryName

                  }

                </option>

              )

            )

          }

        </select>

      </div>

      {/* Capacity */}

      <div>

        <label

          className="

            block

            mb-2

            font-semibold

          "

        >

          Capacity

        </label>

        <input

          type="number"

          name="capacity"

          value={
            form.capacity
          }

          onChange={
            handleChange
          }

          className="

            w-full

            border

            rounded-xl

            p-3

          "

        />

      </div>

      {/* Date */}

      <div>

        <label

          className="

            block

            mb-2

            font-semibold

          "

        >

          Event Date

        </label>

        <input

          type="datetime-local"

          name="eventDate"

          value={
            form.eventDate
          }

          onChange={
            handleChange
          }

          className="

            w-full

            border

            rounded-xl

            p-3

          "

        />

      </div>

      {/* Banner */}

      <div>

        <label

          className="

            block

            mb-2

            font-semibold

          "

        >

          Banner Image

        </label>

        <input

          type="file"

          accept="image/*"

          onChange={
            handleImage
          }

        />

      </div>

      {

        form.bannerImageUrl && (

          <img

            src={
              form.bannerImageUrl
            }

            alt="banner"

            className="

              w-full

              h-64

              object-cover

              rounded-2xl

            "

          />

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

          rounded-xl

        "

      >

        {

          imageUploading

          ? "Uploading..."

          : loading

          ? "Saving..."

          : submitText

        }

      </button>

    </form>

  );

}

export default EventForm;