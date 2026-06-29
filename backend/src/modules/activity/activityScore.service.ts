import { prisma }
from "../../config/prisma.js";

import {
  emitDashboardUpdate,
} from "../../socket/socket.js";

export const addActivityScore =
  async (

    studentId: bigint,

    score: number,

    reason: string

  ) => {

    const student =

      await prisma.$transaction(

        async (tx) => {

          const updatedStudent =

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

          return updatedStudent;

        }

      );

    emitDashboardUpdate(
      student.userId
    );

    return student;

};