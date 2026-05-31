import { Request, Response } from "express";

import * as dashboardService
from "./dashboard.service.js";

export const adminDashboard =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const data =
        await dashboardService.getAdminDashboard();

      res.json({
        success: true,
        data,
      });

    } catch (error: any) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
};

export const organizationDashboard =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        (req as any).user;

      const data =
        await dashboardService.getOrganizationDashboard(
          BigInt(user.id)
        );

      res.json({
        success: true,
        data,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }
};

export const studentDashboard =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        (req as any).user;

      const data =
        await dashboardService.getStudentDashboard(
          BigInt(user.id)
        );

      res.json({
        success: true,
        data,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }
};