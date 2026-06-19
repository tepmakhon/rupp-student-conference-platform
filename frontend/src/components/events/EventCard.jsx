import {

  CalendarDaysIcon,

  BuildingOffice2Icon,

} from "@heroicons/react/24/outline";

import {

  Link,

} from "react-router-dom";

function EventCard({

  event,

}) {

  return (

    <Link

      to={`/events/${event.id}`}

    >

      <div

        className="

          bg-white

          rounded-2xl

          border

          shadow-sm

          hover:shadow-lg

          overflow-hidden

          transition

          duration-300

        "

      >

        <img

          src={

            event.bannerImageUrl

            ||

            "https://placehold.co/800x400?text=Event"

          }

          alt={

            event.title

          }

          className="

            w-full

            h-52

            object-cover

          "

        />

        <div

          className="

            p-6

            space-y-4

          "

        >

          <h2

            className="

              text-xl

              font-bold

              text-primary

            "

          >

            {event.title}

          </h2>

          <div

            className="

              flex

              items-center

              gap-2

              text-gray-500

            "

          >

            <BuildingOffice2Icon

              className="

                w-5

                h-5

              "

            />

            {

              event.organization

              ?.organizationName

            }

          </div>

          {

            event.eventDate

            &&

            (

              <div

                className="

                  flex

                  items-center

                  gap-2

                  text-gray-500

                "

              >

                <CalendarDaysIcon

                  className="

                    w-5

                    h-5

                  "

                />

                {

                  new Date(

                    event.eventDate

                  ).toLocaleDateString()

                }

              </div>

            )

          }

        </div>

      </div>

    </Link>

  );

}

export default EventCard;