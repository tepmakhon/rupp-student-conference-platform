import { Request, Response } from "express";

import * as activityService from "./activity.service.js";

import { successResponse, errorResponse } from "../../utils/apiResponse.js";

export const getMyActivityHistoryController = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = req.user!;

    const history = await activityService.getMyActivityHistory(BigInt(user.id));

    return successResponse(
      res,

      history,

      "Activity history retrieved",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};
