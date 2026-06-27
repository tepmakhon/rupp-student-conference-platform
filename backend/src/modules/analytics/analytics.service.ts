import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Student Analytics
|--------------------------------------------------------------------------
*/

export const getStudentAnalytics = async (
  userId: bigint
) => {

  const student = await prisma.student.findUnique({
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

  const [
    registrations,
    applications,
    saved,
  ] = await Promise.all([

    prisma.eventRegistration.count({
      where: {
        studentId: student.id,
      },
    }),

    prisma.application.count({
      where: {
        studentId: student.id,
      },
    }),

    prisma.savedOpportunity.count({
      where: {
        studentId: student.id,
      },
    }),

  ]);

  return {

    activityScore:
      student.activityScore,

    registrations,

    applications,

    saved,

  };

};

/*
|--------------------------------------------------------------------------
| Organization Analytics
|--------------------------------------------------------------------------
*/

export const getOrganizationAnalytics =
async (
  userId: bigint
) => {

  const organization =
    await prisma.organization.findUnique({
      where: {
        userId,
      },
    });

  if (!organization) {
    throw new AppError(
      "Organization not found",
      404
    );
  }

  const [
    events,
    opportunities,
    registrations,
    applications,
  ] = await Promise.all([

    prisma.event.count({
      where: {
        organizationId:
          organization.id,
      },
    }),

    prisma.opportunity.count({
      where: {
        organizationId:
          organization.id,
      },
    }),

    prisma.eventRegistration.count({
      where: {
        event: {
          organizationId:
            organization.id,
        },
      },
    }),

    prisma.application.count({
      where: {
        opportunity: {
          organizationId:
            organization.id,
        },
      },
    }),

  ]);

  const checkedIn =
    await prisma.attendanceRecord.count({

      where: {

        registration: {

          event: {

            organizationId:
              organization.id,

          },

        },

      },

    });

  const attendanceRate =
    registrations === 0

      ? 0

      : Math.round(

          (checkedIn /
            registrations)

          * 100

        );
  const topEvents =
    await prisma.event.findMany({

      where: {

        organizationId:
          organization.id,

      },

      include: {

        _count: {

          select: {

            registrations: true,

          },

        },

      },

      orderBy: {

        registrations: {

          _count: "desc",

        },

      },

      take: 5,

    });

  return {

    events,

    opportunities,

    registrations,

    applications,

    checkedIn,

    attendanceRate,

    topEvents,

  };
};

/*
|--------------------------------------------------------------------------
| Admin Analytics
|--------------------------------------------------------------------------
*/

export const getAdminAnalytics =
async () => {

  const [

    students,

    organizations,

    events,

    opportunities,

    registrations,

    applications,

  ] = await Promise.all([

    prisma.student.count(),

    prisma.organization.count(),

    prisma.event.count(),

    prisma.opportunity.count(),

    prisma.eventRegistration.count(),

    prisma.application.count(),

  ]);

  return {

    students,

    organizations,

    events,

    opportunities,

    registrations,

    applications,

  };

};