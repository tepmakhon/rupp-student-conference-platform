import { prisma } from "../../config/prisma.js";

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
    where: { status: "APPROVED" },
  }),

  prisma.event.count({
    where: { status: "PENDING" },
  }),

  prisma.event.count({
    where: { status: "REJECTED" },
  }),

  prisma.opportunity.count(),

  prisma.opportunity.count({
    where: { status: "APPROVED" } as any,
  }),

  prisma.application.count(),
]);

  return {
    totalStudents,
    totalOrganizations,
    totalEvents,
    pendingEvents,
    totalOpportunities,
    totalApplications,
    approvedEvents,
    rejectedEvents,
    approvedOpportunities,
  };
};

export const getOrganizationDashboard =
  async (
    userId: bigint
  ) => {

    const organization =
      await prisma.organization.findUnique({
        where: {
          userId,
        },
      });

    if (!organization) {
      throw new Error(
        "Organization not found"
      );
    }

    const totalEvents =
      await prisma.event.count({
        where: {
          organizationId:
            organization.id,
        },
      });

    const totalOpportunities =
      await prisma.opportunity.count({
        where: {
          organizationId:
            organization.id,
        },
      });

    const totalRegistrations =
      await prisma.eventRegistration.count({
        where: {
          event: {
            organizationId:
              organization.id,
          },
        },
      });

    const totalApplicants =
      await prisma.application.count({
        where: {
          opportunity: {
            organizationId:
              organization.id,
          },
        },
      });

    return {
      totalEvents,
      totalOpportunities,
      totalRegistrations,
      totalApplicants,
    };
};

export const getStudentDashboard =
  async (
    userId: bigint
  ) => {

    const student =
      await prisma.student.findUnique({
        where: {
          userId,
        },
      });

    if (!student) {
      throw new Error(
        "Student not found"
      );
    }

    const totalRegistrations =
      await prisma.eventRegistration.count({
        where: {
          studentId:
            student.id,
        },
      });

    const totalApplications =
      await prisma.application.count({
        where: {
          studentId:
            student.id,
        },
      });

    return {
      activityScore:
        student.activityScore,

      totalRegistrations,

      totalApplications,
    };
};