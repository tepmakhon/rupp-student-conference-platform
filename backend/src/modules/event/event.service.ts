import { prisma } from "../../config/prisma.js";
import { createNotification } from "../notification/notification.service.js";

export const createEvent = async (data: any, user: any) => {
  const organization = await prisma.organization.findUnique({
    where: {
      userId: BigInt(user.id),
    },
  });

  if (!organization) {
    throw new Error("Only organization can create events");
  }

  return prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      eventDate: new Date(data.eventDate),
      categoryId: BigInt(data.categoryId),
      capacity: data.capacity,
      organizationId: organization.id,
    },
  });
};

export const getApprovedEvents = async () => {
  return prisma.event.findMany({
    where: {
      status: "APPROVED",
    } as any,
    include: {
      organization: true,
      category: true,
    },
  });
};

export const getPendingEvents = async () => {
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

export const approveEvent = async (eventId: bigint) => {

  const event = await prisma.event.update({
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

  return event;
};
export const rejectEvent = async (eventId: bigint) => {

  const event = await prisma.event.update({
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

  return event;
};

export const registerForEvent = async (
  eventId: bigint,
  userId: bigint
) => {

  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new Error("Student profile not found");
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      registrations: true,
      organization: true,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.status !== "APPROVED") {
    throw new Error("Event is not approved");
  }

  const existingRegistration =
    await prisma.eventRegistration.findFirst({
      where: {
        eventId,
        studentId: student.id,
      },
    });

  if (existingRegistration) {
    throw new Error("Already registered");
  }

  if (
    event.capacity &&
    event.registrations.length >= event.capacity
  ) {
    throw new Error("Event is full");
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

  return registration;
};