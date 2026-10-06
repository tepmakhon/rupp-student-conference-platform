import { prisma } from "../config/prisma.js";
import { AppError } from "./AppError.js";

export const requireEventOwner = async (eventId: bigint, userId: bigint) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { organization: { select: { userId: true } } },
  });
  if (!event) throw new AppError("Event not found", 404);
  if (event.organization.userId !== userId) throw new AppError("Not authorized", 403);
  return event;
};
