import {

  ChevronLeftIcon,

  ChevronRightIcon,

} from "@heroicons/react/24/outline";

function NotificationPagination({

  pagination,

  onPageChange,

}) {

  const {

    page,

    totalPages,

  } = pagination;

  if (

    totalPages <= 1

  ) {

    return null;

  }

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

          items-center

          justify-between

        "

      >

        <button

          type="button"

          disabled={

            page === 1

          }

          onClick={() =>

            onPageChange(

              page - 1

            )

          }

          className="

            flex

            items-center

            gap-2

            px-5

            py-3

            rounded-2xl

            border

            disabled:opacity-50

            disabled:cursor-not-allowed

            hover:bg-gray-50

          "

        >

          <ChevronLeftIcon

            className="

              w-5

              h-5

            "

          />

          Previous

        </button>

        <div

          className="

            text-gray-600

            font-medium

          "

        >

          Page

          {" "}

          {page}

          {" "}

          of

          {" "}

          {totalPages}

        </div>

        <button

          type="button"

          disabled={

            page === totalPages

          }

          onClick={() =>

            onPageChange(

              page + 1

            )

          }

          className="

            flex

            items-center

            gap-2

            px-5

            py-3

            rounded-2xl

            border

            disabled:opacity-50

            disabled:cursor-not-allowed

            hover:bg-gray-50

          "

        >

          Next

          <ChevronRightIcon

            className="

              w-5

              h-5

            "

          />

        </button>

      </div>

    </div>

  );

}

export default NotificationPagination;