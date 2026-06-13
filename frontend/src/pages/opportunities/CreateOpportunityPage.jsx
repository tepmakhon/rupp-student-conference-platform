import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../api/axios";

function CreateOpportunityPage() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    typeId: "",
    deadline: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleImageChange = (e) => {

    setImage(e.target.files[0]);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "requirements",
        formData.requirements
      );

      data.append(
        "typeId",
        formData.typeId
      );

      data.append(
        "deadline",
        formData.deadline
      );

      if (image) {
        data.append(
          "coverImage",
          image
        );
      }

      await axiosInstance.post(
        "/opportunities",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Opportunity created successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create opportunity"
      );
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
                p-3
                rounded-lg
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
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="
                w-full
                border
                p-3
                rounded-lg
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
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows="4"
              className="
                w-full
                border
                p-3
                rounded-lg
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
              Opportunity Type ID
            </label>

            <input
              type="number"
              name="typeId"
              value={formData.typeId}
              onChange={handleChange}
              className="
                w-full
                border
                p-3
                rounded-lg
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
            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-lg
            "
          >
            Create Opportunity
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default CreateOpportunityPage;