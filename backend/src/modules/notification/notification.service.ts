import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { getPagination } from "../../utils/pagination.js";

/*
|--------------------------------------------------------------------------
| Get My Notifications
|--------------------------------------------------------------------------
*/

export const getMyNotifications = async (
  userId: bigint,
  page = 1,
  limit = 10
) => {

  if (page < 1 || limit < 1) {
    throw new AppError(
      "Invalid pagination values",
      400
    );
  }

  const { skip } =
    getPagination(page, limit);

  const [
    userNotifications,
    total,
  ] = await Promise.all([

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

/*
|--------------------------------------------------------------------------
| Mark Notification As Read
|--------------------------------------------------------------------------
*/

export const markAsRead = async (
  notificationId: bigint,
  userId: bigint
) => {

  const notification =
    await prisma.userNotification.findFirst({
      where: {
        id: notificationId,
        userId,
      },
    });

  if (!notification) {
    throw new AppError(
      "Notification not found",
      404
    );
  }

  return prisma.userNotification.update({
    where: {
      id: notificationId,
    },

    data: {
      isRead: true,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Mark All Notifications As Read
|--------------------------------------------------------------------------
*/

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
| Create Notification Helper
|--------------------------------------------------------------------------
*/

export const createNotification = async (
  userId: bigint,
  title: string,
  message: string,
  type:
    | "EVENT"
    | "OPPORTUNITY"
    | "SYSTEM" = "SYSTEM"
) => {

  const user =
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  const notification =
    await prisma.notification.create({
      data: {
        title,
        message,
        type,
      },
    });

  await prisma.userNotification.create({
    data: {
      userId,
      notificationId:
        notification.id,
    },
  });

  return notification;
};