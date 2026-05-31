import { prisma } from "../../config/prisma.js";

export const getLeaderboard = async () => {

  return prisma.student.findMany({
    orderBy: {
      activityScore: "desc",
    },

    take: 20,

    include: {
      user: true,
    },
  });
};