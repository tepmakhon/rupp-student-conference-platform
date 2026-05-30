import { prisma } from "../../config/prisma.js";

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
  return prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      status: "APPROVED",
      approvedAt: new Date(),
    } as any,
  });
};

export const rejectEvent = async (eventId: bigint) => {
  return prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      status: "REJECTED",
      approvedAt: new Date(),
    } as any,
  });
};
