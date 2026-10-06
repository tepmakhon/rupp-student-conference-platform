import { type Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma.js";

import { refreshStudentDashboard } from "../../socket/dashboardEvents.js";

export const addActivityScore = async (
  studentId: bigint,

  score: number,

  reason: string,

  transaction?: Prisma.TransactionClient,
) => {
  const update = async (tx: Prisma.TransactionClient) => {
    const updatedStudent = await tx.student.update({
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
  };

  const student = transaction ? await update(transaction) : await prisma.$transaction(update);

  if (!transaction) refreshStudentDashboard(student.userId);

  return student;
};
