import {

  ArrowPathIcon,

} from "@heroicons/react/24/outline";

function DashboardHeader({

  title,

  subtitle,

  loading,

  onRefresh,

}) {

  return (

    <div

      className="

        flex

        flex-col

        md:flex-row

        md:justify-between

        md:items-center

        gap-5

        mb-10

      "

    >

      <div>

        <h1

          className="

            text-4xl

            font-bold

            text-primary

          "

        >

          {title}

        </h1>

        <p

          className="

            text-gray-500

            mt-2

          "

        >

          {subtitle}

        </p>

      </div>

      <button

        onClick={

          onRefresh

        }

        disabled={

          loading

        }

        className="

          inline-flex

          items-center

          gap-2

          bg-primary

          hover:bg-secondary

          text-white

          px-5

          py-3

          rounded-xl

          transition

          disabled:opacity-50

        "

      >

        <ArrowPathIcon

          className="

            w-5

            h-5

          "

        />

        Refresh

      </button>

    </div>

  );

}

export default DashboardHeader;