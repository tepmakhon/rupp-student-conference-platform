export default function Pagination({ page, totalPages, onPageChange }) {
  if (!Number.isInteger(totalPages) || totalPages <= 1) return null;
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => start + index);
  return <nav aria-label="Pagination" className="flex flex-wrap justify-center items-center gap-2 mt-8">
    <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="px-3 py-2 rounded-xl border disabled:opacity-40">Previous</button>
    {start > 1 && <span aria-hidden="true">…</span>}
    {pages.map((number) => <button key={number} type="button" aria-label={`Page ${number}`} aria-current={page === number ? "page" : undefined}
      onClick={() => onPageChange(number)} className={`px-3 py-2 rounded-xl ${page === number ? "bg-primary text-white" : "border"}`}>{number}</button>)}
    {pages.at(-1) < totalPages && <span aria-hidden="true">…</span>}
    <button type="button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="px-3 py-2 rounded-xl border disabled:opacity-40">Next</button>
    <span className="w-full text-center text-sm text-gray-500">Page {page} of {totalPages}</span>
  </nav>;
}
