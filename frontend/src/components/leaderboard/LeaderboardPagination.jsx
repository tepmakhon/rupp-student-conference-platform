function LeaderboardPagination({
  page,

  totalPages,

  onPageChange,
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
        disabled={page === 1}

        onClick={() => onPageChange(page - 1)}

        className="

          px-5

          py-2

          rounded-xl

          border

        "
      >
        Previous
      </button>

      <span
        className="

          font-semibold

          flex

          items-center

        "
      >
        {page}/{totalPages}
      </span>

      <button
        disabled={page === totalPages}

        onClick={() => onPageChange(page + 1)}

        className="

          px-5

          py-2

          rounded-xl

          border

        "
      >
        Next
      </button>
    </div>
  );
}

export default LeaderboardPagination;
