import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

import {
  getDateRange,
  getPreviousMonth,
  calculateGrowth,
} from "./analytics.helper.js";

import { MONTH_NAMES } from "./analytics.constants.js";

/*
|--------------------------------------------------------------------------
| Monthly Trend Helper
|--------------------------------------------------------------------------
*/

const getMonthlyTrend = async (
  model: any,
  dateField: string,
  where: any = {},
  year = new Date().getFullYear(),
) => {
  const trend = [];

  for (let month = 1; month <= 12; month++) {
    const start = new Date(year, month - 1, 1);

    const end = new Date(year, month, 1);

    const total = await model.count({
      where: {
        ...where,

        [dateField]: {
          gte: start,

          lt: end,
        },
      },
    });

    trend.push({
      month: MONTH_NAMES[month - 1],

      value: total,
    });
  }

  return trend;
};

/*
|--------------------------------------------------------------------------
| Student Analytics
|--------------------------------------------------------------------------
*/

export const getStudentAnalytics = async (
  userId: bigint,
  month?: number,
  year?: number,
) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  const currentYear = year ?? new Date().getFullYear();

  const dateFilter = getDateRange(month, currentYear);

  const previous = month ? getPreviousMonth(month, currentYear) : undefined;

  const previousDateFilter = previous
    ? getDateRange(previous.month, previous.year)
    : undefined;

  const [
    registrations,

    applications,

    saved,

    previousRegistrations,

    previousApplications,

    previousSaved,

    registrationTrend,

    applicationTrend,
  ] = await Promise.all([
    prisma.eventRegistration.count({
      where: {
        studentId: student.id,

        ...(dateFilter && {
          registeredAt: dateFilter,
        }),
      },
    }),

    prisma.application.count({
      where: {
        studentId: student.id,

        ...(dateFilter && {
          appliedAt: dateFilter,
        }),
      },
    }),

    prisma.savedOpportunity.count({
      where: {
        studentId: student.id,

        ...(dateFilter && {
          savedAt: dateFilter,
        }),
      },
    }),

    prisma.eventRegistration.count({
      where: {
        studentId: student.id,

        ...(previousDateFilter && {
          registeredAt: previousDateFilter,
        }),
      },
    }),

    prisma.application.count({
      where: {
        studentId: student.id,

        ...(previousDateFilter && {
          appliedAt: previousDateFilter,
        }),
      },
    }),

    prisma.savedOpportunity.count({
      where: {
        studentId: student.id,

        ...(previousDateFilter && {
          savedAt: previousDateFilter,
        }),
      },
    }),

    getMonthlyTrend(
      prisma.eventRegistration,

      "registeredAt",

      {
        studentId: student.id,
      },

      currentYear,
    ),

    getMonthlyTrend(
      prisma.application,

      "appliedAt",

      {
        studentId: student.id,
      },

      currentYear,
    ),
  ]);

  return {
    summary: {
      activityScore: student.activityScore,

      registrations,

      applications,

      saved,
    },

    growth: {
      registrations: calculateGrowth(registrations, previousRegistrations),

      applications: calculateGrowth(applications, previousApplications),

      saved: calculateGrowth(saved, previousSaved),
    },

    monthlyTrend: {
      registrations: registrationTrend,

      applications: applicationTrend,
    },

    month,

    year: currentYear,
  };
};

/*
|--------------------------------------------------------------------------
| Organization Analytics
|--------------------------------------------------------------------------
*/

export const getOrganizationAnalytics = async (
  userId: bigint,
  month?: number,
  year?: number,
) => {
  const organization = await prisma.organization.findUnique({
    where: {
      userId,
    },
  });

  if (!organization) {
    throw new AppError("Organization not found", 404);
  }

  const currentYear = year ?? new Date().getFullYear();

  const dateFilter = getDateRange(month, currentYear);

  const previous = month ? getPreviousMonth(month, currentYear) : undefined;

  const previousDateFilter = previous
    ? getDateRange(previous.month, previous.year)
    : undefined;

  const [
    events,

    opportunities,

    registrations,

    applications,

    checkedIn,

    previousEvents,

    previousOpportunities,

    previousRegistrations,

    previousApplications,

    eventTrend,

    opportunityTrend,

    registrationTrend,

    applicationTrend,
  ] = await Promise.all([
    /*
    |--------------------------------------------------------------------------
    | Current Month
    |--------------------------------------------------------------------------
    */

    prisma.event.count({
      where: {
        organizationId: organization.id,

        ...(dateFilter && {
          createdAt: dateFilter,
        }),
      },
    }),

    prisma.opportunity.count({
      where: {
        organizationId: organization.id,

        ...(dateFilter && {
          createdAt: dateFilter,
        }),
      },
    }),

    prisma.eventRegistration.count({
      where: {
        event: {
          organizationId: organization.id,
        },

        ...(dateFilter && {
          registeredAt: dateFilter,
        }),
      },
    }),

    prisma.application.count({
      where: {
        opportunity: {
          organizationId: organization.id,
        },

        ...(dateFilter && {
          appliedAt: dateFilter,
        }),
      },
    }),

    prisma.attendanceRecord.count({
      where: {
        registration: {
          event: {
            organizationId: organization.id,
          },
        },

        ...(dateFilter && {
          checkInTime: dateFilter,
        }),
      },
    }),

    /*
    |--------------------------------------------------------------------------
    | Previous Month
    |--------------------------------------------------------------------------
    */

    prisma.event.count({
      where: {
        organizationId: organization.id,

        ...(previousDateFilter && {
          createdAt: previousDateFilter,
        }),
      },
    }),

    prisma.opportunity.count({
      where: {
        organizationId: organization.id,

        ...(previousDateFilter && {
          createdAt: previousDateFilter,
        }),
      },
    }),

    prisma.eventRegistration.count({
      where: {
        event: {
          organizationId: organization.id,
        },

        ...(previousDateFilter && {
          registeredAt: previousDateFilter,
        }),
      },
    }),

    prisma.application.count({
      where: {
        opportunity: {
          organizationId: organization.id,
        },

        ...(previousDateFilter && {
          appliedAt: previousDateFilter,
        }),
      },
    }),

    /*
    |--------------------------------------------------------------------------
    | Monthly Trends
    |--------------------------------------------------------------------------
    */

    getMonthlyTrend(
      prisma.event,

      "createdAt",

      {
        organizationId: organization.id,
      },

      currentYear,
    ),

    getMonthlyTrend(
      prisma.opportunity,

      "createdAt",

      {
        organizationId: organization.id,
      },

      currentYear,
    ),

    getMonthlyTrend(
      prisma.eventRegistration,

      "registeredAt",

      {
        event: {
          organizationId: organization.id,
        },
      },

      currentYear,
    ),

    getMonthlyTrend(
      prisma.application,

      "appliedAt",

      {
        opportunity: {
          organizationId: organization.id,
        },
      },

      currentYear,
    ),
  ]);

  const attendanceRate =
    registrations === 0 ? 0 : Math.round((checkedIn / registrations) * 100);

  const topEvents = await prisma.event.findMany({
    where: {
      organizationId: organization.id,
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
    summary: {
      events,

      opportunities,

      registrations,

      applications,

      checkedIn,

      attendanceRate,
    },

    growth: {
      events: calculateGrowth(events, previousEvents),

      opportunities: calculateGrowth(opportunities, previousOpportunities),

      registrations: calculateGrowth(registrations, previousRegistrations),

      applications: calculateGrowth(applications, previousApplications),
    },

    monthlyTrend: {
      events: eventTrend,

      opportunities: opportunityTrend,

      registrations: registrationTrend,

      applications: applicationTrend,
    },

    topEvents,

    month,

    year: currentYear,
  };
};
/*
|--------------------------------------------------------------------------
| Admin Analytics
|--------------------------------------------------------------------------
*/

export const getAdminAnalytics = async (month?: number, year?: number) => {
  const currentYear = year ?? new Date().getFullYear();

  const dateFilter = getDateRange(month, currentYear);

  const previous = month ? getPreviousMonth(month, currentYear) : undefined;

  const previousDateFilter = previous
    ? getDateRange(previous.month, previous.year)
    : undefined;

  const [
    students,

    organizations,

    events,

    opportunities,

    registrations,

    applications,

    previousStudents,

    previousOrganizations,

    previousEvents,

    previousOpportunities,

    previousRegistrations,

    previousApplications,

    studentTrend,

    organizationTrend,

    eventTrend,

    opportunityTrend,

    registrationTrend,

    applicationTrend,
  ] = await Promise.all([
    /*
    |--------------------------------------------------------------------------
    | Current Month
    |--------------------------------------------------------------------------
    */

    prisma.user.count({
      where: {
        role: {
          roleName: "STUDENT",
        },

        ...(dateFilter && {
          createdAt: dateFilter,
        }),
      },
    }),

    prisma.organization.count({
      where: {
        ...(dateFilter && {
          createdAt: dateFilter,
        }),
      },
    }),

    prisma.event.count({
      where: {
        ...(dateFilter && {
          createdAt: dateFilter,
        }),
      },
    }),

    prisma.opportunity.count({
      where: {
        ...(dateFilter && {
          createdAt: dateFilter,
        }),
      },
    }),

    prisma.eventRegistration.count({
      where: {
        ...(dateFilter && {
          registeredAt: dateFilter,
        }),
      },
    }),

    prisma.application.count({
      where: {
        ...(dateFilter && {
          appliedAt: dateFilter,
        }),
      },
    }),

    /*
    |--------------------------------------------------------------------------
    | Previous Month
    |--------------------------------------------------------------------------
    */

    prisma.user.count({
      where: {
        role: {
          roleName: "STUDENT",
        },

        ...(previousDateFilter && {
          createdAt: previousDateFilter,
        }),
      },
    }),

    prisma.organization.count({
      where: {
        ...(previousDateFilter && {
          createdAt: previousDateFilter,
        }),
      },
    }),

    prisma.event.count({
      where: {
        ...(previousDateFilter && {
          createdAt: previousDateFilter,
        }),
      },
    }),

    prisma.opportunity.count({
      where: {
        ...(previousDateFilter && {
          createdAt: previousDateFilter,
        }),
      },
    }),

    prisma.eventRegistration.count({
      where: {
        ...(previousDateFilter && {
          registeredAt: previousDateFilter,
        }),
      },
    }),

    prisma.application.count({
      where: {
        ...(previousDateFilter && {
          appliedAt: previousDateFilter,
        }),
      },
    }),

    /*
    |--------------------------------------------------------------------------
    | Monthly Trends
    |--------------------------------------------------------------------------
    */

    getMonthlyTrend(
      prisma.user,

      "createdAt",

      {
        role: {
          roleName: "STUDENT",
        },
      },

      currentYear,
    ),

    getMonthlyTrend(
      prisma.organization,

      "createdAt",

      {},

      currentYear,
    ),

    getMonthlyTrend(
      prisma.event,

      "createdAt",

      {},

      currentYear,
    ),

    getMonthlyTrend(
      prisma.opportunity,

      "createdAt",

      {},

      currentYear,
    ),

    getMonthlyTrend(
      prisma.eventRegistration,

      "registeredAt",

      {},

      currentYear,
    ),

    getMonthlyTrend(
      prisma.application,

      "appliedAt",

      {},

      currentYear,
    ),
  ]);

  return {
    summary: {
      students,

      organizations,

      events,

      opportunities,

      registrations,

      applications,
    },

    growth: {
      students: calculateGrowth(students, previousStudents),

      organizations: calculateGrowth(organizations, previousOrganizations),

      events: calculateGrowth(events, previousEvents),

      opportunities: calculateGrowth(opportunities, previousOpportunities),

      registrations: calculateGrowth(registrations, previousRegistrations),

      applications: calculateGrowth(applications, previousApplications),
    },

    monthlyTrend: {
      students: studentTrend,

      organizations: organizationTrend,

      events: eventTrend,

      opportunities: opportunityTrend,

      registrations: registrationTrend,

      applications: applicationTrend,
    },

    month,

    year: currentYear,
  };
};
