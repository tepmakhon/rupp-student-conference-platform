import {

  BellIcon,

} from "@heroicons/react/24/outline";

function NotificationHero({

  total = 0,

  unread = 0,

}) {

  return (

    <div

      className="

        bg-white

        rounded-3xl

        shadow-md

        p-8

      "

    >

      <div

        className="

          flex

          flex-col

          lg:flex-row

          lg:items-center

          lg:justify-between

          gap-6

        "

      >

        <div

          className="

            flex

            items-center

            gap-5

          "

        >

          <div

            className="

              w-16

              h-16

              rounded-2xl

              bg-primary/10

              flex

              items-center

              justify-center

            "

          >

            <BellIcon

              className="

                w-8

                h-8

                text-primary

              "

            />

          </div>

          <div>

            <h1

              className="

                text-4xl

                font-bold

                text-primary

              "

            >

              Notifications

            </h1>

            <p

              className="

                text-gray-500

                mt-2

              "

            >

              Stay updated with events, opportunities and system announcements.

            </p>

          </div>

        </div>

        <div

          className="

            flex

            gap-8

          "

        >

          <div

            className="

              text-center

            "

          >

            <h3

              className="

                text-3xl

                font-bold

                text-primary

              "

            >

              {total}

            </h3>

            <p

              className="

                text-gray-500

              "

            >

              Total

            </p>

          </div>

          <div

            className="

              text-center

            "

          >

            <h3

              className="

                text-3xl

                font-bold

                text-red-500

              "

            >

              {unread}

            </h3>

            <p

              className="

                text-gray-500

              "

            >

              Unread

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default NotificationHero;