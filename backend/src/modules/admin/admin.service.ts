import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getSystemStats = async () => {
  try {

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
        },
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

  } catch (error) {

    throw new AppError(
      "Failed to load system statistics",
      500
    );

  }
};