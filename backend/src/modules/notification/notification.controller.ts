import { Request, Response } from "express";

import * as notificationService from "./notification.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const page = Number(req.query.page ?? 1);

    const limit = Number(req.query.limit ?? 10);

    const notifications = await notificationService.getMyNotifications(
      BigInt(user.id),

      page,

      limit,
    );

    return successResponse(
      res,

      notifications,

      "Notifications retrieved",
    );
  } catch (error) {
    throw error;
  }
};

export const readNotification = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const notificationId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    await notificationService.markAsRead(
      BigInt(notificationId),
      BigInt(user.id),
    );

    return successResponse(res, null, "Notification marked as read");
  } catch (error) {
    throw error;
  }
};

export const readAllNotifications = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    await notificationService.markAllAsRead(BigInt(user.id));

    return successResponse(res, null, "All notifications marked as read");
  } catch (error) {
    throw error;
  }
};
