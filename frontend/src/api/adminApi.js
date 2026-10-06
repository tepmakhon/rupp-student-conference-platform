import client from "./axios";
export const getUsers = async (params) => (await client.get("/users", { params })).data.data;
export const updateAccountStatus = async (id, accountStatus) =>
  (await client.patch(`/users/${id}/status`, { accountStatus })).data.data;
export const getAuditLogs = async (page) => (await client.get("/audit", { params: { page, limit: 10 } })).data.data;
