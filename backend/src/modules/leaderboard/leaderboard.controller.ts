import { Request, Response } from "express";

import * as leaderboardService
from "./leaderboard.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

export const getLeaderboard = async (
  req: Request,
  res: Response
) => {
  try {

    const students =
      await leaderboardService.getLeaderboard();

    return successResponse(
      res,
      students,
      "Leaderboard retrieved"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 500
    );

  }
};