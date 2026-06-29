import { AcademicCapIcon } from "@heroicons/react/24/outline";

function ProfileSkills({ skills = [] }) {
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

          items-center

          gap-3

          mb-8

        "
      >
        <AcademicCapIcon
          className="

            w-8

            h-8

            text-primary

          "
        />

        <h2
          className="

            text-2xl

            font-bold

            text-primary

          "
        >
          Skills
        </h2>
      </div>

      {skills.length === 0 ? (
        <div
          className="

              text-center

              py-12

              text-gray-500

            "
        >
          No skills added yet
        </div>
      ) : (
        <div
          className="

              flex

              flex-wrap

              gap-4

            "
        >
          {skills.map((skill) => (
            <div
              key={skill.skill.id}

              className="

                      px-5

                      py-3

                      rounded-2xl

                      bg-primary/10

                      text-primary

                      font-semibold

                    "
            >
              {skill.skill.skillName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileSkills;
