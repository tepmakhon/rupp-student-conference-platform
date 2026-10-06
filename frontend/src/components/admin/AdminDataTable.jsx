import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Input from "../ui/Input";
import ResponsiveTable from "../common/ResponsiveTable";
import LoadingState from "../common/LoadingState";

export default function AdminDataTable({ columns, data, loading = false, search = "", setSearch, onEdit, onDelete }) {
  const tableColumns = [...columns];
  if (onEdit || onDelete) tableColumns.push({
    key: "actions", label: "Actions", render: (item) => <div className="flex gap-3">
      {onEdit && <button type="button" aria-label="Edit record" onClick={() => onEdit(item)} className="p-2 rounded-lg hover:bg-blue-100">
        <PencilSquareIcon className="w-5 h-5 text-blue-600" />
      </button>}
      {onDelete && <button type="button" aria-label="Delete record" onClick={() => onDelete(item)} className="p-2 rounded-lg hover:bg-red-100">
        <TrashIcon className="w-5 h-5 text-red-600" />
      </button>}
    </div>,
  });
  return <div className="space-y-6">
    {setSearch && <div className="max-w-md"><Input aria-label="Search records" value={search} placeholder="Search..." onChange={(event) => setSearch(event.target.value)} /></div>}
    {loading ? <LoadingState /> : <ResponsiveTable columns={tableColumns} data={data} />}
  </div>;
}
