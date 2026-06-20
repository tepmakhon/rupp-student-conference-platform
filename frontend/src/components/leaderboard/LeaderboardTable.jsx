import {

  Trophy,

  Medal,

  Award,

} from "lucide-react";

function LeaderboardTable({

  students = [],

}) {

  const getRankIcon = (

    rank

  ) => {

    if (rank === 1) {

      return (

        <Trophy

          size={20}

          className="

            text-yellow-500

          "

        />

      );

    }

    if (rank === 2) {

      return (

        <Medal

          size={20}

          className="

            text-gray-500

          "

        />

      );

    }

    if (rank === 3) {

      return (

        <Award

          size={20}

          className="

            text-orange-500

          "

        />

      );

    }

    return (

      <span>

        {rank}

      </span>

    );

  };

  return (

    <div

      className="

        bg-white

        rounded-3xl

        shadow-sm

        border

        overflow-x-auto

      "

    >

      <table

        className="

          w-full

          min-w-[900px]

        "

      >

        <thead

          className="

            bg-primary

            text-white

          "

        >

          <tr>

            <th

              className="

                p-5

                text-left

              "

            >

              Rank

            </th>

            <th

              className="

                p-5

                text-left

              "

            >

              Student

            </th>

            <th

              className="

                p-5

                text-left

              "

            >

              University

            </th>

            <th

              className="

                p-5

                text-left

              "

            >

              Faculty

            </th>

            <th

              className="

                p-5

                text-left

              "

            >

              Major

            </th>

            <th

              className="

                p-5

                text-left

              "

            >

              Score

            </th>

          </tr>

        </thead>

        <tbody>

          {

            students.length === 0

            ? (

              <tr>

                <td

                  colSpan={6}

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

                  student

                ) => (

                  <tr

                    key={

                      student.id

                    }

                    className="

                      border-b

                      hover:bg-gray-50

                      transition

                    "

                  >

                    <td

                      className="

                        p-5

                      "

                    >

                      <div

                        className="

                          flex

                          items-center

                          gap-3

                          font-bold

                        "

                      >

                        {

                          getRankIcon(

                            student.rank

                          )

                        }

                      </div>

                    </td>

                    <td

                      className="

                        p-5

                        font-semibold

                      "

                    >

                      {

                        student.fullName

                      }

                    </td>

                    <td

                      className="

                        p-5

                      "

                    >

                      {

                        student.university

                      }

                    </td>

                    <td

                      className="

                        p-5

                      "

                    >

                      {

                        student.faculty

                      }

                    </td>

                    <td

                      className="

                        p-5

                      "

                    >

                      {

                        student.major

                      }

                    </td>

                    <td

                      className="

                        p-5

                        font-bold

                        text-primary

                      "

                    >

                      {

                        student.activityScore

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