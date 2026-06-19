import {

  Trophy,

  Medal,

  Award,

} from "lucide-react";

function LeaderboardTable({

  students = [],

}) {

  const getRankIcon =

    (rank) => {

      if (rank === 1) {

        return (

          <Trophy

            size={20}

            className="text-yellow-500"

          />

        );

      }

      if (rank === 2) {

        return (

          <Medal

            size={20}

            className="text-gray-500"

          />

        );

      }

      if (rank === 3) {

        return (

          <Award

            size={20}

            className="text-orange-500"

          />

        );

      }

      return rank;

    };

  return (

    <div

      className="

        overflow-x-auto

        bg-white

        rounded-2xl

        shadow-md

      "

    >

      <table

        className="

          w-full

        "

      >

        <thead>

          <tr

            className="

              bg-gray-100

            "

          >

            <th

              className="

                p-4

                text-left

              "

            >

              Rank

            </th>

            <th

              className="

                p-4

                text-left

              "

            >

              Student

            </th>

            <th

              className="

                p-4

                text-left

              "

            >

              University

            </th>

            <th

              className="

                p-4

                text-left

              "

            >

              Faculty

            </th>

            <th

              className="

                p-4

                text-left

              "

            >

              Points

            </th>

          </tr>

        </thead>

        <tbody>

          {

            students.length === 0

            ? (

              <tr>

                <td

                  colSpan={5}

                  className="

                    p-10

                    text-center

                    text-gray-500

                  "

                >

                  No leaderboard data

                </td>

              </tr>

            )

            : (

              students.map(

                (

                  student,

                  index

                ) => (

                  <tr

                    key={

                      student.id

                    }

                    className="

                      border-t

                    "

                  >

                    <td

                      className="

                        p-4

                      "

                    >

                      <div

                        className="

                          flex

                          items-center

                          gap-2

                        "

                      >

                        {

                          getRankIcon(

                            index + 1

                          )

                        }

                      </div>

                    </td>

                    <td

                      className="

                        p-4

                      "

                    >

                      {

                        student.user

                        ?.profile

                        ?.fullName

                        ||

                        "N/A"

                      }

                    </td>

                    <td

                      className="

                        p-4

                      "

                    >

                      {

                        student.university

                        ?.universityName

                        ||

                        "N/A"

                      }

                    </td>

                    <td

                      className="

                        p-4

                      "

                    >

                      {

                        student.faculty

                        ?.facultyName

                        ||

                        "N/A"

                      }

                    </td>

                    <td

                      className="

                        p-4

                        font-bold

                        text-primary

                      "

                    >

                      {

                        student.activityScore

                        ?? 0

                      }

                    </td>

                  </tr>

                )

              )

            )

          }

        </tbody>

      </table>

    </div>

  );

}

export default LeaderboardTable;