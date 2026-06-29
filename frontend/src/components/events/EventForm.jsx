import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import { uploadToCloudinary } from "../../utils/cloudinaryUpload";

function EventForm({
  initialData,

  categories = [],

  onSubmit,

  submitText,
}) {
  const [form, setForm] = useState({
    title: "",

    description: "",

    location: "",

    categoryId: "",

    capacity: "",

    eventDate: "",

    bannerImageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const [imageUploading, setImageUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,

      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setImageUploading(true);

      const url = await uploadToCloudinary(file);

      setForm((previous) => ({
        ...previous,

        bannerImageUrl: url,
      }));

      toast.success("Image uploaded");
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onSubmit(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}

      className="

        bg-white

        rounded-3xl

        shadow-sm

        border

        p-8

        space-y-8

      "
    >
      {/* Title */}

      <div>
        <label
          className="

            block

            font-semibold

            mb-2

          "
        >
          Event Title
        </label>

        <input
          type="text"

          name="title"

          value={form.title}

          onChange={handleChange}

          required

          className="

            w-full

            border

            rounded-xl

            p-4

          "
        />
      </div>

      {/* Description */}

      <div>
        <label
          className="

            block

            font-semibold

            mb-2

          "
        >
          Description
        </label>

        <textarea
          rows={6}

          name="description"

          value={form.description}

          onChange={handleChange}

          required

          className="

            w-full

            border

            rounded-xl

            p-4

          "
        />
      </div>

      {/* Grid */}

      <div
        className="

          grid

          md:grid-cols-2

          gap-6

        "
      >
        {/* Location */}

        <div>
          <label
            className="

              block

              font-semibold

              mb-2

            "
          >
            Location
          </label>

          <input
            type="text"

            name="location"

            value={form.location}

            onChange={handleChange}

            required

            className="

              w-full

              border

              rounded-xl

              p-4

            "
          />
        </div>

        {/* Capacity */}

        <div>
          <label
            className="

              block

              font-semibold

              mb-2

            "
          >
            Capacity
          </label>

          <input
            type="number"

            name="capacity"

            value={form.capacity}

            onChange={handleChange}

            className="

              w-full

              border

              rounded-xl

              p-4

            "
          />
        </div>

        {/* Category */}

        <div>
          <label
            className="

              block

              font-semibold

              mb-2

            "
          >
            Category
          </label>

          <select
            name="categoryId"

            value={form.categoryId}

            onChange={handleChange}

            required

            className="

              w-full

              border

              rounded-xl

              p-4

            "
          >
            <option value="">Select category</option>

            {categories.map((category) => (
              <option
                key={category.id}

                value={category.id}
              >
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Event Date */}

        <div>
          <label
            className="

              block

              font-semibold

              mb-2

            "
          >
            Event Date
          </label>

          <input
            type="datetime-local"

            name="eventDate"

            value={form.eventDate}

            onChange={handleChange}

            required

            className="

              w-full

              border

              rounded-xl

              p-4

            "
          />
        </div>
      </div>

      {/* Upload */}

      <div>
        <label
          className="

            block

            font-semibold

            mb-2

          "
        >
          Banner Image
        </label>

        <input
          type="file"

          accept="image/*"

          onChange={handleImage}
        />
      </div>

      {/* Preview */}

      {form.bannerImageUrl && (
        <img
          src={form.bannerImageUrl}

          alt="banner"

          className="

              w-full

              h-72

              object-cover

              rounded-2xl

            "
        />
      )}

      {/* Button */}

      <button
        type="submit"

        disabled={loading || imageUploading}

        className="

          w-full

          bg-primary

          hover:bg-secondary

          text-white

          py-4

          rounded-xl

          font-semibold

          transition

        "
      >
        {imageUploading ? "Uploading..." : loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}

export default EventForm;
