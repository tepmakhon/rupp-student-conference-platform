import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { createNotification } from "../notification/notification.service.js";
import { createAuditLog } from "../audit/audit.service.js";
import {
  emitDashboardUpdate,
} from "../../socket/socket.js";

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
  throw new AppError(
    "Please complete your student profile first",
    404
  );
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
      throw new AppError(
        "Organization not found",
        404
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
      throw new AppError(
        "Not authorized to view applicants",
        403
      );
    }

  return prisma.application.findMany({
    where: {
      opportunityId,
    },

    orderBy: {
      appliedAt: "desc",
    },

    include: {
      student: {
        include: {
          university: true,

          faculty: true,

          major: true,

          user: {
            include: {
              profile: true,
            },
          },
        },
      },

      opportunity: {
        select: {
          id: true,

          title: true,
        },
      },
    },
  });
};

export const updateApplicationStatus =
  async (
    applicationId: bigint,
    userId: bigint,
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
      throw new AppError(
        "Invalid application status",
        400
      );
    }

    const organization =
      await prisma.organization.findUnique({
        where: {
          userId,
        },
      });

    if (!organization) {
      throw new AppError(
        "Organization not found",
        404
      );
    }

    const application =
      await prisma.application.findUnique({
        where: {
          id: applicationId,
        },

        include: {
          opportunity: true,

          student: {
            include: {
              user: true,
            },
          },
        },
      });

    if (!application) {
      throw new AppError(
        "Application not found",
        404
      );
    }

    if (
      application.opportunity.organizationId !==
      organization.id
    ) {
      throw new AppError(
        "Not authorized",
        403
      );
    }

    const updatedApplication =
      await prisma.application.update({
        where: {
          id: applicationId,
        },

        data: {
          applicationStatus:
            status as any,
        },

        include: {
          opportunity: true,

          student: {
            include: {
              user: true,
            },
          },
        },
      });

    await createNotification(
      updatedApplication.student.userId,

      `Application ${status}`,

      `Your application for ${updatedApplication.opportunity.title} has been ${status}`,

      "OPPORTUNITY"
    );
    emitDashboardUpdate(
      updatedApplication.student.userId
    );

    emitDashboardUpdate(
      userId
    );

    await createAuditLog(
      updatedApplication.student.userId,
      `APPLICATION_${status}:${updatedApplication.opportunity.title}`
    );

    return updatedApplication;
 };