import { getBadgesForScore } from "./badge.constants.js";
import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getMyBadges = async (userId: bigint) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  const score = student.activityScore;

  const badges = getBadgesForScore(score);

  return {
    activityScore: score,

    badges,
  };
};
