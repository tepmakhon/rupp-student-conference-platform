import { type AccountStatus, type Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { getPagination } from "../../utils/pagination.js";

export const listUsers = async (page: number, limit: number, search: string, role?: string) => {
  const { skip, take } = getPagination(page, limit);
  if (role && !["ADMIN", "STUDENT", "ORGANIZATION"].includes(role)) throw new AppError("Invalid role", 400);
  const where: Prisma.UserWhereInput = {
    ...(role ? { role: { roleName: role } } : {}),
    ...(search ? { OR: [
      { email: { contains: search, mode: "insensitive" } },
      { profile: { fullName: { contains: search, mode: "insensitive" } } },
      { organization: { organizationName: { contains: search, mode: "insensitive" } } },
    ] } : {}),
  };
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where, skip, take, orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: { id: true, email: true, accountStatus: true, createdAt: true, role: true, profile: true, organization: true },
    }),
    prisma.user.count({ where }),
  ]);
  return { users, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
};

export const updateAccountStatus = async (id: bigint, actorId: bigint, accountStatus: AccountStatus) => {
  if (id === actorId) throw new AppError("You cannot change your own account status", 400);
  return prisma.$transaction(async (tx) => {
    const target = await tx.user.findUnique({ where: { id }, include: { role: true } });
    if (!target) throw new AppError("User not found", 404);
    // Administrators cannot disable each other through the platform.
    if (target.role.roleName === "ADMIN") throw new AppError("Administrator accounts cannot be suspended here", 403);
    const user = await tx.user.update({ where: { id }, data: { accountStatus }, select: { id: true, email: true, accountStatus: true } });
    await tx.auditLog.create({ data: { userId: actorId, action: `ACCOUNT_STATUS:${id}:${accountStatus}` } });
    return user;
  });
};
