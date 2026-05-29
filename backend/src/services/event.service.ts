import { prisma } from "../config/prisma.js";

/**
 * CREATE EVENT (Organization only)
 */
export const createEvent = async (data: any, organizationId: bigint) => {
  const { title, description, location, eventDate, categoryId, capacity } =
    data;

  const event = await prisma.event.create({
    data: {
      title,
      description,
      location,
      eventDate: new Date(eventDate),
      categoryId,
      capacity,
      organizationId,
    },
  });

  return event;
};

/**
 * GET ALL EVENTS
 */
export const getAllEvents = async () => {
  return await prisma.event.findMany({
    include: {
      organization: true,
      category: true,
    },
    orderBy: {
      eventDate: "asc",
    },
  });
};

/**
 * REGISTER FOR EVENT
 */
export const registerEvent = async (eventId: bigint, studentId: bigint) => {
  // check capacity
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      registrations: true,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.capacity && event.registrations.length >= event.capacity) {
    throw new Error("Event is full");
  }

  const registration = await prisma.eventRegistration.create({
    data: {
      eventId,
      studentId,
    },
  });

  return registration;
};