import {

  Link,

} from "react-router-dom";

import {

  PencilSquareIcon,

  EnvelopeIcon,

  UserCircleIcon,

} from "@heroicons/react/24/outline";

import ProfileAvatar

from "./ProfileAvatar";

function ProfileHero({

  profile,

}) {

  return (

    <div

      className="

        bg-white

        rounded-3xl

        shadow-sm

        border

        p-8

      "

    >

      <div

        className="

          flex

          flex-col

          lg:flex-row

          lg:justify-between

          lg:items-center

          gap-8

        "

      >

        {/* LEFT */}

        <div

          className="

            flex

            flex-col

            md:flex-row

            items-center

            gap-8

          "

        >

          <ProfileAvatar

            size="xl"

            value={

              profile?.profile

              ?.profileImageUrl

            }

            fullName={

              profile?.profile

              ?.fullName

            }

          />

          <div>

            <h1

              className="

                text-4xl

                font-bold

                text-primary

              "

            >

              {

                profile?.profile

                ?.fullName ||

                "Unknown User"

              }

            </h1>

            <div

              className="

                flex

                flex-col

                gap-3

                mt-4

              "

            >

              <div

                className="

                  flex

                  items-center

                  gap-3

                  text-gray-600

                "

              >

                <EnvelopeIcon

                  className="

                    w-5

                    h-5

                  "

                />

                {

                  profile?.email

                }

              </div>

              <div

                className="

                  flex

                  items-center

                  gap-3

                "

              >

                <UserCircleIcon

                  className="

                    w-5

                    h-5

                    text-primary

                  "

                />

                <span

                  className="

                    px-4

                    py-1

                    rounded-full

                    bg-primary/10

                    text-primary

                    font-semibold

                    text-sm

                  "

                >

                  {

                    profile?.role

                    ?.roleName ||

                    "USER"

                  }

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <Link

            to="/profile/edit"

            className="

              flex

              items-center

              gap-3

              bg-primary

              hover:bg-secondary

              text-white

              px-6

              py-3

              rounded-2xl

              transition

            "

          >

            <PencilSquareIcon

              className="

                w-5

                h-5

              "

            />

            Edit Profile

          </Link>

        </div>

      </div>

    </div>

  );

}

export default ProfileHero;