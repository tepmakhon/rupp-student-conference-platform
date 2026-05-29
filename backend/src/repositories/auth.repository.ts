import { prisma } from "../config/prisma.js";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (data: any) => {
  return prisma.user.create({
    data,
  });
};