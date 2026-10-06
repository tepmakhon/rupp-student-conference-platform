import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { getPagination } from "../../utils/pagination.js";

import {
  createNotification,
  notifyAdmins,
} from "../notification/notification.service.js";

import { createAuditLog } from "../audit/audit.service.js";

import { addActivityScore } from "../activity/activityScore.service.js";

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

export const createEvent = async (data: any, user: any) => {
  const organization = await prisma.organization.findUnique({
    where: {
      userId: BigInt(user.id),
    },
  });

  if (!organization) {
    throw new AppError("Only organizations can create events", 403);
  }

  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      eventDate: new Date(data.eventDate),
      categoryId: BigInt(data.categoryId),
      capacity: data.capacity || null,
      bannerImageUrl: data.bannerImageUrl || null,
      organizationId: organization.id,
    },
  });
  await notifyAdmins(
    "New Event Request",

    `${event.title} needs approval`,

    "EVENT",
  );
  refreshOrganizationDashboard(organization.userId);

  refreshAdminDashboard();

  await createAuditLog(BigInt(user.id), `EVENT_CREATED:${event.title}`);

  return event;
};

/*
|--------------------------------------------------------------------------
| Get Approved Events
|--------------------------------------------------------------------------
*/

export const getApprovedEvents = async (
  page = 1,
  limit = 10,
  keyword = "",
  categoryId?: bigint,
) => {
  const { skip } = getPagination(page, limit);

  const where: any = {
    status: "APPROVED",
    eventDate: {
      gte: new Date(),
    },
  };

  if (keyword) {
    where.OR = [
      {
        title: {
          contains: keyword,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: keyword,
          mode: "insensitive",
        },
      },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  const [events, total] = await Promise.all([
    prisma.event.findMany({
      where,

      include: {
        organization: true,
        category: true,
      },

      skip,
      take: limit,

      orderBy: {
        eventDate: "asc",
      },
    }),

    prisma.event.count({
      where,
    }),
  ]);

  return {
    events,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
/*
|--------------------------------------------------------------------------
| Get Event By ID
|--------------------------------------------------------------------------
*/

export const getMyEvents = async (userId: bigint) => {
  const organization = await prisma.organization.findUnique({
    where: {
      userId,
    },
  });

  if (!organization) {
    throw new AppError(
      "Organization not found",

      404,
    );
  }

  return prisma.event.findMany({
    where: {
      organizationId: organization.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getEventById = async (eventId: bigint, user?: { id: string; roleName: string }) => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },

    include: {
      organization: true,
      category: true,
      _count: { select: { registrations: true } },
    },
  });

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.status !== "APPROVED" && user?.roleName !== "ADMIN" &&
      event.organization.userId.toString() !== user?.id) {
    throw new AppError("Event not found", 404);
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

export const approveEvent = async (eventId: bigint, actorId: bigint) => {
  const existingEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!existingEvent) {
    throw new AppError("Event not found", 404);
  }

  const event = await prisma.event.update({
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
    "EVENT",
  );
  refreshOrganizationDashboard(event.organization.userId);

  refreshAdminDashboard();
  await createAuditLog(
    actorId,
    `EVENT_APPROVED:${event.title}`,
  );

  return event;
};

/*
|--------------------------------------------------------------------------
| Reject Event
|--------------------------------------------------------------------------
*/

export const rejectEvent = async (eventId: bigint, actorId: bigint, reason: string) => {
  const existingEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!existingEvent) {
    throw new AppError("Event not found", 404);
  }

  const event = await prisma.event.update({
    where: {
      id: eventId,
    },

    data: {
      status: "REJECTED",
      approvedAt: null,
    },

    include: {
      organization: true,
    },
  });

  await createNotification(
    event.organization.userId,
    "Event Rejected",
    `${event.title} has been rejected: ${reason}`,
    "EVENT",
  );
  refreshOrganizationDashboard(event.organization.userId);

  refreshAdminDashboard();
  await createAuditLog(
    actorId,
    `EVENT_REJECTED:${event.id}:${event.title}:${reason}`,
  );

  return event;
};

/*
|--------------------------------------------------------------------------
| Register For Event
|--------------------------------------------------------------------------
*/

export const registerForEvent = async (eventId: bigint, userId: bigint) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new AppError("Please complete your student profile first", 400);
  }

  // Serialize registrations for this event before checking remaining seats.
  const { event, registration } = await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM events WHERE id = ${eventId} FOR UPDATE`;
    const event = await tx.event.findUnique({ where: { id: eventId }, include: { organization: true } });
    if (!event) throw new AppError("Event not found", 404);
    if (event.status !== "APPROVED") throw new AppError("Event is not approved", 400);
    if (event.eventDate < new Date()) throw new AppError("This event has already ended", 400);
    const existing = await tx.eventRegistration.findUnique({
      where: { eventId_studentId: { eventId, studentId: student.id } },
    });
    if (existing) throw new AppError("Already registered", 409);
    const count = await tx.eventRegistration.count({ where: { eventId, registrationStatus: { not: "CANCELLED" } } });
    if (event.capacity !== null && count >= event.capacity) throw new AppError("Event is full", 400);
    const registration = await tx.eventRegistration.create({
      data: { eventId, studentId: student.id, registrationStatus: "APPROVED" },
    });
    await addActivityScore(student.id, 10, `Registered for ${event.title}`, tx);
    return { event, registration };
  });

  await createNotification(userId, "Registration confirmed", `You are registered for ${event.title}`, "EVENT");
  await createNotification(
    event.organization.userId,
    "New Event Registration",
    `A student registered for ${event.title}`,
    "EVENT",
  );
  refreshStudentDashboard(userId);

  refreshOrganizationDashboard(event.organization.userId);

  refreshAdminDashboard();
  await createAuditLog(userId, `EVENT_REGISTERED:${event.title}`);

  return registration;
};

export const getMyRegistrations = async (userId: bigint) => {
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

  return prisma.eventRegistration.findMany({
    where: {
      studentId: student.id,
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

export const updateEvent = async (
  eventId: bigint,
  userId: bigint,
  data: any,
) => {
  const organization = await prisma.organization.findUnique({
    where: {
      userId,
    },
  });

  if (!organization) {
    throw new AppError(
      "Organization not found",

      404,
    );
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new AppError(
      "Event not found",

      404,
    );
  }

  if (event.organizationId !== organization.id) {
    throw new AppError(
      "Not authorized",

      403,
    );
  }

  return prisma.event.update({
    where: {
      id: eventId,
    },

    data: {
      status: "PENDING",
      approvedAt: null,
      title: data.title,

      description: data.description,

      location: data.location,

      categoryId: data.categoryId ? BigInt(data.categoryId) : undefined,

      capacity: data.capacity,

      bannerImageUrl: data.bannerImageUrl,

      eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Delete Event
|--------------------------------------------------------------------------
*/

export const deleteEvent = async (eventId: bigint, userId: bigint) => {
  const organization = await prisma.organization.findUnique({
    where: {
      userId,
    },
  });

  if (!organization) {
    throw new AppError(
      "Organization not found",

      404,
    );
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    throw new AppError(
      "Event not found",

      404,
    );
  }

  if (event.organizationId !== organization.id) {
    throw new AppError(
      "Not authorized",

      403,
    );
  }

  /*
    |--------------------------------------------------------------------------
    | Delete child records first
    |--------------------------------------------------------------------------
    */

  await prisma.$transaction(async (tx) => {
    await tx.attendanceRecord.deleteMany({ where: { registration: { eventId } } });
    await tx.eventRegistration.deleteMany({ where: { eventId } });
    await tx.event.delete({ where: { id: eventId } });
  });

  return true;
};

export const getEventRegistrations = async (
  eventId: bigint,
  userId: bigint,
) => {
  const organization = await prisma.organization.findUnique({
    where: {
      userId,
    },
  });

  if (!organization) {
    throw new AppError(
      "Organization not found",

      404,
    );
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event || event.organizationId !== organization.id) {
    throw new AppError(
      "Not authorized",

      403,
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
