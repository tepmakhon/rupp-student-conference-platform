function AdminPageHeader({
  title,

  description,

  onAdd,

  addLabel = "Add New",
}) {
  return (
    <div
      className="

        flex

        flex-col

        md:flex-row

        md:justify-between

        md:items-center

        gap-4

        mb-8

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
          {description}
        </p>
      </div>

      <button
        onClick={onAdd}

        className="

          bg-primary

          hover:bg-secondary

          text-white

          px-5

          py-3

          rounded-xl

          transition

        "
      >
        {addLabel}
      </button>
    </div>
  );
}

export default AdminPageHeader;
