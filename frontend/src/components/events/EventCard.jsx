import {

  Link,

} from "react-router-dom";

import {

  MapPin,

  Calendar,

  Tag,

} from "lucide-react";

function EventCard({

  event,

  children,

}) {

  return (

    <div

      className="

        bg-white

        rounded-2xl

        shadow-md

        p-6

      "

    >

      <div

        className="

          flex

          flex-col

          gap-5

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

            {

              event.title

            }

          </h2>

          <p

            className="

              text-gray-500

              mt-1

            "

          >

            {

              event.organization

              ?.organizationName

            }

          </p>

        </div>

        <p

          className="

            text-gray-600

          "

        >

          {

            event.description

          }

        </p>

        <div

          className="

            space-y-3

            text-gray-600

          "

        >

          <div

            className="

              flex

              items-center

              gap-2

            "

          >

            <MapPin

              size={18}

            />

            <span>

              {

                event.location

              }

            </span>

          </div>

          <div

            className="

              flex

              items-center

              gap-2

            "

          >

            <Calendar

              size={18}

            />

            <span>

              {

                new Date(

                  event.eventDate

                )

                .toLocaleDateString()

              }

            </span>

          </div>

          {

            event.category && (

              <div

                className="

                  flex

                  items-center

                  gap-2

                "

              >

                <Tag

                  size={18}

                />

                <span>

                  {

                    event.category

                    .categoryName

                  }

                </span>

              </div>

            )

          }

        </div>

        <div

          className="

            flex

            flex-wrap

            gap-3

          "

        >

          <Link

            to={`/events/${event.id}`}

            className="

              bg-primary

              hover:bg-secondary

              text-white

              px-4

              py-2

              rounded-xl

              transition

            "

          >

            View Details

          </Link>

          {children}

        </div>

      </div>

    </div>

  );

}

export default EventCard;