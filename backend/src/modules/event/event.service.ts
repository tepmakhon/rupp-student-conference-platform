import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { getPagination } from "../../utils/pagination.js";

import {
  createNotification,
  notifyAdmins,
} from "../notification/notification.service.js";

import {
  createAuditLog,
} from "../audit/audit.service.js";

import {
  addActivityScore,
} from "../activity/activityScore.service.js";

import {
  refreshAdminDashboard,
  refreshOrganizationDashboard,
  refreshStudentDashboard,
} from "../../socket/dashboardEvents.js";
/*
|--------------------------------------------------------------------------
| Create Event
|--------------------------------------------------------------------------
*/

export const createEvent = async (
  data: any,
  user: any
) => {
  const organization =
    await prisma.organization.findUnique({
      where: {
        userId: BigInt(user.id),
      },
    });

  if (!organization) {
    throw new AppError(
      "Only organizations can create events",
      403
    );
  }

  const event =
    await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        eventDate: new Date(data.eventDate),
        categoryId: BigInt(data.categoryId),
        capacity: data.capacity || null,
        bannerImageUrl:
          data.bannerImageUrl || null,
        organizationId:
          organization.id,
      },
    });
    await notifyAdmins(

      "New Event Request",

      `${event.title} needs approval`,

      "EVENT"

    );
  refreshOrganizationDashboard(
    organization.userId
  );

  refreshAdminDashboard();

  await createAuditLog(
    BigInt(user.id),
    `EVENT_CREATED:${event.title}`
  );

  return event;
};

/*
|--------------------------------------------------------------------------
| Get Approved Events
|--------------------------------------------------------------------------
*/

export const getApprovedEvents = async (
  page = 1,
  limit = 10
) => {
  const { skip } =
    getPagination(page, limit);

  const [events, total] =
    await Promise.all([
      prisma.event.findMany({
        where: {
          status: "APPROVED",
          eventDate: {
          gte: new Date(),
          },
        },

        include: {
          organization: true,
          category: true,
        },

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.event.count({
        where: {
          status: "APPROVED",
          eventDate: {
          gte: new Date(),
          },
        },
      }),
    ]);

  return {
    events,

    pagination: {
      page,
      limit,
      total,
      totalPages:
        Math.ceil(total / limit),
    },
  };
};

/*
|--------------------------------------------------------------------------
| Get Event By ID
|--------------------------------------------------------------------------
*/

export const getMyEvents = async (
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

  return prisma.event.findMany({

    where: {

      organizationId:

        organization.id,

    },

    orderBy: {

      createdAt: "desc",

    },

  });

};

export const getEventById = async (
  eventId: bigint
) => {
  const event =
    await prisma.event.findUnique({
      where: {
        id: eventId,
      },

      include: {
        organization: true,
        category: true,
        registrations: true,
      },
    });

  if (!event) {
    throw new AppError(
      "Event not found",
      404
    );
  }

  return event;
};

/*
|--------------------------------------------------------------------------
| Get Pending Events
|--------------------------------------------------------------------------
*/

export const getPendingEvents = async () => {
  return prisma.event.findMany({
    where: {
      status: "PENDING",
    },

    include: {
      organization: true,
      category: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

/*
|--------------------------------------------------------------------------
| Approve Event
|--------------------------------------------------------------------------
*/

export const approveEvent = async (
  eventId: bigint
) => {
  const existingEvent =
    await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

  if (!existingEvent) {
    throw new AppError(
      "Event not found",
      404
    );
  }

  const event =
    await prisma.event.update({
      where: {
        id: eventId,
      },

      data: {
        status: "APPROVED",
        approvedAt: new Date(),
      },

      include: {
        organization: true,
      },
    });

  await createNotification(
    event.organization.userId,
    "Event Approved",
    `${event.title} has been approved by admin`,
    "EVENT"
  );
  refreshOrganizationDashboard(
    event.organization.userId
  );

  refreshAdminDashboard();
  await createAuditLog(
    event.organization.userId,
    `EVENT_APPROVED:${event.title}`
  );

  return event;
};

/*
|--------------------------------------------------------------------------
| Reject Event
|--------------------------------------------------------------------------
*/

export const rejectEvent = async (
  eventId: bigint
) => {
  const existingEvent =
    await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

  if (!existingEvent) {
    throw new AppError(
      "Event not found",
      404
    );
  }

  const event =
    await prisma.event.update({
      where: {
        id: eventId,
      },

      data: {
        status: "REJECTED",
        approvedAt: new Date(),
      },

      include: {
        organization: true,
      },
    });

  await createNotification(
    event.organization.userId,
    "Event Rejected",
    `${event.title} has been rejected by admin`,
    "EVENT"
  );
  refreshOrganizationDashboard(
    event.organization.userId
  );

  refreshAdminDashboard();
  await createAuditLog(
    event.organization.userId,
    `EVENT_REJECTED:${event.title}`
  );

  return event;
};

/*
|--------------------------------------------------------------------------
| Register For Event
|--------------------------------------------------------------------------
*/

export const registerForEvent = async (
  eventId: bigint,
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
      "Please complete your student profile first",
      400
    );
  }

  const event =
    await prisma.event.findUnique({
      where: {
        id: eventId,
      },

      include: {
        registrations: true,
        organization: true,
      },
    });

  if (!event) {
    throw new AppError(
      "Event not found",
      404
    );
  }

  if (event.status !== "APPROVED") {
    throw new AppError(
      "Event is not approved",
      400
    );
  }

  if (
    new Date(
      event.eventDate
    ) < new Date()
  ) {
    throw new AppError(
      "This event has already ended",
      400
    );
  }
  
  const existingRegistration =
    await prisma.eventRegistration.findFirst({
      where: {
        eventId,
        studentId: student.id,
      },
    });

  if (existingRegistration) {
    throw new AppError(
      "Already registered",
      400
    );
  }

  if (
    event.capacity &&
    event.registrations.length >=
      event.capacity
  ) {
    throw new AppError(
      "Event is full",
      400
    );
  }

  const registration =
    await prisma.eventRegistration.create({
      data: {
        eventId,
        studentId: student.id,
        registrationStatus:
          "APPROVED",
      },
    });
  
  await addActivityScore(
    student.id,
    
    10,

    `Registered for ${event.title}`
  );

  await createNotification(
    event.organization.userId,
    "New Event Registration",
    `A student registered for ${event.title}`,
    "EVENT"
  );
  refreshStudentDashboard(userId);

  refreshOrganizationDashboard(
    event.organization.userId
  );

  refreshAdminDashboard();
  await createAuditLog(
    userId,
    `EVENT_REGISTERED:${event.title}`
  );

  return registration;
};

export const getMyRegistrations =
  async (
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

    return prisma.eventRegistration.findMany({

      where: {

        studentId:

          student.id,

      },

      include: {

        event: {

          include: {

            organization: true,

            category: true,

          },

        },

      },

      orderBy: {

        registeredAt: "desc",

      },

    });

};

/*
|--------------------------------------------------------------------------
| Update Event
|--------------------------------------------------------------------------
*/

export const updateEvent =
  async (
    eventId: bigint,
    userId: bigint,
    data: any
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

    const event =

      await prisma.event.findUnique({

        where: {

          id: eventId,

        },

      });

    if (!event) {

      throw new AppError(

        "Event not found",

        404

      );

    }

    if (

      event.organizationId !==

      organization.id

    ) {

      throw new AppError(

        "Not authorized",

        403

      );

    }

    return prisma.event.update({

      where: {

        id: eventId,

      },

      data: {

        title:

          data.title,

        description:

          data.description,

        location:

          data.location,

        categoryId:

          data.categoryId

          ? BigInt(data.categoryId)

          : undefined,

        capacity:

          data.capacity,

        bannerImageUrl:

          data.bannerImageUrl,

        eventDate:

          data.eventDate

          ? new Date(

              data.eventDate

            )

          : undefined,

      },

    });

};

/*
|--------------------------------------------------------------------------
| Delete Event
|--------------------------------------------------------------------------
*/

export const deleteEvent =
  async (
    eventId: bigint,
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

    const event =

      await prisma.event.findUnique({

        where: {

          id: eventId,

        },

      });

    if (!event) {

      throw new AppError(

        "Event not found",

        404

      );

    }

    if (

      event.organizationId !==

      organization.id

    ) {

      throw new AppError(

        "Not authorized",

        403

      );

    }

    /*
    |--------------------------------------------------------------------------
    | Delete child records first
    |--------------------------------------------------------------------------
    */

    await prisma.eventRegistration.deleteMany({

      where: {

        eventId,

      },

    });

    /*
    |--------------------------------------------------------------------------
    | Delete event
    |--------------------------------------------------------------------------
    */

    await prisma.event.delete({

      where: {

        id: eventId,

      },

    });

    return true;

};

export const getEventRegistrations =
  async (
    eventId: bigint,
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

    const event =

      await prisma.event.findUnique({

        where: {
          id: eventId,
        },

      });

    if (

      !event ||

      event.organizationId !==

      organization.id

    ) {

      throw new AppError(

        "Not authorized",

        403

      );

    }

   return prisma.eventRegistration.findMany({

    where: {
      eventId,
    },

    include: {

      attendanceRecord: true,

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

    },

    orderBy: {

      registeredAt: "desc",

    },

  });
};