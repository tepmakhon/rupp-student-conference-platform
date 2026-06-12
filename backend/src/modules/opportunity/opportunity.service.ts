import { prisma } from "../../config/prisma.js";
import { createNotification } from "../notification/notification.service.js";
import { createAuditLog } from "../audit/audit.service.js";
import { AppError } from "../../utils/AppError.js";
import { getPagination } from "../../utils/pagination.js";

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
    throw new AppError(
      "Only organization can create opportunities",
      403
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
async ({
  page = 1,
  limit = 10,
  keyword,
  typeId,
  status,
}: any) => {

  const skip =
    (page - 1) * limit;

  const where: any = {};

  /*
  ------------------------------------
  Keyword Search
  ------------------------------------
  */

  if (keyword) {

    where.OR = [

      {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },

      {
        description: {
          contains: keyword,
          mode: "insensitive",
        },
      },

      {
        requirements: {
          contains: keyword,
          mode: "insensitive",
        },
      },

    ];
  }

  /*
  ------------------------------------
  Type Filter
  ------------------------------------
  */

  if (typeId) {

    where.typeId =
      BigInt(typeId);
  }

  /*
  ------------------------------------
  Status Filter
  ------------------------------------
  */

  if (status) {

    where.status =
      status;
  }

  const [
    opportunities,
    total,
  ] = await Promise.all([

    prisma.opportunity.findMany({

      where,

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

    prisma.opportunity.count({
      where,
    }),
  ]);

  return {

    opportunities,

    filters: {
      keyword,
      typeId,
      status,
    },

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

  const opportunity =
    await prisma.opportunity.findUnique({
      where: {
        id: opportunityId,
      },

      include: {
        organization: true,
        type: true,
      },
    });

  if (!opportunity) {
    throw new AppError(
      "Opportunity not found",
      404
    );
  }

  return opportunity;
};

export const approveOpportunity = async (
  opportunityId: bigint
) => {

  const existingOpportunity =
    await prisma.opportunity.findUnique({
      where: {
        id: opportunityId,
      },
    });

  if (!existingOpportunity) {
    throw new AppError(
      "Opportunity not found",
      404
    );
  }

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

  const existingOpportunity =
    await prisma.opportunity.findUnique({
      where: {
        id: opportunityId,
      },
    });

  if (!existingOpportunity) {
    throw new AppError(
      "Opportunity not found",
      404
    );
  }

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
    throw new AppError(
      "Please complete your student profile first",
      400
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
    throw new AppError(
      "Opportunity not found",
      404
    );
  }

  if (
    (opportunity as any).status !==
    "APPROVED"
  ) {
    throw new AppError(
      "Opportunity is not approved",
      400
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
    throw new AppError(
      "Already applied",
      409
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

export const saveOpportunity = async (
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
    throw new AppError(
      "Student profile not found",
      404
    );
  }

  const opportunity =
    await prisma.opportunity.findUnique({
      where: {
        id: opportunityId,
      },
    });

  if (!opportunity) {
    throw new AppError(
      "Opportunity not found",
      404
    );
  }

  const existing =
    await prisma.savedOpportunity.findUnique({
      where: {
        studentId_opportunityId: {
          studentId: student.id,
          opportunityId,
        },
      },
    });

  if (existing) {
    throw new AppError(
      "Already saved",
      409
    );
  }

  return prisma.savedOpportunity.create({
    data: {
      studentId: student.id,
      opportunityId,
    },
  });
};

export const unsaveOpportunity = async (
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
    throw new AppError(
      "Student profile not found",
      404
    );
  }

  await prisma.savedOpportunity.delete({
    where: {
      studentId_opportunityId: {
        studentId: student.id,
        opportunityId,
      },
    },
  });

  return {
    success: true,
  };
};

export const getSavedOpportunities =
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
      throw new AppError(
        "Student profile not found",
        404
      );
    }

    return prisma.savedOpportunity.findMany({
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
        savedAt: "desc",
      },
    });
  };