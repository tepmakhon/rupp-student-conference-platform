import { useState } from "react";
import toast from "react-hot-toast";
import { approveEvent, rejectEvent } from "../api/eventApi";
import { approveOpportunity, rejectOpportunity } from "../api/opportunityApi";
import { getApiErrorMessage } from "../utils/apiError";
const services = {
  event: { approve: approveEvent, reject: rejectEvent },
  opportunity: { approve: approveOpportunity, reject: rejectOpportunity },
};
export default function useModeration({ type, id, onAction }) {
  const [processing, setProcessing] = useState(false);
  const moderate = async (action, reason) => {
    if (processing) return;
    setProcessing(true);
    try {
      await services[type][action](id, reason);
      toast.success(`${type === "event" ? "Event" : "Opportunity"} ${action === "approve" ? "approved" : "rejected"}`);
      await onAction?.();
    } catch (error) { toast.error(getApiErrorMessage(error)); }
    finally { setProcessing(false); }
  };
  return { processing, approve: () => moderate("approve"), reject: (reason) => moderate("reject", reason) };
}
