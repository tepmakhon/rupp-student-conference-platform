import { useState } from "react";
import { Link } from "react-router-dom";
import { globalSearch } from "../../api/searchApi";
import { getApiErrorMessage } from "../../utils/apiError";
import ErrorState from "../common/ErrorState";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const search = async (event) => {
    event.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    setError("");
    try { setResults(await globalSearch(keyword)); }
    catch (error) { setError(getApiErrorMessage(error)); }
    finally { setLoading(false); }
  };
  return <form onSubmit={search} className="space-y-4">
    <div className="flex gap-3">
      <input aria-label="Search events and opportunities" value={keyword} onChange={(event) => setKeyword(event.target.value)} className="min-w-0 flex-1 border rounded-xl p-3" />
      <button disabled={loading} className="bg-primary text-white rounded-xl px-4">{loading ? "Searching..." : "Search"}</button>
    </div>
    {error && <ErrorState message={error} />}
    {results && !error && <div className="space-y-2">
      {[...(results.events || []).map((item) => ({ ...item, path: `/events/${item.id}` })),
        ...(results.opportunities || []).map((item) => ({ ...item, path: `/opportunities/${item.id}` }))]
        .map((item) => <Link className="block" key={item.path} to={item.path}>{item.title}</Link>)}
      {(results.events?.length || 0) + (results.opportunities?.length || 0) === 0 && <p>No events or opportunities found.</p>}
    </div>}
  </form>;
}
export default SearchBar;
