import { prisma } from "../../config/prisma.js";

export const getMyApplications = async (
  userId: bigint
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

  return prisma.application.findMany({
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

    orderBy: {
      appliedAt: "desc",
    },
  });
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
      throw new Error("Organization not found");
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

    return prisma.application.update({
      where: {
        id: applicationId,
      },

      data: {
        applicationStatus: status as any,
      },
    });
};