import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getMyBadges = async (
  userId: bigint
) => {

  const student =
    await prisma.student.findUnique({

      where: {
        userId,
      },

    });

  if (!student) {

    throw new AppError(
      "Student not found",
      404
    );

  }

  const score = student.activityScore;

  const badges = [

    {
      id: 1,
      name: "Active Student",
      icon: "🥉",
      color: "bronze",
      requiredScore: 50,
    },

    {
      id: 2,
      name: "Community Contributor",
      icon: "🥈",
      color: "silver",
      requiredScore: 150,
    },

    {
      id: 3,
      name: "Campus Champion",
      icon: "🥇",
      color: "gold",
      requiredScore: 300,
    },

    {
      id: 4,
      name: "University Leader",
      icon: "🏆",
      color: "purple",
      requiredScore: 600,
    },

    {
      id: 5,
      name: "Legend Student",
      icon: "💎",
      color: "blue",
      requiredScore: 1000,
    },

  ].map(badge => ({

    ...badge,

    unlocked:
      score >= badge.requiredScore,

  }));

  return {

    activityScore: score,

    badges,

  };

};