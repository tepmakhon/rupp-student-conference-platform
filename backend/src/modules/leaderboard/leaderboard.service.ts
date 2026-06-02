import { prisma } from "../../config/prisma.js";

export const getLeaderboard =
  async (
    page = 1,
    limit = 10
  ) => {

    const skip =
      (page - 1) * limit;

    const [students, total] =
      await Promise.all([

        prisma.student.findMany({
          skip,
          take: limit,

          include: {
            user: true,
          },

          orderBy: {
            activityScore: "desc",
          },
        }),

        prisma.student.count(),
      ]);

    return {
      students,

      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(total / limit),
      },
    };
};