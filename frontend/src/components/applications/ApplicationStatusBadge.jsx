function ApplicationStatusBadge({ status }) {
  const styles = {
    PENDING: "bg-gray-100 text-gray-700",

    REVIEWING: "bg-yellow-100 text-yellow-700",

    ACCEPTED: "bg-green-100 text-green-700",

    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`

        px-4

        py-2

        rounded-full

        text-sm

        font-semibold

        ${styles[status]}

      `}
    >
      {status}
    </span>
  );
}

export default ApplicationStatusBadge;
