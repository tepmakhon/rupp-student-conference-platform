function RoleSelector({
  role,

  setRole,
}) {
  return (
    <div
      className="

        grid

        grid-cols-2

        gap-4

      "
    >
      <button
        type="button"

        onClick={() => setRole("STUDENT")}

        className={`

          p-4

          rounded-2xl

          border-2

          font-semibold

          transition

          ${
            role === "STUDENT"
              ? "border-primary bg-primary text-white"
              : "border-gray-300"
          }

        `}
      >
        Student
      </button>

      <button
        type="button"

        onClick={() => setRole("ORGANIZATION")}

        className={`

          p-4

          rounded-2xl

          border-2

          font-semibold

          transition

          ${
            role === "ORGANIZATION"
              ? "border-primary bg-primary text-white"
              : "border-gray-300"
          }

        `}
      >
        Organization
      </button>
    </div>
  );
}

export default RoleSelector;
