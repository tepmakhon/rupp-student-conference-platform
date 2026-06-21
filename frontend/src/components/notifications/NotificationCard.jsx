import {

  BellAlertIcon,

  CheckCircleIcon,

} from "@heroicons/react/24/outline";

import {

  formatDate,

} from "../../utils/formatDate";

function NotificationCard({

  notification,

  onRead,

}) {

  const isUnread =

    !notification.isRead;

  return (

    <div

      onClick={() =>

        isUnread &&

        onRead(

          notification.id

        )

      }

      className={`

        bg-white

        rounded-3xl

        shadow-md

        p-6

        cursor-pointer

        transition

        hover:shadow-lg

        border

        ${

          isUnread

          ?

          "border-primary/20 bg-green-50"

          :

          "border-transparent"

        }

      `}

    >

      <div

        className="

          flex

          items-start

          gap-5

        "

      >

        {/* Icon */}

        <div

          className="

            w-14

            h-14

            rounded-2xl

            bg-primary/10

            flex

            items-center

            justify-center

            flex-shrink-0

          "

        >

          <BellAlertIcon

            className="

              w-7

              h-7

              text-primary

            "

          />

        </div>

        {/* Content */}

        <div

          className="

            flex-1

          "

        >

          <div

            className="

              flex

              justify-between

              items-start

              gap-4

            "

          >

            <div>

              <h3

                className="

                  text-lg

                  font-bold

                  text-gray-800

                "

              >

                {

                  notification

                  .notification

                  ?.title ||

                  "Notification"

                }

              </h3>

              <p

                className="

                  text-gray-600

                  mt-2

                "

              >

                {

                  notification

                  .notification

                  ?.message ||

                  "-"

                }

              </p>

            </div>

            {

              isUnread && (

                <CheckCircleIcon

                  className="

                    w-6

                    h-6

                    text-primary

                    flex-shrink-0

                  "

                />

              )

            }

          </div>

          <div

            className="

              mt-4

            "

          >

            <p

              className="

                text-sm

                text-gray-400

              "

            >

              {

                formatDate(

                  notification

                  .notification

                  ?.createdAt ||

                  notification

                  .createdAt

                )

              }

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default NotificationCard;