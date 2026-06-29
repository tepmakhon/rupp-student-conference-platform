import { prisma } from "../../config/prisma.js";

import { AppError } from "../../utils/AppError.js";

export const getMyActivityHistory = async (userId: bigint) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new AppError(
      "Student not found",

      404,
    );
  }

  return prisma.activityScoreHistory.findMany({
    where: {
      studentId: student.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};
