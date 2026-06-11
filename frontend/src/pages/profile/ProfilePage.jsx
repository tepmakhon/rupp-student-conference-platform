import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import {
  getMyProfile,
  createProfile,
  updateProfile,
} from "../../api/userApi";

import {
  uploadFile,
} from "../../api/uploadApi";

import toast from "react-hot-toast";

function ProfilePage() {

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [profileExists, setProfileExists] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      bio: "",
      profileImageUrl: "",
    });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

  try {

    const profile =
     await getMyProfile();

    console.log(
      "PROFILE RESPONSE:",
      profile
    );

    if (!profile) {

      setProfileExists(false);

      return;
    }

    setProfileExists(true);

    setFormData({
      fullName:
        profile.fullName || "",

      phoneNumber:
        profile.phoneNumber || "",

      gender:
        profile.gender || "",

      dateOfBirth:
        profile.dateOfBirth
          ? profile.dateOfBirth.split("T")[0]
          : "",

      bio:
        profile.bio || "",

      profileImageUrl:
        profile.profileImageUrl || "",
    });

    } catch (error) {

      console.log(
        "LOAD PROFILE ERROR:",
        error.response?.data
      );

      setProfileExists(false);

    } finally {

      setLoading(false);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageUpload =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      try {

        setUploading(true);

        const response =
          await uploadFile(file);

        console.log(
          "UPLOAD RESPONSE:",
          response
        );

        const imageUrl =
          response?.data?.url ||
          response?.url ||
          response?.fileUrl ||
          "";

        setFormData(
          (prev) => ({
            ...prev,
            profileImageUrl:
              imageUrl,
          })
        );

        toast.success(
          "Image uploaded successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to upload image"
        );

      } finally {

        setUploading(false);
      }
    };

  const handleSubmit = async () => {

  try {

    const payload = {

      ...formData,

      dateOfBirth:
        formData.dateOfBirth
          ? new Date(
              formData.dateOfBirth
            ).toISOString()
          : null,
    };

    console.log(
      "PROFILE EXISTS STATE:",
      profileExists
    );

    console.log(
      "PAYLOAD:",
      payload
    );
    if (profileExists) {

      console.log(
        "INSIDE UPDATE BLOCK"
      );

      await updateProfile(payload);

    } else {

      console.log(
        "INSIDE CREATE BLOCK"
      );

      await createProfile(payload);

    }

    if (profileExists) {

      await updateProfile(
        payload
      );

      toast.success(
        "Profile updated successfully"
      );

    } else {

      await createProfile(
        payload
      );

      toast.success(
        "Profile created successfully"
      );

      // Switch button mode
      setProfileExists(true);

      // Reload latest profile
      await loadProfile();
    }

  } catch (error) {

    console.log(
      "SAVE PROFILE ERROR:",
      error.response?.data
    );

    toast.error(
      error.response?.data?.message ||
      "Failed to save profile"
    );
  }
};

  if (loading) {

    return (
      <DashboardLayout>

        <div className="p-8">
          Loading Profile...
        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <div className="bg-white p-8 rounded-2xl shadow max-w-4xl">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >

            <option value="">
              Select Gender
            </option>

            <option value="MALE">
              MALE
            </option>

            <option value="FEMALE">
              FEMALE
            </option>

            <option value="OTHER">
              OTHER
            </option>

          </select>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

        </div>

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-6"
          rows="5"
        />

        <div className="mt-6">

          <label
            className="block mb-2 font-medium"
          >
            Profile Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full border p-3 rounded-lg"
          />

          {
            uploading && (

              <p className="mt-2 text-blue-600">
                Uploading image...
              </p>

            )
          }

          {
            formData.profileImageUrl && (

              <img
                src={
                  formData.profileImageUrl
                }
                alt="Profile"
                className="
                  w-40
                  h-40
                  object-cover
                  rounded-full
                  border
                  mt-4
                "
              />

            )
          }

        </div>

        <button
          onClick={handleSubmit}
          className="
            mt-6
            bg-primary
            text-white
            px-8
            py-3
            rounded-lg
            hover:opacity-90
          "
        >

          {profileExists
            ? "Update Profile"
            : "Create Profile"}

        </button>

      </div>

    </DashboardLayout>
  );
}

export default ProfilePage;