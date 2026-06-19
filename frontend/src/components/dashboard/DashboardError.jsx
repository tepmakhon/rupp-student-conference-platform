import {

  ExclamationTriangleIcon,

} from "@heroicons/react/24/outline";

function DashboardError({

  message,

}) {

  return (

    <div

      className="

        bg-red-50

        border

        border-red-200

        rounded-2xl

        p-6

        flex

        items-center

        gap-4

      "

    >

      <ExclamationTriangleIcon

        className="

          w-7

          h-7

          text-red-600

        "

      />

      <div>

        <h3

          className="

            font-semibold

            text-red-700

          "

        >

          Something went wrong

        </h3>

        <p

          className="

            text-red-500

          "

        >

          {message}

        </p>

      </div>

    </div>

  );

}

export default DashboardError;