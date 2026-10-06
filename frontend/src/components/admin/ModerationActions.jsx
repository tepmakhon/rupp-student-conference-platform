import { useState } from "react";
import useModeration from "../../hooks/useModeration";
export default function ModerationActions(props) {
  const [reason, setReason] = useState("");
  const { processing, approve, reject } = useModeration(props);
  return <div className="border-t pt-5 mt-5 space-y-3">
    <label className="block text-sm font-medium">Rejection reason
      <textarea value={reason} onChange={(event) => setReason(event.target.value)} maxLength={1000} rows={2}
        placeholder="Explain what needs to change before approval" className="mt-2 w-full border rounded-xl p-3" />
    </label>
    <div className="flex gap-3">
      <button disabled={processing} onClick={approve} className="flex-1 bg-green-600 text-white rounded-xl py-3 disabled:opacity-50">{processing ? "Processing..." : "Approve"}</button>
      <button disabled={processing || reason.trim().length < 3} onClick={() => reject(reason.trim())} className="flex-1 bg-red-600 text-white rounded-xl py-3 disabled:opacity-50">Reject</button>
    </div>
  </div>;
}
