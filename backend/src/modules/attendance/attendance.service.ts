import { prisma } from "../../config/prisma.js";

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
    });

  if (!registration) {
    throw new Error("You are not registered");
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

  const attendance =
    await prisma.attendanceRecord.create({
      data: {
        registrationId: registration.id,
        verificationMethod: "MANUAL",
        checkInTime: new Date(),
      },
    });

  await prisma.student.update({
    where: {
      id: student.id,
    },
    data: {
      activityScore: {
        increment: 10,
      },
    },
  });

  await prisma.activityScoreHistory.create({
    data: {
      studentId: student.id,
      scoreChange: 10,
      reason: "Attended Event",
    },
  });

  return attendance;
};