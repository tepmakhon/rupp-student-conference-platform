import { Request, Response } from "express";

import * as adminService from "./admin.service.js";

import { successResponse, errorResponse } from "../../utils/apiResponse.js";

export const getSystemStatsController = async (req: Request, res: Response) => {
  try {
    const stats = await adminService.getSystemStats();

    return successResponse(res, stats, "System statistics retrieved");
  } catch (error: any) {
    return errorResponse(res, error.message, error.statusCode || 500);
  }
};
