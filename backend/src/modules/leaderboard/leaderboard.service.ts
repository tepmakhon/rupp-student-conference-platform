import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { getPagination } from "../../utils/pagination.js";

export const getLeaderboard =
  async (
    page = 1,
    limit = 10
  ) => {

    if (page < 1 || limit < 1) {
      throw new AppError(
        "Invalid pagination values",
        400
      );
    }

    const { skip } =
      getPagination(page, limit);

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