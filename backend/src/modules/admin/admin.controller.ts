import { Request, Response } from "express";

import * as adminService from "./admin.service.js";

export const getSystemStatsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const stats =
        await adminService.getSystemStats();

      res.status(200).json({
        success: true,
        stats,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };