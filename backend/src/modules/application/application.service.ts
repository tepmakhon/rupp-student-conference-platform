import { prisma } from "../../config/prisma.js";
import { createNotification } from "../notification/notification.service.js";
import { createAuditLog } from "../audit/audit.service.js";

export const getMyApplications = async (
  userId: bigint,
  page = 1,
  limit = 10
) => {

  const student =
    await prisma.student.findUnique({
      where: {
        userId,
      },
    });

  if (!student) {
    throw new Error("Student not found");
  }

  const skip =
    (page - 1) * limit;

  const [
    applications,
    total,
  ] = await Promise.all([

    prisma.application.findMany({
      where: {
        studentId: student.id,
      },

      include: {
        opportunity: {
          include: {
            organization: true,
            type: true,
          },
        },
      },

      skip,
      take: limit,

      orderBy: {
        appliedAt: "desc",
      },
    }),

    prisma.application.count({
      where: {
        studentId: student.id,
      },
    }),
  ]);

  return {
    applications,

    pagination: {
      page,
      limit,
      total,
      totalPages:
        Math.ceil(total / limit),
    },
  };
};

export const getApplicantsForOpportunity =
  async (
    opportunityId: bigint,
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

    const opportunity =
      await prisma.opportunity.findUnique({
        where: {
          id: opportunityId,
        },
      });

    if (
      !opportunity ||
      opportunity.organizationId !== organization.id
    ) {
      throw new Error(
        "Not authorized to view applicants"
      );
    }

    return prisma.application.findMany({
      where: {
        opportunityId,
      },

      include: {
        student: {
          include: {
            user: true,
          },
        },
      },
    });
};

export const updateApplicationStatus =
  async (
    applicationId: bigint,
    status: string
  ) => {

    const validStatuses = [
      "PENDING",
      "REVIEWING",
      "ACCEPTED",
      "REJECTED",
    ];

    if (
      !validStatuses.includes(status)
    ) {
      throw new Error(
        "Invalid application status"
      );
    }

    const application =
      await prisma.application.update({
        where: {
          id: applicationId,
        },

        data: {
          applicationStatus:
            status as any,
        },

        include: {
          student: {
            include: {
              user: true,
            },
          },

          opportunity: true,
        },
      });

    await createNotification(
      application.student.userId,
      `Application ${status}`,
      `Your application for ${application.opportunity.title} has been ${status}`
    );

    await createAuditLog(
      application.student.userId,
      `APPLICATION_${status}:${application.opportunity.title}`
    );

    return application;
};