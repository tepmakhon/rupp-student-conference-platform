import { TrophyIcon } from "@heroicons/react/24/solid";

function LeaderboardTopThree({ students = [] }) {
  const topStudents = students.slice(0, 3);

  return (
    <div
      className="

        grid

        md:grid-cols-3

        gap-6

        mb-8

      "
    >
      {topStudents.map((student) => (
        <div
          key={student.id}

          className="

                bg-white

                rounded-3xl

                border

                shadow-sm

                p-6

                text-center

              "
        >
          <TrophyIcon
            className="

                  w-10

                  h-10

                  mx-auto

                  text-yellow-500

                  mb-4

                "
          />

          <h3
            className="

                  font-bold

                  text-xl

                "
          >
            {student.fullName}
          </h3>

          <p
            className="

                  text-gray-500

                  mt-1

                "
          >
            {student.university}
          </p>

          <p
            className="

                  mt-4

                  text-3xl

                  font-bold

                  text-primary

                "
          >
            {student.activityScore}
          </p>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardTopThree;
