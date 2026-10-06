export const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  ACTIVE: "bg-green-100 text-green-700",
  ACCEPTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  SUSPENDED: "bg-red-100 text-red-700",
  REVIEWING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-gray-100 text-gray-700",
  CLOSED: "bg-gray-100 text-gray-700",
};
export const getStatusStyle = (status) => STATUS_STYLES[status] || "bg-gray-100 text-gray-700";
