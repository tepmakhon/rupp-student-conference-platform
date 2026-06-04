import { Request, Response } from "express";

import * as auditService from "./audit.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

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

    return successResponse(
      res,
      result,
      "Audit logs retrieved"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 500
    );

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

    return successResponse(
      res,
      result,
      "My audit logs retrieved"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 500
    );

  }
};