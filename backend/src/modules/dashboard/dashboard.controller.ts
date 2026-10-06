import { Request, Response } from "express";

import * as dashboardService from "./dashboard.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const adminDashboard = async (req: Request, res: Response) => {
  try {
    const data = await dashboardService.getAdminDashboard();

    return successResponse(res, data, "Admin dashboard retrieved");
  } catch (error) {
    throw error;
  }
};

export const organizationDashboard = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const data = await dashboardService.getOrganizationDashboard(
      BigInt(user.id),
    );

    return successResponse(res, data, "Organization dashboard retrieved");
  } catch (error) {
    throw error;
  }
};

export const studentDashboard = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const data = await dashboardService.getStudentDashboard(BigInt(user.id));

    return successResponse(res, data, "Student dashboard retrieved");
  } catch (error) {
    throw error;
  }
};
