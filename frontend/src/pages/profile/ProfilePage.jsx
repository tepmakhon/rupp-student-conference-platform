import { useEffect, useState } from "react";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import {
  getMyProfile,
  createProfile,
  updateProfile,
} from "../../api/userApi";

import {
  uploadToCloudinary,
} from "../../utils/cloudinaryUpload";

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

  const loadProfile =
    async () => {

      try {

        const profile =
          await getMyProfile();

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
              ? profile.dateOfBirth
                  .split("T")[0]
              : "",

          bio:
            profile.bio || "",

          profileImageUrl:
            profile.profileImageUrl || "",

        });

      } catch (error) {

        console.log(error);

        setProfileExists(false);

      } finally {

        setLoading(false);

      }
    };

  const handleChange =
    (e) => {

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

        const imageUrl =
          await uploadToCloudinary(
            file
          );

        setFormData((prev) => ({
          ...prev,
          profileImageUrl:
            imageUrl,
        }));

        toast.success(
          "Profile image uploaded successfully"
        );

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to upload image"
        );

      } finally {

        setUploading(false);

      }
    };

  const handleSubmit =
    async () => {

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

          setProfileExists(true);

        }

        await loadProfile();

      } catch (error) {

        console.log(error);

        toast.error(
          error?.response?.data?.message ||
          "Failed to save profile"
        );

      }
    };

  if (loading) {

    return (

      <DashboardLayout>

        <div
          className="
            flex
            justify-center
            items-center
            h-64
          "
        >
          Loading Profile...
        </div>

      </DashboardLayout>

    );
  }

  return (

    <DashboardLayout>

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        <div className="mb-8">

          <h1
            className="
              text-4xl
              font-bold
              text-primary
            "
          >
            My Profile
          </h1>

          <p
            className="
              text-gray-600
              mt-2
            "
          >
            Manage your personal
            information and profile.
          </p>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-lg
            p-8
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              mb-8
            "
          >

            <img
              src={
                formData.profileImageUrl ||
                "https://placehold.co/200x200?text=Profile"
              }
              alt="Profile"
              className="
                w-40
                h-40
                rounded-full
                object-cover
                border-4
                border-gold
                shadow-lg
              "
            />

            <label
              className="
                mt-4
                cursor-pointer
                bg-secondary
                text-white
                px-4
                py-2
                rounded-xl
              "
            >
              {
                uploading
                  ? "Uploading..."
                  : "Change Photo"
              }

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleImageUpload
                }
              />

            </label>

          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >

            <input
              name="fullName"
              placeholder="Full Name"
              value={
                formData.fullName
              }
              onChange={
                handleChange
              }
              className="
                border
                rounded-xl
                p-3
              "
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
              className="
                border
                rounded-xl
                p-3
              "
            />

            <select
              name="gender"
              value={
                formData.gender
              }
              onChange={
                handleChange
              }
              className="
                border
                rounded-xl
                p-3
              "
            >

              <option value="">
                Select Gender
              </option>

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
              className="
                border
                rounded-xl
                p-3
              "
            />

          </div>

          <textarea
            name="bio"
            placeholder="Tell us about yourself..."
            value={
              formData.bio
            }
            onChange={
              handleChange
            }
            rows="5"
            className="
              w-full
              border
              rounded-xl
              p-3
              mt-6
            "
          />

          <button
            onClick={
              handleSubmit
            }
            className="
              mt-8
              bg-primary
              hover:bg-secondary
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition-all
              shadow-md
            "
          >

            {
              profileExists
                ? "Update Profile"
                : "Create Profile"
            }

          </button>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default ProfilePage;