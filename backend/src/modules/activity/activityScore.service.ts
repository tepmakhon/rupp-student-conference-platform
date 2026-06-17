import { prisma }
from "../../config/prisma.js";

export const addActivityScore =
  async (

    studentId: bigint,

    score: number,

    reason: string

  ) => {

    return prisma.$transaction(

      async (tx) => {

        await tx.student.update({

          where: {

            id: studentId,

          },

          data: {

            activityScore: {

              increment: score,

            },

          },

        });

        await tx.activityScoreHistory.create({

          data: {

            studentId,

            scoreChange: score,

            reason,

          },

        });

      }

    );

};