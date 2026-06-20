import {

  MagnifyingGlassIcon,

} from "@heroicons/react/24/outline";

function LeaderboardFilters({

  search,

  setSearch,

}) {

  return (

    <div

      className="

        bg-white

        rounded-3xl

        border

        p-6

      "

    >

      <div

        className="

          relative

        "

      >

        <MagnifyingGlassIcon

          className="

            absolute

            left-4

            top-1/2

            -translate-y-1/2

            w-5

            h-5

            text-gray-400

          "

        />

        <input

          type="text"

          value={search}

          onChange={

            event =>

            setSearch(

              event.target.value

            )

          }

          placeholder="Search student"

          className="

            w-full

            border

            rounded-2xl

            py-3

            pl-12

            pr-4

            outline-none

            focus:ring-2

            focus:ring-primary

          "

        />

      </div>

    </div>

  );

}

export default LeaderboardFilters;