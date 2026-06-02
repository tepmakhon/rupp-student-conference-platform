import { prisma } from "../../config/prisma.js";

export const getMyNotifications = async (
  userId: bigint,
  page = 1,
  limit = 10,
) => {
  const skip = (page - 1) * limit;

  const [userNotifications, total] = await Promise.all([
    prisma.userNotification.findMany({
      where: {
        userId,
      },

      include: {
        notification: true,
      },

      skip,
      take: limit,

      orderBy: {
        notification: {
          createdAt: "desc",
        },
      },
    }),

    prisma.userNotification.count({
      where: {
        userId,
      },
    }),
  ]);
  return {
      userNotifications,
      pagination: {
        page,
        limit,
        total,
        totalPages:
          Math.ceil(total / limit),
      },

    };
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
      }as any,
    });

  await prisma.userNotification.create({
    data: {
      userId,
      notificationId: notification.id,
    },
  });

  return notification;
};