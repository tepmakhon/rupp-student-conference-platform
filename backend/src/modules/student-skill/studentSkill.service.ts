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

  /*
  |--------------------------------------------------------------------------
  | Remove Existing Skills
  |--------------------------------------------------------------------------
  */

  await prisma.studentSkill.deleteMany({
    where: {
      studentId: student.id,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Add New Skills
  |--------------------------------------------------------------------------
  */

  if (skillIds.length > 0) {
    await prisma.studentSkill.createMany({
      data: skillIds.map((skillId) => ({
        studentId: student.id,

        skillId: BigInt(skillId),
      })),
    });
  }

  return getMySkills(userId);
};
