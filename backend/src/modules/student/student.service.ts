import { prisma } from "../../config/prisma.js";

export const getScoreHistory = async (
  userId: bigint
) => {

  const student =
    await prisma.student.findUnique({
      where: {
        userId,
      },
    });

  if (!student) {
    throw new Error("Student not found");
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