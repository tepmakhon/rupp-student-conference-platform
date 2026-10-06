import { getStatusStyle } from "../../constants/statusStyles";
function MyEventStatus({ status }) {
  return (
    <span
      className={`

        inline-block

        px-3

        py-1

        rounded-full

        text-sm

        font-medium

        ${getStatusStyle(status)}

      `}
    >
      {status}
    </span>
  );
}

export default MyEventStatus;
