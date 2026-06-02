import { prisma } from "../../config/prisma.js";

export const createAuditLog = async (
  userId: bigint,
  action: string,
  ipAddress?: string
) => {
  return prisma.auditLog.create({
    data: {
      userId,
      action,
      ipAddress,
    },
  });
};

export const getAllAuditLogs = async (
  page = 1,
  limit = 10
) => {

  const skip =
    (page - 1) * limit;

  const [logs, total] =
    await Promise.all([

      prisma.auditLog.findMany({
        skip,
        take: limit,

        include: {
          user: {
            include: {
              role: true,
              profile: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.auditLog.count(),
    ]);

  return {
    logs,

    pagination: {
      page,
      limit,
      total,
      totalPages:
        Math.ceil(total / limit),
    },
  };
};

export const getAuditLogsByUser = async (
  userId: bigint,
  page = 1,
  limit = 10
) => {

  const skip =
    (page - 1) * limit;

  const [logs, total] =
    await Promise.all([

      prisma.auditLog.findMany({
        where: {
          userId,
        },

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.auditLog.count({
        where: {
          userId,
        },
      }),
    ]);

  return {
    logs,

    pagination: {
      page,
      limit,
      total,
      totalPages:
        Math.ceil(total / limit),
    },
  };
};
