import { prisma } from "../../config/prisma.js";

export const getMyNotifications = async (
  userId: bigint
) => {

  return prisma.userNotification.findMany({
    where: {
      userId,
    },

    include: {
      notification: true,
    },

    orderBy: {
      notification: {
        createdAt: "desc",
      },
    },
  });
};

export const markAsRead = async (
  notificationId: bigint,
  userId: bigint
) => {

  return prisma.userNotification.updateMany({
    where: {
      id: notificationId,
      userId,
    },

    data: {
      isRead: true,
    },
  });
};

export const markAllAsRead = async (
  userId: bigint
) => {

  return prisma.userNotification.updateMany({
    where: {
      userId,
      isRead: false,
    },

    data: {
      isRead: true,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

export const createNotification = async (
  userId: bigint,
  title: string,
  message: string
) => {

  const notification =
    await prisma.notification.create({
      data: {
        title,
        message,
      },
    });

  await prisma.userNotification.create({
    data: {
      userId,
      notificationId: notification.id,
    },
  });

  return notification;
};