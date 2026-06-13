import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../api/axios";

function CreateOpportunityPage() {

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      requirements: "",
      typeId: "",
      deadline: "",
    });

  const [image, setImage] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleImageChange =
    (e) => {

      setImage(
        e.target.files[0]
      );

    };

  const uploadImage =
    async () => {

      if (!image) {
        return "";
      }

      const cloudinaryData =
        new FormData();

      cloudinaryData.append(
        "file",
        image
      );

      cloudinaryData.append(
        "upload_preset",
        "rupp_platform_cloudnary"
      );

      const response =
        await fetch(
          "https://api.cloudinary.com/v1_1/dct61ygjw/image/upload",
          {
            method: "POST",
            body: cloudinaryData,
          }
        );

      const result =
        await response.json();

      return result.secure_url;
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const coverImageUrl =
          await uploadImage();

        const payload = {

          title:
            formData.title,

          description:
            formData.description,

          requirements:
            formData.requirements,

          typeId:
            formData.typeId,

          deadline:
            formData.deadline,

          coverImageUrl,
        };

        console.log(
          "Payload:",
          payload
        );

        await axiosInstance.post(
          "/opportunities",
          payload
        );

        alert(
          "Opportunity created successfully"
        );

        setFormData({
          title: "",
          description: "",
          requirements: "",
          typeId: "",
          deadline: "",
        });

        setImage(null);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to create opportunity"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <DashboardLayout>

      <div className="max-w-3xl mx-auto">

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Create Opportunity
        </h1>

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            p-6
            rounded-xl
            shadow
            space-y-4
          "
        >

          {/* Title */}

          <div>

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="
                w-full
                border
                p-3
                rounded-lg
              "
            />

          </div>

          {/* Description */}

          <div>

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="
                w-full
                border
                p-3
                rounded-lg
              "
            />

          </div>

          {/* Requirements */}

          <div>

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Requirements
            </label>

            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows="4"
              required
              className="
                w-full
                border
                p-3
                rounded-lg
              "
            />

          </div>

          {/* Opportunity Type */}

          <div>

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Opportunity Type
            </label>

            <select
              name="typeId"
              value={formData.typeId}
              onChange={handleChange}
              required
              className="
                w-full
                border
                p-3
                rounded-lg
              "
            >

              <option value="">
                Select Type
              </option>

              <option value="1">
                Internship
              </option>

              <option value="2">
                Scholarship
              </option>

              <option value="3">
                Volunteer
              </option>

              <option value="4">
                Part-Time
              </option>

              <option value="5">
                Full-Time
              </option>

            </select>

          </div>

          {/* Deadline */}

          <div>

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Deadline
            </label>

            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-lg
              "
            />

          </div>

          {/* Cover Image */}

          <div>

            <label
              className="
                block
                mb-2
                font-medium
              "
            >
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="
                w-full
                border
                p-2
                rounded-lg
              "
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-lg
              disabled:opacity-50
            "
          >
            {
              loading
                ? "Creating..."
                : "Create Opportunity"
            }
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default CreateOpportunityPage;