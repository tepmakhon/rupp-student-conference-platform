import {

  FunnelIcon,

} from "@heroicons/react/24/outline";

function NotificationFilters({

  filter,

  setFilter,

}) {

  const filters = [

    "ALL",

    "UNREAD",

    "READ",

  ];

  return (

    <div

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

          flex-col

          md:flex-row

          md:items-center

          md:justify-between

          gap-4

        "

      >

        <div

          className="

            flex

            items-center

            gap-3

          "

        >

          <FunnelIcon

            className="

              w-6

              h-6

              text-primary

            "

          />

          <h3

            className="

              text-xl

              font-bold

              text-primary

            "

          >

            Filters

          </h3>

        </div>

        <div

          className="

            flex

            flex-wrap

            gap-3

          "

        >

          {

            filters.map(

              item => (

                <button

                  key={

                    item

                  }

                  type="button"

                  onClick={() =>

                    setFilter(

                      item

                    )

                  }

                  className={`

                    px-5

                    py-2

                    rounded-2xl

                    font-medium

                    transition

                    ${

                      filter === item

                      ?

                      "bg-primary text-white"

                      :

                      "bg-gray-100 text-gray-700 hover:bg-gray-200"

                    }

                  `}

                >

                  {

                    item

                      .charAt(0)

                      +

                    item

                      .slice(1)

                      .toLowerCase()

                  }

                </button>

              )

            )

          }

        </div>

      </div>

    </div>

  );

}

export default NotificationFilters;