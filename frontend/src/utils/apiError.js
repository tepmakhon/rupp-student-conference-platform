export function getApiErrorMessage(error) {
  if (!error?.response) return "Unable to connect. Check your connection and try again.";
  const status = error.response.status;
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You do not have permission to perform this action.";
  if (status === 404) return "The requested resource was not found.";
  return error.response.data?.message || "Something went wrong. Please try again.";
}
