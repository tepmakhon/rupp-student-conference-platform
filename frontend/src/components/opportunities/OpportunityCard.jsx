import {

  BriefcaseIcon,

  CalendarDaysIcon,

} from "@heroicons/react/24/outline";

import {

  Link,

} from "react-router-dom";

import {

  formatDate,

} from "../../utils/formatDate";

function OpportunityCard({

  opportunity,

}) {

  return (

    <div

      className="

        bg-white

        rounded-2xl

        border

        shadow-sm

        overflow-hidden

        hover:shadow-lg

        transition

      "

    >

      <img

        src={

          opportunity.coverImageUrl

          ||

          "https://placehold.co/800x400?text=Opportunity"

        }

        alt={

          opportunity.title

        }

        className="

          w-full

          h-56

          object-cover

        "

      />

      <div

        className="

          p-6

        "

      >

        <span

          className="

            inline-flex

            items-center

            gap-2

            px-3

            py-1

            rounded-full

            bg-secondary/10

            text-secondary

            text-sm

          "

        >

          <BriefcaseIcon

            className="

              w-4

              h-4

            "

          />

          {

            opportunity.type

            ?.typeName

            ||

            "Opportunity"

          }

        </span>

        <h2

          className="

            text-xl

            font-bold

            text-primary

            mt-4

          "

        >

          {

            opportunity.title

          }

        </h2>

        <p

          className="

            text-gray-600

            mt-3

            line-clamp-3

          "

        >

          {

            opportunity.description

          }

        </p>

        <div

          className="

            flex

            items-center

            gap-2

            text-gray-500

            mt-5

          "

        >

          <CalendarDaysIcon

            className="

              w-5

              h-5

            "

          />

          {

            opportunity.deadline

            ?

            formatDate(

              opportunity.deadline

            )

            :

            "No deadline"

          }

        </div>

        <Link

          to={`/opportunities/${opportunity.id}`}

          className="

            inline-flex

            items-center

            justify-center

            mt-6

            bg-primary

            hover:bg-secondary

            text-white

            px-5

            py-3

            rounded-xl

            transition

          "

        >

          View Details

        </Link>

      </div>

    </div>

  );

}

export default OpportunityCard;