import { useEffect, useState } from "react";

import {
  getMyProfile,
  createProfile,
  updateProfile,
} from "../../api/userApi";

function ProfileForm() {

  const [loading, setLoading] =
    useState(true);

  const [hasProfile, setHasProfile] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      phoneNumber: "",
      gender: "MALE",
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

      setFormData({
        fullName:
          profile.fullName || "",

        phoneNumber:
          profile.phoneNumber || "",

        gender:
          profile.gender || "MALE",

        dateOfBirth:
          profile.dateOfBirth
            ? profile.dateOfBirth
                .split("T")[0]
            : "",

        bio:
          profile.bio || "",

        profileImageUrl:
          profile.profileImageUrl || "",
      });

      setHasProfile(true);

    } catch (error) {

      console.log(
        "No profile found"
      );

      setHasProfile(false);

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

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const payload = {
          ...formData,

          dateOfBirth:
            formData.dateOfBirth
              ? new Date(
                  formData.dateOfBirth
                ).toISOString()
              : undefined,
        };

        if (hasProfile) {

          await updateProfile(
            payload
          );

          alert(
            "Profile updated successfully"
          );

        } else {

          await createProfile(
            payload
          );

          alert(
            "Profile created successfully"
          );

          setHasProfile(true);
        }

      } catch (error) {

        console.error(error);

        alert(
          "Failed to save profile"
        );
      }
    };

  if (loading) {

    return (
      <div>
        Loading profile...
      </div>
    );
  }

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="bg-white p-8 rounded-2xl shadow"
    >

      <div className="grid grid-cols-2 gap-6">

        <input
          name="fullName"
          placeholder="Full Name"
          value={
            formData.fullName
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded-lg"
        />

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={
            formData.phoneNumber
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded-lg"
        />

        <select
          name="gender"
          value={
            formData.gender
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded-lg"
        >
          <option value="MALE">
            Male
          </option>

          <option value="FEMALE">
            Female
          </option>

          <option value="OTHER">
            Other
          </option>
        </select>

        <input
          type="date"
          name="dateOfBirth"
          value={
            formData.dateOfBirth
          }
          onChange={
            handleChange
          }
          className="border p-3 rounded-lg"
        />

      </div>

      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        rows="5"
        className="border p-3 rounded-lg w-full mt-6"
      />

      <button
        type="submit"
        className="mt-6 bg-primary text-white px-6 py-3 rounded-lg"
      >
        {hasProfile
          ? "Update Profile"
          : "Create Profile"}
      </button>

    </form>
  );
}

export default ProfileForm;