import EmptyState from "./EmptyState";

export default function ResponsiveTable({ columns, data, emptyTitle = "No records found" }) {
  if (!data.length) return <EmptyState title={emptyTitle} />;
  const value = (column, row) => column.render ? column.render(row) : row[column.key];
  return <>
    <div className="hidden md:block overflow-x-auto rounded-2xl border bg-white">
      <table className="w-full text-left">
        <thead className="bg-gray-50"><tr>{columns.map((column) => <th scope="col" key={column.key} className="p-4 font-semibold">{column.label}</th>)}</tr></thead>
        <tbody>{data.map((row) => <tr key={row.id} className="border-t">{columns.map((column) => <td key={column.key} className="p-4 break-words">{value(column, row)}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <div className="grid gap-4 md:hidden">
      {data.map((row) => <dl key={row.id} className="rounded-2xl border bg-white p-5 space-y-3">
        {columns.map((column) => <div key={column.key}><dt className="text-sm text-gray-500">{column.label}</dt><dd className="break-words">{value(column, row)}</dd></div>)}
      </dl>)}
    </div>
  </>;
}
