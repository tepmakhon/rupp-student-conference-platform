import { prisma } from "../../config/prisma.js";
import { createNotification } from "../notification/notification.service.js";
import { createAuditLog } from "../audit/audit.service.js";

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

  const opportunity =
    await prisma.opportunity.create({
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

  await createAuditLog(
    userId,
    `OPPORTUNITY_CREATED:${opportunity.title}`
  );

  return opportunity;
};

export const getAllOpportunities =
  async (
    page = 1,
    limit = 10
  ) => {

    const skip =
      (page - 1) * limit;

    const [
      opportunities,
      total,
    ] = await Promise.all([
      prisma.opportunity.findMany({
        include: {
          organization: true,
          type: true,
        },

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.opportunity.count(),
    ]);

    return {
      opportunities,

      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(total / limit),
      },
    };
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

  const opportunity =
    await prisma.opportunity.update({
      where: {
        id: opportunityId,
      },

      data: {
        status: "APPROVED",
        approvedAt: new Date(),
      } as any,

      include: {
        organization: true,
      },
    });

  await createNotification(
    opportunity.organization.userId,
    "Opportunity Approved",
    `${opportunity.title} has been approved by admin`
  );

  await createAuditLog(
    opportunity.organization.userId,
    `OPPORTUNITY_APPROVED:${opportunity.title}`
  );

  return opportunity;
};

export const rejectOpportunity = async (
  opportunityId: bigint
) => {

  const opportunity =
    await prisma.opportunity.update({
      where: {
        id: opportunityId,
      },

      data: {
        status: "REJECTED",
      } as any,

      include: {
        organization: true,
      },
    });

  await createNotification(
    opportunity.organization.userId,
    "Opportunity Rejected",
    `${opportunity.title} has been rejected by admin`
  );

  await createAuditLog(
    opportunity.organization.userId,
    `OPPORTUNITY_REJECTED:${opportunity.title}`
  );

  return opportunity;
};

export const applyOpportunity = async (
  opportunityId: bigint,
  userId: bigint,
  data: any
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

  const opportunity =
    await prisma.opportunity.findUnique({
      where: {
        id: opportunityId,
      },

      include: {
        organization: true,
      },
    });

  if (!opportunity) {
    throw new Error(
      "Opportunity not found"
    );
  }

  if (
    (opportunity as any).status !==
    "APPROVED"
  ) {
    throw new Error(
      "Opportunity is not approved"
    );
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

  const application =
    await prisma.application.create({
      data: {
        opportunityId,
        studentId: student.id,
        cvUrl: data.cvUrl || null,
      },
    });

  await createNotification(
    opportunity.organization.userId,
    "New Application",
    `A student applied for ${opportunity.title}`
  );

  await createAuditLog(
    userId,
    `OPPORTUNITY_APPLIED:${opportunity.title}`
  );

  return application;
};