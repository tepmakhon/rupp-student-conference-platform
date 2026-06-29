import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { PencilSquareIcon } from "@heroicons/react/24/outline";

import DashboardLayout from "../../components/layouts/DashboardLayout";

import DashboardLoading from "../../components/dashboard/DashboardLoading";

import DashboardError from "../../components/dashboard/DashboardError";

import ProfileHero from "../../components/profile/ProfileHero";

import ProfileStatistics from "../../components/profile/ProfileStatistics";

import ProfileCompletion from "../../components/profile/ProfileCompletion";

import ProfileSkills from "../../components/profile/ProfileSkills";

import ProfileCard from "../../components/profile/ProfileCard";

import ProfileInfoItem from "../../components/profile/ProfileInfoItem";

import { getMyProfile } from "../../api/profileApi";

import {
  setProfileLoading,
  setProfileData,
  setProfileError,
} from "../../redux/slices/profileSlice";

function ProfilePage() {
  const dispatch = useDispatch();

  const {
    profile,

    loading,

    error,
  } = useSelector((state) => state.profile);
  const isStudent = Boolean(profile?.student);

  const isOrganization = Boolean(profile?.organization);

  const isAdmin = profile?.role?.roleName === "ADMIN";

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      dispatch(setProfileLoading(true));

      dispatch(setProfileError(null));

      const data = await getMyProfile();

      dispatch(setProfileData(data));
    } catch (error) {
      console.error(error);

      dispatch(setProfileError("Failed to load profile"));
    } finally {
      dispatch(setProfileLoading(false));
    }
  };

  return (
    <DashboardLayout>
      <div
        className="

          max-w-7xl

          mx-auto

          space-y-8

        "
      >
        {loading && <DashboardLoading />}

        {!loading && error && <DashboardError message={error} />}

        {!loading && !error && profile && (
          <>
            {/* HERO */}

            <ProfileHero profile={profile} />

            {isStudent && (
              <>
                <ProfileStatistics profile={profile} />

                <ProfileCompletion profile={profile} />
              </>
            )}

            {/* PERSONAL */}

            <ProfileCard title="Personal Information">
              <div
                className="

                    grid

                    md:grid-cols-2

                    gap-8

                  "
              >
                <ProfileInfoItem
                  label="Email"

                  value={profile.email}
                />

                <ProfileInfoItem
                  label="Phone"

                  value={profile.profile?.phoneNumber}
                />

                <ProfileInfoItem
                  label="Gender"

                  value={profile.profile?.gender}
                />

                <ProfileInfoItem
                  label="Date Of Birth"

                  value={
                    profile.profile?.dateOfBirth
                      ? new Date(
                          profile.profile.dateOfBirth,
                        ).toLocaleDateString()
                      : "-"
                  }
                />

                <div
                  className="

                      md:col-span-2

                    "
                >
                  <ProfileInfoItem
                    label="Bio"

                    value={profile.profile?.bio}
                  />
                </div>
              </div>
            </ProfileCard>

            {/* STUDENT */}

            {isStudent && (
              <ProfileCard title="Academic Information">
                <div
                  className="

                        grid

                        md:grid-cols-2

                        gap-8

                      "
                >
                  <ProfileInfoItem
                    label="University"

                    value={profile.student?.university?.universityName}
                  />

                  <ProfileInfoItem
                    label="Faculty"

                    value={profile.student?.faculty?.facultyName}
                  />

                  <ProfileInfoItem
                    label="Major"

                    value={profile.student?.major?.majorName}
                  />

                  <ProfileInfoItem
                    label="Academic Year"

                    value={profile.student?.academicYear}
                  />
                </div>
              </ProfileCard>
            )}

            {/* SKILLS */}

            {isStudent && (
              <ProfileSkills skills={profile.student?.studentSkills || []} />
            )}

            {/* ORGANIZATION */}

            {isOrganization && (
              <ProfileCard title="Organization Information">
                <div
                  className="

                        grid

                        md:grid-cols-2

                        gap-8

                      "
                >
                  <ProfileInfoItem
                    label="Organization"

                    value={profile.organization?.organizationName}
                  />

                  <ProfileInfoItem
                    label="Website"

                    value={profile.organization?.websiteUrl}
                  />

                  <div
                    className="

                          md:col-span-2

                        "
                  >
                    <ProfileInfoItem
                      label="Description"

                      value={profile.organization?.description}
                    />
                  </div>
                </div>
              </ProfileCard>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ProfilePage;
