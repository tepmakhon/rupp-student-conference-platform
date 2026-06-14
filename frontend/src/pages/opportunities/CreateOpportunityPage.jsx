import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../api/axios";

import toast from "react-hot-toast";
import {
  uploadToCloudinary,
} from "../../utils/cloudinaryUpload";

function CreateOpportunityPage() {

const [loading, setLoading] =
useState(false);

const [image, setImage] =
useState(null);

const [imagePreview, setImagePreview] =
useState("");

const [formData, setFormData] =
useState({
title: "",
description: "",
requirements: "",
typeId: "",
deadline: "",
});

const handleChange = (e) => {

setFormData({
  ...formData,
  [e.target.name]:
    e.target.value,
});

};

const handleImageChange =
(e) => {

  const file =
    e.target.files[0];
  if (!file) return;
  setImage(file);
  setImagePreview(
    URL.createObjectURL(file)
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

const resetForm = () => {

setFormData({
  title: "",
  description: "",
  requirements: "",
  typeId: "",
  deadline: "",
});
setImage(null);
setImagePreview("");

};

const handleSubmit =
async (e) => {

  e.preventDefault();
  if (
    !formData.title.trim()
  ) {
    toast.error(
      "Title is required"
    );
    return;
  }
  if (
    !formData.description.trim()
  ) {
    toast.error(
      "Description is required"
    );
    return;
  }
  if (
    !formData.requirements.trim()
  ) {
    toast.error(
      "Requirements are required"
    );
    return;
  }
  if (
    !formData.typeId
  ) {
    toast.error(
      "Please select an opportunity type"
    );
    return;
  }
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
    await axiosInstance.post(
      "/opportunities",
      payload
    );
    toast.success(
      "Opportunity created successfully"
    );
    resetForm();
  } catch (error) {
    console.error(error);
    toast.error(
      error?.response?.data?.message ||
      "Failed to create opportunity"
    );
  } finally {
    setLoading(false);
  }
};

return (

<DashboardLayout>
  <div
    className="
      max-w-5xl
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
          text-3xl
          font-bold
          text-primary
        "
      >
        Create Opportunity
      </h1>
      <p
        className="
          text-gray-500
          mt-2
        "
      >
        Publish internships,
        scholarships,
        volunteer positions,
        and career opportunities.
      </p>
    </div>
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-8
        space-y-6
      "
    >
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
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        />
      </div>
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
          rows="5"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        />
      </div>
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
          rows="5"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="
            w-full
            border
            rounded-xl
            p-3
          "
        />
      </div>
      <div
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >
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
            className="
              w-full
              border
              rounded-xl
              p-3
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
              rounded-xl
              p-3
            "
          />
        </div>
      </div>
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
            rounded-xl
            p-3
          "
        />
      </div>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="
            w-full
            h-64
            object-cover
            rounded-2xl
            border
          "
        />
      )}
      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-primary
          hover:bg-secondary
          text-white
          py-3
          rounded-xl
          transition
          disabled:opacity-50
        "
      >
        {
          loading
            ? "Creating Opportunity..."
            : "Create Opportunity"
        }
      </button>
    </form>
  </div>
</DashboardLayout>

);
}

export default CreateOpportunityPage;