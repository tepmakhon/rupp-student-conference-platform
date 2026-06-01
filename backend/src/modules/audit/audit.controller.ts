import { Request, Response } from "express";
import * as auditService from "./audit.service.js";

export const getAuditLogs = async (
  req: Request,
  res: Response
) => {
  try {
    const logs =
      await auditService.getAllAuditLogs();

    res.json({
      success: true,
      logs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyAuditLogs = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = BigInt(
      (req as any).user.id
    );

    const logs =
      await auditService.getAuditLogsByUser(
        userId
      );

    res.json({
      success: true,
      logs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};