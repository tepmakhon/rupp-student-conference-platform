import { prisma } from "../../config/prisma.js";

import { AppError } from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Admin Dashboard
|--------------------------------------------------------------------------
*/

export const getAdminDashboard = async () => {
  const [
    totalStudents,

    totalOrganizations,

    totalEvents,

    approvedEvents,

    pendingEvents,

    rejectedEvents,

    totalOpportunities,

    approvedOpportunities,

    totalApplications,
  ] = await Promise.all([
    prisma.student.count(),

    prisma.organization.count(),

    prisma.event.count(),

    prisma.event.count({
      where: {
        status: "APPROVED",
      },
    }),

    prisma.event.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.event.count({
      where: {
        status: "REJECTED",
      },
    }),

    prisma.opportunity.count(),

    prisma.opportunity.count({
      where: {
        status: "APPROVED",
      },
    }),

    prisma.application.count(),
  ]);

  return {
    totalStudents,

    totalOrganizations,

    totalEvents,

    approvedEvents,

    pendingEvents,

    rejectedEvents,

    totalOpportunities,

    approvedOpportunities,

    totalApplications,
  };
};

/*
|--------------------------------------------------------------------------
| Organization Dashboard
|--------------------------------------------------------------------------
*/

export const getOrganizationDashboard = async (userId: bigint) => {
  const organization = await prisma.organization.findUnique({
    where: {
      userId,
    },
  });

  if (!organization) {
    throw new AppError(
      "Organization not found",

      404,
    );
  }

  const [
    totalEvents,

    approvedEvents,

    pendingEvents,

    totalOpportunities,

    approvedOpportunities,

    pendingOpportunities,

    totalRegistrations,

    totalApplicants,
  ] = await Promise.all([
    prisma.event.count({
      where: {
        organizationId: organization.id,
      },
    }),

    prisma.event.count({
      where: {
        organizationId: organization.id,

        status: "APPROVED",
      },
    }),

    prisma.event.count({
      where: {
        organizationId: organization.id,

        status: "PENDING",
      },
    }),

    prisma.opportunity.count({
      where: {
        organizationId: organization.id,
      },
    }),

    prisma.opportunity.count({
      where: {
        organizationId: organization.id,

        status: "APPROVED",
      },
    }),

    prisma.opportunity.count({
      where: {
        organizationId: organization.id,

        status: "PENDING",
      },
    }),

    prisma.eventRegistration.count({
      where: {
        event: {
          organizationId: organization.id,
        },
      },
    }),

    prisma.application.count({
      where: {
        opportunity: {
          organizationId: organization.id,
        },
      },
    }),
  ]);

  return {
    totalEvents,

    approvedEvents,

    pendingEvents,

    totalOpportunities,

    approvedOpportunities,

    pendingOpportunities,

    totalRegistrations,

    totalApplicants,
  };
};
/*
|--------------------------------------------------------------------------
| Student Dashboard
|--------------------------------------------------------------------------
*/

export const getStudentDashboard = async (userId: bigint) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },

    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!student) {
    throw new AppError(
      "Student not found",

      404,
    );
  }

  const [
    totalRegistrations,

    totalApplications,

    savedOpportunities,

    upcomingEvents,

    recentActivities,

    leaderboard,
  ] = await Promise.all([
    prisma.eventRegistration.count({
      where: {
        studentId: student.id,
      },
    }),

    prisma.application.count({
      where: {
        studentId: student.id,
      },
    }),

    prisma.savedOpportunity.count({
      where: {
        studentId: student.id,
      },
    }),

    prisma.event.findMany({
      where: {
        status: "APPROVED",

        eventDate: {
          gte: new Date(),
        },
      },

      orderBy: {
        eventDate: "asc",
      },

      take: 5,

      select: {
        id: true,

        title: true,

        eventDate: true,

        location: true,
      },
    }),

    prisma.activityScoreHistory.findMany({
      where: {
        studentId: student.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    }),

    prisma.student.findMany({
      orderBy: {
        activityScore: "desc",
      },

      take: 5,

      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    }),
  ]);

  /*
  |--------------------------------------------------------------------------
  | Profile Completion
  |--------------------------------------------------------------------------
  */

  let completed = 0;

  const totalFields = 5;

  const profile = student.user.profile;

  if (profile?.fullName) completed++;

  if (profile?.phoneNumber) completed++;

  if (profile?.gender) completed++;

  if (profile?.bio) completed++;

  if (profile?.profileImageUrl) completed++;

  const profileCompletion = Math.round((completed / totalFields) * 100);

  return {
    activityScore: student.activityScore,

    totalRegistrations,

    totalApplications,

    savedOpportunities,

    upcomingEvents,

    recentActivities,

    leaderboard,

    profileCompletion,
  };
};
