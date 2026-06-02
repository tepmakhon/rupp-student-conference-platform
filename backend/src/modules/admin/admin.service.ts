import { prisma } from "../../config/prisma.js";

export const getSystemStats = async () => {
  const [
    totalUsers,
    totalStudents,
    totalOrganizations,
    totalEvents,
    totalPendingEvents,
    totalOpportunities,
    totalApplications,
    totalNotifications,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.student.count(),
    prisma.organization.count(),
    prisma.event.count(),
    prisma.event.count({
      where: {
        status: "PENDING",
      } as any,
    }),
    prisma.opportunity.count(),
    prisma.application.count(),
    prisma.notification.count(),
  ]);

  return {
    totalUsers,
    totalStudents,
    totalOrganizations,
    totalEvents,
    totalPendingEvents,
    totalOpportunities,
    totalApplications,
    totalNotifications,
  };
};