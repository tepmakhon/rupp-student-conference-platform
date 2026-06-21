import {

  BellIcon,

  EnvelopeOpenIcon,

  EnvelopeIcon,

  CalendarDaysIcon,

} from "@heroicons/react/24/outline";

function NotificationStats({

  notifications = [],

}) {

  const total =

    notifications.length;

  const unread =

    notifications.filter(

      notification =>

      !notification.isRead

    ).length;

  const read =

    total - unread;

  const today =

    notifications.filter(

      notification => {

        const createdDate =

          new Date(

            notification.notification

            ?.createdAt ||

            notification.createdAt

          );

        const now =

          new Date();

        return (

          createdDate

          .toDateString()

          ===

          now.toDateString()

        );

      }

    ).length;

  const stats = [

    {

      title:

      "Total",

      value:

      total,

      icon:

      BellIcon,

    },

    {

      title:

      "Unread",

      value:

      unread,

      icon:

      EnvelopeIcon,

    },

    {

      title:

      "Read",

      value:

      read,

      icon:

      EnvelopeOpenIcon,

    },

    {

      title:

      "Today",

      value:

      today,

      icon:

      CalendarDaysIcon,

    },

  ];

  return (

    <div

      className="

        grid

        md:grid-cols-2

        xl:grid-cols-4

        gap-6

      "

    >

      {

        stats.map(

          stat => (

            <div

              key={

                stat.title

              }

              className="

                bg-white

                rounded-3xl

                shadow-md

                p-6

              "

            >

              <div

                className="

                  flex

                  items-center

                  justify-between

                "

              >

                <div>

                  <p

                    className="

                      text-gray-500

                      text-sm

                    "

                  >

                    {

                      stat.title

                    }

                  </p>

                  <h3

                    className="

                      text-3xl

                      font-bold

                      text-primary

                      mt-2

                    "

                  >

                    {

                      stat.value

                    }

                  </h3>

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

                  <stat.icon

                    className="

                      w-7

                      h-7

                      text-primary

                    "

                  />

                </div>

              </div>

            </div>

          )

        )

      }

    </div>

  );

}

export default NotificationStats;