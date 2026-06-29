import { Request, Response } from "express";

import * as attendanceService from "./attendance.service.js";

import * as attendanceExport from "./attendance.export.js";

import * as attendancePdf from "./attendance.pdf.js";

import { successResponse, errorResponse } from "../../utils/apiResponse.js";

export const checkIn = async (req: Request, res: Response) => {
  try {
    const eventIdParam = req.params.eventId;

    if (!eventIdParam || Array.isArray(eventIdParam)) {
      throw new Error("Invalid eventId");
    }

    const eventId = BigInt(eventIdParam);

    const user = req.user!;

    const attendance = await attendanceService.checkInEvent(
      eventId,
      BigInt(user.id),
    );

    return successResponse(res, attendance, "Check-in successful");
  } catch (error: any) {
    return errorResponse(res, error.message, error.statusCode || 400);
  }
};

export const getMyAttendance = async (req: Request, res: Response) => {
  try {
    const data = await attendanceService.getMyAttendance(BigInt(req.user!.id));

    return successResponse(res, data, "Attendance retrieved");
  } catch (error: any) {
    return errorResponse(res, error.message, error.statusCode || 400);
  }
};

export const scanAttendance = async (req: Request, res: Response) => {
  try {
    const { registrationId } = req.body;

    const data = await attendanceService.scanAttendance(
      BigInt(registrationId),
      BigInt(req.user!.id),
    );

    return successResponse(res, data, "Attendance verified");
  } catch (error: any) {
    return errorResponse(res, error.message, error.statusCode || 400);
  }
};

/*
|--------------------------------------------------------------------------
| Attendance Statistics
|--------------------------------------------------------------------------
*/

export const getAttendanceStatistics = async (req: Request, res: Response) => {
  try {
    const eventIdParam = req.params.eventId;

    if (!eventIdParam || Array.isArray(eventIdParam)) {
      throw new Error("Invalid eventId");
    }

    const eventId = BigInt(eventIdParam);

    const statistics = await attendanceService.getAttendanceStatistics(eventId);

    return successResponse(
      res,

      statistics,

      "Attendance statistics retrieved",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};

/*
|--------------------------------------------------------------------------
| Export CSV
|--------------------------------------------------------------------------
*/

export const exportAttendanceCSV = async (
  req: Request,

  res: Response,
) => {
  try {
    const eventIdParam = req.params.eventId;

    if (!eventIdParam || Array.isArray(eventIdParam)) {
      throw new Error("Invalid eventId");
    }

    const eventId = BigInt(eventIdParam);

    await attendanceExport.exportCSV(eventId, res);
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};

/*
|--------------------------------------------------------------------------
| Export PDF
|--------------------------------------------------------------------------
*/

export const exportAttendancePDF = async (req: Request, res: Response) => {
  try {
    const eventIdParam = req.params.eventId;

    if (!eventIdParam || Array.isArray(eventIdParam)) {
      throw new Error("Invalid eventId");
    }

    const eventId = BigInt(eventIdParam);

    await attendancePdf.exportPDF(
      eventId,

      res,
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};
