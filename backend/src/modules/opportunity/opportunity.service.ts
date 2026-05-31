import { prisma } from "../../config/prisma.js";

export const createOpportunity = async (
  data: any,
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
      "Only organization can create opportunities"
    );
  }

  return prisma.opportunity.create({
    data: {
      title: data.title,
      description: data.description,
      requirements: data.requirements,
      deadline: data.deadline
        ? new Date(data.deadline)
        : null,

      typeId: BigInt(data.typeId),

      organizationId: organization.id,
    },
  });
};

export const getAllOpportunities = async () => {

  return prisma.opportunity.findMany({
    include: {
      organization: true,
      type: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOpportunityById = async (
  opportunityId: bigint
) => {

  return prisma.opportunity.findUnique({
    where: {
      id: opportunityId,
    },

    include: {
      organization: true,
      type: true,
    },
  });
};

export const approveOpportunity = async (
  opportunityId: bigint
) => {

  return prisma.opportunity.update({
    where: {
      id: opportunityId,
    },

    data: {
      status: "APPROVED",
      approvedAt: new Date(),
    } as any,
  });
};

export const applyOpportunity = async (
  opportunityId: bigint,
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

  const existing =
    await prisma.application.findFirst({
      where: {
        opportunityId,
        studentId: student.id,
      },
    });

  if (existing) {
    throw new Error(
      "Already applied"
    );
  }

  return prisma.application.create({
    data: {
      opportunityId,
      studentId: student.id,
    },
  });
};