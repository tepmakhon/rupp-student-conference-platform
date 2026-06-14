import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { getPagination } from "../../utils/pagination.js";

import {
  createNotification,
} from "../notification/notification.service.js";

import {
  createAuditLog,
} from "../audit/audit.service.js";

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
      "Only organization can create events",
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
        capacity: data.capacity,
        bannerImageUrl:
          data.bannerImageUrl || null,
        organizationId:
          organization.id,
      },
    });

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
        } as any,

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
        } as any,
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
| Get Event By Id
|--------------------------------------------------------------------------
*/

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
| Pending Events
|--------------------------------------------------------------------------
*/

export const getPendingEvents =
  async () => {

    return prisma.event.findMany({
      where: {
        status: "PENDING",
      } as any,

      include: {
        organization: true,
        category: true,
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
      } as any,

      include: {
        organization: true,
      },
    });

  await createNotification(
    event.organization.userId,
    "Event Approved",
    `${event.title} has been approved by admin`
  );

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
      } as any,

      include: {
        organization: true,
      },
    });

  await createNotification(
    event.organization.userId,
    "Event Rejected",
    `${event.title} has been rejected by admin`
  );

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
    event.registrations.length >= event.capacity
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
        registrationStatus: "APPROVED",
      },
    });

  await createNotification(
    event.organization.userId,
    "New Event Registration",
    "A student registered for your event"
  );

  await createAuditLog(
    userId,
    `EVENT_REGISTERED:${event.title}`
  );

  return registration;
};