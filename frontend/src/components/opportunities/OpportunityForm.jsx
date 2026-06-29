import { useState } from "react";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
function OpportunityForm({
  initialData = {},
  opportunityTypes = [],
  loading = false,
  onSubmit,
}) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    requirements: initialData.requirements || "",
    coverImageUrl: initialData.coverImageUrl || "",
    deadline: initialData.deadline ? initialData.deadline.slice(0, 10) : "",
    typeId: initialData.typeId || "",
  });

  const [uploading, setUploading] = useState(false);
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const imageUrl = await uploadToCloudinary(file);

      setForm((prev) => ({
        ...prev,
        coverImageUrl: imageUrl,
      }));

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };
  const handleChange = (e) => {
    const {
      name,

      value,
    } = e.target;

    setForm({
      ...form,

      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.(form);
  };

  return (
    <form
      onSubmit={handleSubmit}

      className="

        bg-white

        rounded-3xl

        shadow-sm

        border

        p-10

        space-y-8

      "
    >
      {/* Title */}

      <div>
        <label
          className="

            block

            mb-3

            font-semibold

            text-primary

          "
        >
          Title
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

            rounded-2xl

            p-4

            focus:outline-none

            focus:ring-2

            focus:ring-secondary

          "
        />
      </div>

      {/* Type */}

      <div>
        <label
          className="

            block

            mb-3

            font-semibold

            text-primary

          "
        >
          Opportunity Type
        </label>

        <select
          name="typeId"

          value={form.typeId}

          onChange={handleChange}

          required

          className="

            w-full

            border

            rounded-2xl

            p-4

            focus:outline-none

            focus:ring-2

            focus:ring-secondary

          "
        >
          <option value="">Select Type</option>

          {opportunityTypes.map((type) => (
            <option
              key={type.id}

              value={type.id}
            >
              {type.typeName}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}

      <div>
        <label
          className="

            block

            mb-3

            font-semibold

            text-primary

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

            rounded-2xl

            p-4

            focus:outline-none

            focus:ring-2

            focus:ring-secondary

          "
        />
      </div>

      {/* Requirements */}

      <div>
        <label
          className="

            block

            mb-3

            font-semibold

            text-primary

          "
        >
          Requirements
        </label>

        <textarea
          rows={6}

          name="requirements"

          value={form.requirements}

          onChange={handleChange}

          className="

            w-full

            border

            rounded-2xl

            p-4

            focus:outline-none

            focus:ring-2

            focus:ring-secondary

          "
        />
      </div>

      {/* Cover Image */}

      <div className="space-y-8">
        <div>
          <label
            className="
                block
                mb-3
                font-semibold
                text-primary
              "
          >
            Cover Image
          </label>

          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="
                  w-full
                  border
                  rounded-2xl
                  p-3
                  cursor-pointer
                  file:mr-4
                  file:px-4
                  file:py-2
                  file:rounded-xl
                  file:border-0
                  file:bg-primary
                  file:text-white
                  file:cursor-pointer
                  hover:file:bg-secondary
                "
            />

            <div
              className="
                  flex
                  items-center
                  gap-3
                "
            >
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <input
              type="text"
              name="coverImageUrl"
              placeholder="Paste image URL..."
              value={form.coverImageUrl}
              onChange={handleChange}
              className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-secondary
                "
            />

            {uploading && (
              <p className="text-blue-600 font-medium">Uploading image...</p>
            )}

            {form.coverImageUrl && (
              <div
                className="
                    relative
                    rounded-3xl
                    overflow-hidden
                    border
                    shadow-sm
                    bg-gray-100
                  "
              >
                <img
                  src={form.coverImageUrl}
                  alt="Preview"
                  className="
                      w-full
                      max-h-[500px]
                      object-contain
                    "
                />

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      coverImageUrl: "",
                    })
                  }
                  className="
                      absolute
                      top-4
                      right-4
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      shadow
                      transition
                    "
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Deadline */}

        <div>
          <label
            className="
                block
                mb-3
                font-semibold
                text-primary
              "
          >
            Deadline
          </label>

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="
                w-full
                border
                rounded-2xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-secondary
              "
          />
        </div>
      </div>

      <button
        type="submit"

        disabled={loading}

        className="

          w-full

          bg-primary

          hover:bg-secondary

          text-white

          py-4

          rounded-2xl

          font-semibold

          transition

          disabled:opacity-50

        "
      >
        {loading ? "Saving..." : "Save Opportunity"}
      </button>
    </form>
  );
}

export default OpportunityForm;
