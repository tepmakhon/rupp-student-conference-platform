import { Request, Response } from "express";
import * as attendanceService from "./attendance.service.js";

export const checkIn = async (req: Request, res: Response) => {
  try {
    const eventIdParam = req.params.eventId;
    if (!eventIdParam || Array.isArray(eventIdParam)) {
      throw new Error("Invalid eventId");
    }
    const eventId = BigInt(eventIdParam);

    const user = (req as any).user;

    const attendance = await attendanceService.checkInEvent(
      eventId,
      BigInt(user.id),
    );

    res.json({
      success: true,
      attendance,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
