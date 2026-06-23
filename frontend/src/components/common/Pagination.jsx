function Pagination({

  page,

  totalPages,

  setPage,

}) {

  return (

    <div

      className="

        flex

        justify-center

        gap-4

      "

    >

      <button

        disabled={

          page === 1

        }

        onClick={() =>

          setPage(

            page - 1

          )

        }

        className="

          border

          px-4

          py-2

          rounded-xl

          disabled:opacity-50

        "

      >

        Previous

      </button>

      <span>

        {

          page

        }

        /

        {

          totalPages

        }

      </span>

      <button

        disabled={

          page === totalPages

        }

        onClick={() =>

          setPage(

            page + 1

          )

        }

        className="

          border

          px-4

          py-2

          rounded-xl

          disabled:opacity-50

        "

      >

        Next

      </button>

    </div>

  );

}

export default Pagination;