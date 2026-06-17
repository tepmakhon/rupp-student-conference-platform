import {

  useEffect,

  useState,

} from "react";

import DashboardLayout
from "../../components/layouts/DashboardLayout";

import DashboardHeader
from "../../components/dashboard/DashboardHeader";

import DashboardLoading
from "../../components/dashboard/DashboardLoading";

import DashboardError
from "../../components/dashboard/DashboardError";

import {

  getLeaderboard,

} from "../../api/leaderboardApi";

function LeaderboardPage() {

  const [

    students,

    setStudents,

  ] = useState([]);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    error,

    setError,

  ] = useState(null);

  useEffect(() => {

    loadLeaderboard();

  }, []);

  const loadLeaderboard =
    async () => {

      try {

        setLoading(true);

        setError(null);

        const data =

          await getLeaderboard();

        setStudents(

          data.students || []

        );

      } catch (error) {

        console.error(
          error
        );

        setError(

          "Failed to load leaderboard"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <DashboardLayout>

      <div

        className="

          max-w-7xl

          mx-auto

        "

      >

        <DashboardHeader

          title="Leaderboard"

          subtitle="Top active students on the platform."

          buttonText="Refresh"

          onClick={

            loadLeaderboard

          }

          loading={

            loading

          }

        />

        {

          loading && (

            <DashboardLoading

              text="Loading leaderboard..."

            />

          )

        }

        {

          error && (

            <DashboardError

              message={error}

            />

          )

        }

        {

          !loading &&

          !error && (

            <div

              className="

                bg-white

                rounded-2xl

                shadow-md

                overflow-hidden

              "

            >

              <table

                className="

                  w-full

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

                      Score

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

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

                          "

                        >

                          <td

                            className="

                              p-4

                              font-bold

                            "

                          >

                            #

                            {

                              student.rank

                            }

                          </td>

                          <td

                            className="

                              p-4

                            "

                          >

                            {

                              student.fullName

                            }

                          </td>

                          <td

                            className="

                              p-4

                            "

                          >

                            {

                              student.university

                            }

                          </td>

                          <td

                            className="

                              p-4

                            "

                          >

                            {

                              student.faculty

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

                            }

                          </td>

                        </tr>

                      )

                    )

                  }

                </tbody>

              </table>

            </div>

          )

        }

      </div>

    </DashboardLayout>

  );

}

export default LeaderboardPage;