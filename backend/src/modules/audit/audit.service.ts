import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const createAuditLog = async (
  userId: bigint,
  action: string,
  ipAddress?: string,
) => {
  try {
    return await prisma.auditLog.create({
      data: {
        userId,
        action,
        ipAddress,
      },
    });
  } catch {
    throw new AppError("Failed to create audit log", 500);
  }
};

export const getAllAuditLogs = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  if (page < 1 || limit < 1) {
    throw new AppError("Invalid pagination values", 400);
  }

  try {
    const [logs, total] = await Promise.all([
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
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch {
    throw new AppError("Failed to retrieve audit logs", 500);
  }
};

export const getAuditLogsByUser = async (
  userId: bigint,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;

  if (page < 1 || limit < 1) {
    throw new AppError("Invalid pagination values", 400);
  }

  try {
    const [logs, total] = await Promise.all([
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
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch {
    throw new AppError("Failed to retrieve user audit logs", 500);
  }
};
