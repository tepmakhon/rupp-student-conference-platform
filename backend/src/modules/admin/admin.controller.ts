import { Request, Response } from "express";

import * as adminService from "./admin.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getSystemStatsController = async (req: Request, res: Response) => {
  try {
    const stats = await adminService.getSystemStats();

    return successResponse(res, stats, "System statistics retrieved");
  } catch (error) {
    throw error;
  }
};
