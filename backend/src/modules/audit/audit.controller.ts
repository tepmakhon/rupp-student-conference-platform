import { Request, Response } from "express";
import * as auditService from "./audit.service.js";

export const getAuditLogs = async (
  req: Request,
  res: Response
) => {
  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const result =
      await auditService.getAllAuditLogs(
        page,
        limit
      );

    res.json({
      success: true,
      logs: result.logs,
      pagination: result.pagination,
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

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const result =
      await auditService.getAuditLogsByUser(
        userId,
        page,
        limit
      );

    res.json({
      success: true,
      logs: result.logs,
      pagination: result.pagination,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};