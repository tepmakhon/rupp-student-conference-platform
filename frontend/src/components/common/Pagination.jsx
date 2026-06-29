function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div
      className="
        flex
        justify-center
        items-center
        gap-2
        mt-10
      "
    >
      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="
          px-4
          py-2
          rounded-xl
          border
          disabled:opacity-40
        "
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => (
          <button
            key={index}
            onClick={() =>
              onPageChange(index + 1)
            }
            className={`
              px-4
              py-2
              rounded-xl
              ${
                page === index + 1
                  ? "bg-primary text-white"
                  : "border"
              }
            `}
          >
            {index + 1}
          </button>
        )
      )}

      <button
        disabled={
          page === totalPages
        }
        onClick={() =>
          onPageChange(page + 1)
        }
        className="
          px-4
          py-2
          rounded-xl
          border
          disabled:opacity-40
        "
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;