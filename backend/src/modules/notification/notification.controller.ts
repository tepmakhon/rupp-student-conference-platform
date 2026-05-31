import { Request, Response } from "express";

import * as notificationService from "./notification.service.js";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const notifications = await notificationService.getMyNotifications(
      BigInt(user.id),
    );

    res.json({
      success: true,
      notifications,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readNotification = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const notificationId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    (await notificationService.markAsRead(
      BigInt(notificationId),
      BigInt(user.id),
    )) as any;

    res.json({
      success: true,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readAllNotifications = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    await notificationService.markAllAsRead(BigInt(user.id));

    res.json({
      success: true,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
