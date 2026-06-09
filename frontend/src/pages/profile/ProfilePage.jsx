import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import {
  getMyProfile,
  createProfile,
  updateProfile,
} from "../../api/userApi";

function ProfilePage() {
  
  const [loading, setLoading] =
    useState(true);

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

      const response =
        await getMyProfile();

      const profile =
        response.data;

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

      console.log(error);

      setProfileExists(false);
    }

    setLoading(false);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
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

      if (profileExists) {

        await updateProfile(payload);

        alert(
          "Profile updated successfully"
        );

      } else {

        await createProfile(payload);

        alert(
          "Profile created successfully"
        );

        setProfileExists(true);
      }

    } catch (error) {
      console.log(error);

      console.log(
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed to save profile"
      );
    }
  };

  if (loading) {

    return (
      <DashboardLayout>
        <h1>Loading...</h1>
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

        <input
          name="profileImageUrl"
          placeholder="Profile Image URL"
          value={formData.profileImageUrl}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-6"
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-primary text-white px-8 py-3 rounded-lg"
        >
          Save Profile
        </button>

      </div>

    </DashboardLayout>
  );
}

export default ProfilePage;