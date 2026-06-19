import {

  useEffect,

  useState,

} from "react";

import toast

from "react-hot-toast";

import {

  Link,

} from "react-router-dom";

import DashboardLayout

from "../../components/layouts/DashboardLayout";

import {

  getMyProfile,

} from "../../api/profileApi";

import ProfileAvatar

from "../../components/profile/ProfileAvatar";

import ProfileCard

from "../../components/profile/ProfileCard";

import ProfileInfoItem

from "../../components/profile/ProfileInfoItem";

function ProfilePage() {

  const [

    profile,

    setProfile,

  ] = useState(null);

  const [

    loading,

    setLoading,

  ] = useState(true);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile =

  async () => {

    try {

      setLoading(true);

      const data =

      await getMyProfile();

      setProfile(data);

    }

    catch(error){

      console.error(error);

      toast.error(

        "Failed to load profile"

      );

    }

    finally{

      setLoading(false);

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

          py-24

          text-gray-500

          "

        >

          Loading profile...

        </div>

      </DashboardLayout>

    );

  }

  if (!profile) {

    return (

      <DashboardLayout>

        <div

          className="

          flex

          justify-center

          items-center

          py-24

          text-gray-500

          "

        >

          Profile not found

        </div>

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

        {/* HEADER */}

        <div

          className="

          flex

          flex-col

          md:flex-row

          md:justify-between

          md:items-center

          gap-6

          "

        >

          <div>

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

              text-gray-500

              mt-2

              "

            >

              Manage your account information

            </p>

          </div>

          <Link

            to="/profile/edit"

            className="

            bg-primary

            hover:bg-secondary

            text-white

            px-6

            py-3

            rounded-xl

            transition

            "

          >

            Edit Profile

          </Link>

        </div>

        {/* PROFILE CARD */}

        <ProfileCard>

          <div

            className="

            flex

            flex-col

            lg:flex-row

            gap-10

            "

          >

            {/* LEFT */}

            <div

              className="

              flex

              flex-col

              items-center

              lg:w-72

              "

            >

              <ProfileAvatar

                size="xl"

                value={

                  profile.profile

                  ?.profileImageUrl

                }

                fullName={

                  profile.profile

                  ?.fullName

                }

              />

              <h2

                className="

                text-2xl

                font-bold

                mt-6

                text-primary

                text-center

                "

              >

                {

                  profile.profile

                  ?.fullName ||

                  "Unknown User"

                }

              </h2>

              <p

                className="

                text-gray-500

                mt-2

                "

              >

                {

                  profile.role

                  ?.roleName ||

                  "User"

                }

              </p>

            </div>

            {/* RIGHT */}

            <div

              className="

              flex-1

              grid

              md:grid-cols-2

              gap-8

              "

            >

              <ProfileInfoItem

                label="Email"

                value={

                  profile.email

                }

              />

              <ProfileInfoItem

                label="Phone Number"

                value={

                  profile.profile

                  ?.phoneNumber

                }

              />

              <ProfileInfoItem

                label="Gender"

                value={

                  profile.profile

                  ?.gender

                }

              />

              <ProfileInfoItem

                label="Date Of Birth"

                value={

                  profile.profile

                  ?.dateOfBirth

                  ?

                  new Date(

                    profile.profile.dateOfBirth

                  )

                  .toLocaleDateString()

                  :

                  "-"

                }

              />

              <div

                className="

                md:col-span-2

                "

              >

                <ProfileInfoItem

                  label="Bio"

                  value={

                    profile.profile

                    ?.bio

                  }

                />

              </div>

            </div>

          </div>

        </ProfileCard>

        {/* STUDENT */}

        {

          profile.student && (

          <ProfileCard

            title="Academic Information"

          >

            <div

              className="

              grid

              md:grid-cols-2

              gap-8

              "

            >

              <ProfileInfoItem

                label="University"

                value={

                  profile.student

                  ?.university

                  ?.universityName

                }

              />

              <ProfileInfoItem

                label="Faculty"

                value={

                  profile.student

                  ?.faculty

                  ?.facultyName

                }

              />

              <ProfileInfoItem

                label="Major"

                value={

                  profile.student

                  ?.major

                  ?.majorName

                }

              />

              <ProfileInfoItem

                label="Academic Year"

                value={

                  profile.student

                  ?.academicYear

                }

              />

            </div>

          </ProfileCard>

          )

        }

        {/* ORGANIZATION */}

        {

          profile.organization && (

          <ProfileCard

            title="Organization Information"

          >

            <div

              className="

              grid

              md:grid-cols-2

              gap-8

              "

            >

              <ProfileInfoItem

                label="Organization Name"

                value={

                  profile.organization

                  ?.organizationName

                }

              />

              <ProfileInfoItem

                label="Website"

                value={

                  profile.organization

                  ?.websiteUrl

                }

              />

              <div

                className="

                md:col-span-2

                "

              >

                <ProfileInfoItem

                  label="Description"

                  value={

                    profile.organization

                    ?.description

                  }

                />

              </div>

            </div>

          </ProfileCard>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default ProfilePage;