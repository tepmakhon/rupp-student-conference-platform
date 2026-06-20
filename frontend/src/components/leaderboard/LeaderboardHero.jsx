import {

  TrophyIcon,

  StarIcon,

  AcademicCapIcon,

} from "@heroicons/react/24/solid";

function LeaderboardHero({

  students = [],

}) {

  const topThree =

  students.slice(0,3);

  const cards = [

    {

      title:

      "Champion",

      icon:

      TrophyIcon,

    },

    {

      title:

      "Second Place",

      icon:

      StarIcon,

    },

    {

      title:

      "Third Place",

      icon:

      AcademicCapIcon,

    },

  ];

  return (

    <div

      className="

        grid

        md:grid-cols-3

        gap-6

      "

    >

      {

        topThree.map(

          (

            student,

            index

          ) => {

            const Icon =

            cards[index]

            ?.icon;

            return (

              <div

                key={

                  student.id

                }

                className="

                  bg-white

                  rounded-3xl

                  border

                  shadow-sm

                  p-8

                "

              >

                <div

                  className="

                    flex

                    justify-between

                    items-start

                    mb-6

                  "

                >

                  <h3

                    className="

                      font-bold

                      text-primary

                    "

                  >

                    {

                      cards[index]

                      ?.title

                    }

                  </h3>

                  <Icon

                    className="

                      w-8

                      h-8

                      text-secondary

                    "

                  />

                </div>

                <h2

                  className="

                    text-2xl

                    font-bold

                  "

                >

                  {

                    student.fullName

                  }

                </h2>

                <p

                  className="

                    text-gray-500

                    mt-2

                  "

                >

                  {

                    student.university

                  }

                </p>

                <div

                  className="

                    mt-6

                  "

                >

                  <span

                    className="

                      text-4xl

                      font-bold

                      text-primary

                    "

                  >

                    {

                      student.activityScore

                    }

                  </span>

                </div>

              </div>

            );

          }

        )

      }

    </div>

  );

}

export default LeaderboardHero;