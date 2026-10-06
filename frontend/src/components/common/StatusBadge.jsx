import { getStatusStyle } from "../../constants/statusStyles";
function StatusBadge({ status }) {
  return (
    <span
      className={`

        px-3

        py-1

        rounded-full

        text-xs

        font-medium

        ${getStatusStyle(status)}

      `}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
