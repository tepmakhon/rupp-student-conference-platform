import { emitDashboardUpdate } from "./socket.js";

export const refreshAdminDashboard = () => {
  emitDashboardUpdate("admin");
};

export const refreshOrganizationDashboard = (
  organizationUserId: bigint | number | string,
) => {
  emitDashboardUpdate(organizationUserId);
};

export const refreshStudentDashboard = (
  studentUserId: bigint | number | string,
) => {
  emitDashboardUpdate(studentUserId);
};
