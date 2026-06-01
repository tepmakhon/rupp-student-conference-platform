import { prisma } from "../../config/prisma.js";
import { createAuditLog } from "../audit/audit.service.js";
import { createNotification } from "../notification/notification.service.js";

export const checkInEvent = async (
  eventId: bigint,
  userId: bigint
) => {

  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const registration =
    await prisma.eventRegistration.findFirst({
      where: {
        eventId,
        studentId: student.id,
      },

      include: {
        event: {
          include: {
            organization: true,
          },
        },
      },
    });

  if (!registration) {
    throw new Error(
      "You are not registered for this event"
    );
  }

  const existingAttendance =
    await prisma.attendanceRecord.findUnique({
      where: {
        registrationId: registration.id,
      },
    });

  if (existingAttendance) {
    throw new Error("Already checked in");
  }

  const result = await prisma.$transaction(
    async (tx) => {

      const attendance =
        await tx.attendanceRecord.create({
          data: {
            registrationId: registration.id,
            verificationMethod: "MANUAL",
            checkInTime: new Date(),
          },
        });

      await tx.student.update({
        where: {
          id: student.id,
        },

        data: {
          activityScore: {
            increment: 10,
          },
        },
      });

      await tx.activityScoreHistory.create({
        data: {
          studentId: student.id,
          scoreChange: 10,
          reason: `Attended ${registration.event.title}`,
        },
      });

      return attendance;
    }
  );

  await createAuditLog(
    userId,
    `EVENT_CHECKIN:${registration.event.title}`
  );

  await createNotification(
    registration.event.organization.userId,
    "Student Checked In",
    `A student checked in to ${registration.event.title}`
  );

  return result;
};