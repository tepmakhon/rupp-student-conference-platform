import {
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function ProfileCompletion({

  profile,

}) {

  const fields = [

    profile?.fullName,

    profile?.phoneNumber,

    profile?.gender,

    profile?.dateOfBirth,

    profile?.bio,

    profile?.profileImageUrl,

  ];

  const completed =

    fields.filter(
      Boolean
    ).length;

  const percentage =

    Math.round(

      (
        completed /
        fields.length
      ) * 100

    );

  return (

    <div

      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-6
      "

    >

      <div

        className="
          flex
          justify-between
          items-start
          gap-4
          mb-5
        "

      >

        <div

          className="
            flex
            items-start
            gap-4
          "

        >

          <div

            className="
              w-12
              h-12

              rounded-2xl

              bg-primary/10

              flex

              items-center

              justify-center
            "

          >

            <UserCircleIcon

              className="
                w-7
                h-7
                text-primary
              "

            />

          </div>

          <div>

            <h3

              className="
                text-xl
                font-bold
                text-primary
              "

            >

              Profile Completion

            </h3>

            <p

              className="
                text-sm
                text-gray-500
              "

            >

              Complete your profile to improve recommendations

            </p>

          </div>

        </div>

        <span

          className="
            text-3xl
            font-bold
            text-primary
          "

        >

          {percentage}%

        </span>

      </div>

      <div

        className="
          w-full
          h-3
          bg-gray-200
          rounded-full
          overflow-hidden
        "

      >

        <div

          style={{
            width:
            `${percentage}%`,
          }}

          className="
            h-full
            bg-secondary
            transition-all
            duration-500
          "

        />

      </div>

      <div

        className="
          mt-5
          grid
          grid-cols-2
          md:grid-cols-3
          gap-3
        "

      >

        <StatusItem

          label="Name"

          completed={
            !!profile?.fullName
          }

        />

        <StatusItem

          label="Phone"

          completed={
            !!profile?.phoneNumber
          }

        />

        <StatusItem

          label="Gender"

          completed={
            !!profile?.gender
          }

        />

        <StatusItem

          label="Birthday"

          completed={
            !!profile?.dateOfBirth
          }

        />

        <StatusItem

          label="Bio"

          completed={
            !!profile?.bio
          }

        />

        <StatusItem

          label="Photo"

          completed={
            !!profile?.profileImageUrl
          }

        />

      </div>

    </div>

  );

}

function StatusItem({

  label,

  completed,

}) {

  return (

    <div

      className={`

        rounded-xl

        border

        px-3

        py-2

        text-sm

        font-medium

        text-center

        ${

          completed

          ?

          "bg-green-50 text-green-700 border-green-200"

          :

          "bg-gray-50 text-gray-400 border-gray-200"

        }

      `}

    >

      {label}

    </div>

  );

}

export default ProfileCompletion;