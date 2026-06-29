import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import DashboardLoading from "../../components/dashboard/DashboardLoading";

import DashboardError from "../../components/dashboard/DashboardError";

import ProfileCard from "../../components/profile/ProfileCard";

import ProfileAvatar from "../../components/profile/ProfileAvatar";

import ProfileCompletion from "../../components/profile/ProfileCompletion";

import EditProfileHero from "../../components/profile/EditProfileHero";

import EditProfileActions from "../../components/profile/EditProfileActions";

import EditProfileSkills from "../../components/profile/EditProfileSkills";

import { getMyProfile, updateMyProfile } from "../../api/profileApi";

import { updateMySkills } from "../../api/studentSkillApi";

function EditProfilePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState(null);

  const [profile, setProfile] = useState(null);
  const isStudent = Boolean(profile?.student);

  const isOrganization = Boolean(profile?.organization);

  const isAdmin = profile?.role?.roleName === "ADMIN";

  const [selectedSkills, setSelectedSkills] = useState([]);

  const [form, setForm] = useState({
    fullName: "",

    phoneNumber: "",

    gender: "",

    dateOfBirth: "",

    bio: "",

    profileImageUrl: "",

    academicYear: "",

    websiteUrl: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await getMyProfile();

      setProfile(data);

      setForm({
        fullName: data.profile?.fullName || "",

        phoneNumber: data.profile?.phoneNumber || "",

        gender: data.profile?.gender || "",

        dateOfBirth: data.profile?.dateOfBirth
          ? new Date(data.profile.dateOfBirth)

              .toISOString()

              .split("T")[0]
          : "",

        bio: data.profile?.bio || "",

        profileImageUrl: data.profile?.profileImageUrl || "",

        academicYear: data.student?.academicYear || "",

        websiteUrl: data.organization?.websiteUrl || "",
      });

      if (data.student?.studentSkills) {
        setSelectedSkills(
          data.student.studentSkills.map((item) => item.skillId.toString()),
        );
      }
    } catch (error) {
      console.error(error);

      setError("Failed to load profile");

      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateMyProfile(form);

      if (profile?.student) {
        await updateMySkills(selectedSkills);
      }

      toast.success("Profile updated");

      navigate("/profile");
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardLoading />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <DashboardError message={error} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        className="

        max-w-7xl

        mx-auto

        space-y-8

        "
      >
        <EditProfileHero />

        <form
          onSubmit={handleSubmit}

          className="

          space-y-8

          "
        >
          <ProfileCard>
            <div
              className="

              flex

              justify-center

              "
            >
              <ProfileAvatar
                editable

                size="xl"

                value={form.profileImageUrl}

                fullName={form.fullName}

                onChange={(url) =>
                  setForm({
                    ...form,

                    profileImageUrl: url,
                  })
                }
              />
            </div>
          </ProfileCard>

          {isStudent && (
            <ProfileCompletion
              profile={{
                profile: {
                  fullName: form.fullName,

                  phoneNumber: form.phoneNumber,

                  gender: form.gender,

                  bio: form.bio,

                  profileImageUrl: form.profileImageUrl,
                },
              }}
            />
          )}

          <ProfileCard title="Personal Information">
            <div
              className="

              grid

              md:grid-cols-2

              gap-6

              "
            >
              <InputField
                label="Full Name"

                value={form.fullName}

                onChange={(value) =>
                  setForm({
                    ...form,

                    fullName: value,
                  })
                }
              />

              <InputField
                label="Phone Number"

                value={form.phoneNumber}

                onChange={(value) =>
                  setForm({
                    ...form,

                    phoneNumber: value,
                  })
                }
              />

              <div>
                <label
                  className="

                  block

                  mb-2

                  font-medium

                  "
                >
                  Gender
                </label>

                <select
                  value={form.gender}

                  onChange={(e) =>
                    setForm({
                      ...form,

                      gender: e.target.value,
                    })
                  }

                  className="

                  w-full

                  border

                  rounded-2xl

                  px-4

                  py-3

                  "
                >
                  <option value="">Select Gender</option>

                  <option value="MALE">Male</option>

                  <option value="FEMALE">Female</option>
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
                  Date Of Birth
                </label>

                <input
                  type="date"

                  value={form.dateOfBirth}

                  onChange={(e) =>
                    setForm({
                      ...form,

                      dateOfBirth: e.target.value,
                    })
                  }

                  className="

                  w-full

                  border

                  rounded-2xl

                  px-4

                  py-3

                  "
                />
              </div>
            </div>

            <div
              className="

              mt-6

              "
            >
              <label
                className="

                block

                mb-2

                font-medium

                "
              >
                Bio
              </label>

              <textarea
                rows="5"

                value={form.bio}

                onChange={(e) =>
                  setForm({
                    ...form,

                    bio: e.target.value,
                  })
                }

                className="

                w-full

                border

                rounded-2xl

                px-4

                py-3

                "
              />
            </div>
          </ProfileCard>

          {isStudent && (
            <>
              <ProfileCard title="Academic Information">
                <InputField
                  label="Academic Year"

                  value={form.academicYear}

                  onChange={(value) =>
                    setForm({
                      ...form,

                      academicYear: value,
                    })
                  }
                />
              </ProfileCard>

              <ProfileCard>
                <EditProfileSkills
                  selectedSkills={selectedSkills}

                  setSelectedSkills={setSelectedSkills}
                />
              </ProfileCard>
            </>
          )}

          {isOrganization && (
            <ProfileCard title="Organization Information">
              <InputField
                label="Website URL"

                value={form.websiteUrl}

                onChange={(value) =>
                  setForm({
                    ...form,

                    websiteUrl: value,
                  })
                }
              />
            </ProfileCard>
          )}

          <EditProfileActions
            saving={saving}

            onCancel={() => navigate("/profile")}
          />
        </form>
      </div>
    </DashboardLayout>
  );
}

function InputField({
  label,

  value,

  onChange,
}) {
  return (
    <div>
      <label
        className="

        block

        mb-2

        font-medium

        "
      >
        {label}
      </label>

      <input
        type="text"

        value={value}

        onChange={(e) => onChange(e.target.value)}

        className="

        w-full

        border

        rounded-2xl

        px-4

        py-3

        "
      />
    </div>
  );
}

export default EditProfilePage;
