import {

  SparklesIcon,

  CalendarDaysIcon,

  BriefcaseIcon,

  BookmarkIcon,

} from "@heroicons/react/24/outline";

function ProfileStatistics({

  profile,

}) {

  const statistics = [

    {

      title:

      "Activity Score",

      value:

      profile?.student

      ?.activityScore ?? 0,

      icon:

      SparklesIcon,

    },

    {

      title:

      "Registrations",

      value:

      profile?.statistics

      ?.totalRegistrations ?? 0,

      icon:

      CalendarDaysIcon,

    },

    {

      title:

      "Applications",

      value:

      profile?.statistics

      ?.totalApplications ?? 0,

      icon:

      BriefcaseIcon,

    },

    {

      title:

      "Saved",

      value:

      profile?.statistics

      ?.savedOpportunities ?? 0,

      icon:

      BookmarkIcon,

    },

  ];

  return (

    <div

      className="

        grid

        md:grid-cols-2

        lg:grid-cols-4

        gap-6

      "

    >

      {

        statistics.map(

          item => {

            const Icon =

            item.icon;

            return (

              <div

                key={

                  item.title

                }

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

                  "

                >

                  <div>

                    <p

                      className="

                        text-sm

                        text-gray-500

                      "

                    >

                      {

                        item.title

                      }

                    </p>

                    <h2

                      className="

                        text-4xl

                        font-bold

                        text-primary

                        mt-3

                      "

                    >

                      {

                        item.value

                      }

                    </h2>

                  </div>

                  <div

                    className="

                      w-14

                      h-14

                      rounded-2xl

                      bg-primary/10

                      flex

                      items-center

                      justify-center

                    "

                  >

                    <Icon

                      className="

                        w-8

                        h-8

                        text-primary

                      "

                    />

                  </div>

                </div>

              </div>

            );

          }

        )

      }

    </div>

  );

}

export default ProfileStatistics;