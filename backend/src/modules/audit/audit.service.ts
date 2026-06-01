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

export const getAllAuditLogs = async () => {
  return prisma.auditLog.findMany({
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
  });
};

export const getAuditLogsByUser = async (
  userId: bigint
) => {
  return prisma.auditLog.findMany({
    where: {
      userId,
    },

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
  });
};