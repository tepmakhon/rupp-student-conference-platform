import { Request, Response } from "express";

import * as attendanceService from "./attendance.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

export const checkIn = async (
  req: Request,
  res: Response
) => {
  try {

    const eventIdParam =
      req.params.eventId;

    if (
      !eventIdParam ||
      Array.isArray(eventIdParam)
    ) {
      throw new Error(
        "Invalid eventId"
      );
    }

    const eventId =
      BigInt(eventIdParam);

    const user =
      (req as any).user;

    const attendance =
      await attendanceService.checkInEvent(
        eventId,
        BigInt(user.id)
      );

    return successResponse(
      res,
      attendance,
      "Check-in successful"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 400
    );

  }
};