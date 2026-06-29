import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { createAuditLog } from "../audit/audit.service.js";
import { createNotification } from "../notification/notification.service.js";
import {
  addActivityScore,
} from "../activity/activityScore.service.js";
import {
  refreshAdminDashboard,
  refreshOrganizationDashboard,
  refreshStudentDashboard,
} from "../../socket/dashboardEvents.js";

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
    throw new AppError(
      "Please complete your student profile first",
      404
    );
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
    throw new AppError(
      "You are not registered for this event",
      400
    );
  }

  const existingAttendance =
    await prisma.attendanceRecord.findUnique({
      where: {
        registrationId: registration.id,
      },
    });

  if (existingAttendance) {
    throw new AppError(
      "Already checked in",
      409
    );
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

      await addActivityScore(
        student.id,
        20,
        `Attended ${registration.event.title}`
      );

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

  refreshStudentDashboard(userId);

  refreshOrganizationDashboard(
    registration.event.organization.userId
  );

  refreshAdminDashboard();

  return result;
};

/*
|--------------------------------------------------------------------------
| Get My Attendance
|--------------------------------------------------------------------------
*/

export const getMyAttendance = async (
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

  return prisma.attendanceRecord.findMany({

    where: {
      registration: {
        studentId: student.id,
      },
    },

    include: {

      registration: {

        include: {

          event: {

            include: {

              organization: true,

              category: true,

            },

          },

        },

      },

    },

    orderBy: {

      checkInTime: "desc",

    },

  });

};

/*
|--------------------------------------------------------------------------
| Scan Attendance
|--------------------------------------------------------------------------
*/

export const scanAttendance = async (
  registrationId: bigint,
  organizationUserId: bigint
) => {

  const registration =
    await prisma.eventRegistration.findUnique({

      where: {
        id: registrationId,
      },

      include: {

        student: {
          include: {
            user: {
              include: {
                profile: true,
              },
            },
          },
        },

        event: {
          include: {
            organization: true,
          },
        },

      },

    });

  if (!registration) {

    throw new AppError(
      "Registration not found",
      404
    );

  }

  if (

    registration.event.organization.userId !==

    organizationUserId

  ) {

    throw new AppError(
      "Unauthorized",
      403
    );

  }

  const existing =
    await prisma.attendanceRecord.findUnique({

      where: {

        registrationId,

      },

    });

  if (existing) {

    throw new AppError(
      "Student already checked in",
      409
    );

  }

  const attendance =
    await prisma.attendanceRecord.create({

      data: {

        registrationId,

        verificationMethod:
          "QR_CODE",

        checkInTime:
          new Date(),

      },

    });

  await addActivityScore(

    registration.student.id,

    20,

    `Attended ${registration.event.title}`

  );
  refreshStudentDashboard(
    registration.student.userId
  );

  refreshOrganizationDashboard(
    organizationUserId
  );

  refreshAdminDashboard();

  await createAuditLog(

    organizationUserId,

    `QR_CHECKIN:${registration.event.title}`

  );
  return attendance;

};

/*
|--------------------------------------------------------------------------
| Attendance Statistics
|--------------------------------------------------------------------------
*/

export const getAttendanceStatistics = async (
  eventId: bigint
) => {

  const totalRegistrations =
    await prisma.eventRegistration.count({

      where: {
        eventId,
      },

    });

  const checkedIn =
    await prisma.attendanceRecord.count({

      where: {

        registration: {
          eventId,
        },

      },

    });

  const remaining =
    totalRegistrations - checkedIn;

  const attendanceRate =
    totalRegistrations === 0

      ? 0

      : Math.round(

          (checkedIn / totalRegistrations) * 100

        );

  return {

    totalRegistrations,

    checkedIn,

    remaining,

    attendanceRate,

  };

};

/*
|--------------------------------------------------------------------------
| Export Attendance Data
|--------------------------------------------------------------------------
*/

export const getAttendanceExportData = async (
  eventId: bigint
) => {

  return prisma.eventRegistration.findMany({

    where: {
      eventId,
    },

    include: {

      event: {

        include: {

          organization: true,

          category: true,

        },

      },

      student: {

        include: {

          user: {

            include: {

              profile: true,

            },

          },

          university: true,

          faculty: true,

          major: true,

        },

      },

      attendanceRecord: true,

    },

    orderBy: {

      registeredAt: "asc",

    },

  });

};