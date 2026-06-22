import {
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

function ProfileCompletion({
  profile,
}) {
  let completed = 0;
  let total = 7;
  if (
    profile?.profile
    ?.fullName
  )
    completed++;
  if (
    profile?.profile
    ?.phoneNumber
  )
    completed++;
  if (
    profile?.profile
    ?.gender
  )
    completed++;
  if (
    profile?.profile
    ?.dateOfBirth
  )
    completed++;
  if (
    profile?.profile
    ?.bio
  )
    completed++;
  if (
    profile?.profile
    ?.profileImageUrl
  )
    completed++;
  if (
    profile?.student
    ?.academicYear
  )
    completed++;


  const percentage =

  Math.round(
    (
      completed /
      total
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
          items-center
          mb-5
        "
      >
        <div>
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <CheckBadgeIcon
              className="
                w-7
                h-7
                text-primary
              "
            />
            <h3
              className="
                text-2xl
                font-bold
                text-primary
              "
            >
              Profile Completion
            </h3>
          </div>
          <p
            className="
              text-gray-500

              text-sm
              mt-2
            "
          >
            Complete your profile for better recommendations
          </p>
        </div>
        <div
          className="
            text-4xl
            font-bold
            text-primary
          "
        >
          {percentage}%
        </div>
      </div>
      <div
        className="
          w-full
          h-4
          bg-gray-200
          rounded-full
        "
      >
        <div
          style={{
            width:
            `${percentage}%`,
          }}
          className="
            h-4
            rounded-full
            bg-secondary
            transition-all
          "
        />
      </div>
    </div>
  );
}

export default ProfileCompletion;