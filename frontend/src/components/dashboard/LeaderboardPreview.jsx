import {
  useEffect,
  useState,
} from "react";

import {
  TrophyIcon,
} from "@heroicons/react/24/outline";

import {
  Link,
} from "react-router-dom";

import {
  getLeaderboard,
} from "../../api/leaderboardApi";

function LeaderboardPreview() {

  const [
    students,

    setStudents,

  ] = useState([]);

  const [
    loading,

    setLoading,

  ] = useState(true);

  useEffect(() => {

    loadLeaderboard();

  }, []);

  const loadLeaderboard =
  async () => {

    try {

      const data =

      await getLeaderboard(
        1,
        5
      );

      setStudents(

        data.students || []

      );

    }

    catch (error) {

      console.error(
        error
      );

    }

    finally {

      setLoading(
        false
      );

    }

  };

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
          mb-6
        "

      >

        <div

          className="
            flex
            items-center
            gap-3
          "

        >

          <TrophyIcon

            className="
              w-7
              h-7
              text-yellow-500
            "

          />

          <h3

            className="
              text-2xl
              font-bold
              text-primary
            "

          >

            Top Students

          </h3>

        </div>

        <Link

          to="/leaderboard"

          className="
            font-semibold
            text-primary
          "

        >

          View All

        </Link>

      </div>

      {loading && (

        <p>

          Loading...

        </p>

      )}

      {!loading && (

        <div

          className="
            space-y-4
          "

        >

          {students.map(

            student => (

              <div

                key={student.id}

                className="
                  flex
                  justify-between
                  items-center
                  border-b
                  pb-4
                "

              >

                <div

                  className="
                    flex
                    items-center
                    gap-4
                  "

                >

                  <div

                    className="
                      w-12
                      h-12

                      rounded-full

                      bg-secondary

                      text-white

                      font-bold

                      flex

                      items-center

                      justify-center
                    "

                  >

                    {student.rank}

                  </div>

                  <div>

                    <p

                      className="
                        font-semibold
                      "

                    >

                      {student.fullName}

                    </p>

                    <p

                      className="
                        text-sm
                        text-gray-500
                      "

                    >

                      {student.faculty}

                    </p>

                  </div>

                </div>

                <span

                  className="
                    font-bold
                    text-primary
                  "

                >

                  {student.activityScore}

                </span>

              </div>

            )

          )}

        </div>

      )}

    </div>

  );

}

export default LeaderboardPreview;