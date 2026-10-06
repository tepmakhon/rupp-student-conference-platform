import { prisma } from "../../config/prisma.js";

import { AppError } from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Get My Skills
|--------------------------------------------------------------------------
*/

export const getMySkills = async (userId: bigint) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },

    include: {
      studentSkills: {
        include: {
          skill: true,
        },
      },
    },
  });

  if (!student) {
    throw new AppError(
      "Student not found",

      404,
    );
  }

  return student.studentSkills;
};

/*
|--------------------------------------------------------------------------
| Update My Skills
|--------------------------------------------------------------------------
*/

export const updateMySkills = async (
  userId: bigint,

  skillIds: string[],
) => {
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

  if (!Array.isArray(skillIds) || skillIds.length > 100 ||
      !skillIds.every((id) => typeof id === "string" && /^[1-9]\d*$/.test(id))) {
    throw new AppError("Invalid skill IDs", 400);
  }
  const ids = [...new Set(skillIds)].map((id) => BigInt(id));
  await prisma.$transaction(async (tx) => {
    const count = await tx.skill.count({ where: { id: { in: ids } } });
    if (count !== ids.length) throw new AppError("One or more skills do not exist", 400);
    await tx.studentSkill.deleteMany({ where: { studentId: student.id } });
    if (ids.length) await tx.studentSkill.createMany({
      data: ids.map((skillId) => ({ studentId: student.id, skillId })),
    });
  });

  return getMySkills(userId);
};
