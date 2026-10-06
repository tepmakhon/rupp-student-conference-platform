export default function LoadingState({ message = "Loading..." }) {
  return <div role="status" aria-live="polite" className="py-10 space-y-6">
    <p className="text-center text-gray-500">{message}</p>
    <div aria-hidden="true" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {[1, 2, 3].map((item) => <div key={item} className="rounded-2xl border bg-white p-5 space-y-4">
        <div className="h-24 bg-gray-100 rounded-xl" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-1/2 bg-gray-100 rounded" />
      </div>)}
    </div>
  </div>;
}
