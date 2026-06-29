import {
  DocumentArrowDownIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

function ExportButtons() {
  return (
    <div
      className="
        flex
        gap-4
      "
    >
      <button
        className="
          flex
          items-center
          gap-2
          px-6
          py-3
          rounded-2xl
          bg-primary
          text-white
        "
      >
        <DocumentArrowDownIcon
          className="
            w-5
            h-5
          "
        />
        Export PDF
      </button>

      <button
        className="
          flex
          items-center
          gap-2
          px-6
          py-3
          rounded-2xl
          bg-green-600
          text-white
        "
      >
        <TableCellsIcon
          className="
            w-5
            h-5
          "
        />
        Export Excel
      </button>
    </div>
  );
}

export default ExportButtons;
