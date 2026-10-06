import { getStatusStyle } from "../../constants/statusStyles";
function ApplicationStatusBadge({ status }) {
  return (
    <span
      className={`

        px-4

        py-2

        rounded-full

        text-sm

        font-semibold

        ${getStatusStyle(status)}

      `}
    >
      {status}
    </span>
  );
}

export default ApplicationStatusBadge;
