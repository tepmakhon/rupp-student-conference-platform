import {

  CalendarDaysIcon,

  MapPinIcon,

} from "@heroicons/react/24/outline";

import {

  formatDate,

} from "../../utils/formatDate";

import MyEventStatus

from "./MyEventStatus";

import MyEventActions

from "./MyEventActions";

function MyEventCard({

  event,

  onDelete,

}) {

  return (

    <div

      className="

        bg-white

        rounded-2xl

        border

        shadow-sm

        p-6

        hover:shadow-lg

        transition

      "

    >

      <div

        className="

          flex

          flex-col

          lg:flex-row

          lg:justify-between

          gap-8

        "

      >

        <div>

          <h2

            className="

              text-2xl

              font-bold

              text-primary

            "

          >

            {event.title}

          </h2>

          <div

            className="

              flex

              flex-wrap

              gap-5

              mt-5

              text-gray-500

              text-sm

            "

          >

            <div

              className="

                flex

                items-center

                gap-2

              "

            >

              <MapPinIcon

                className="

                  w-5

                  h-5

                "

              />

              {event.location}

            </div>

            <div

              className="

                flex

                items-center

                gap-2

              "

            >

              <CalendarDaysIcon

                className="

                  w-5

                  h-5

                "

              />

              {

                formatDate(

                  event.eventDate

                )

              }

            </div>

          </div>

          <div

            className="

              mt-5

            "

          >

            <MyEventStatus

              status={

                event.status

              }

            />

          </div>

        </div>

        <MyEventActions

          event={

            event

          }

          onDelete={

            onDelete

          }

        />

      </div>

    </div>

  );

}

export default MyEventCard;