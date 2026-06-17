import { Request, Response } from "express";

import * as leaderboardService
from "./leaderboard.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

export const getLeaderboard =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const page =

        Number(req.query.page)

        || 1;

      const limit =

        Number(req.query.limit)

        || 10;

      const data =

        await leaderboardService.getLeaderboard(

          page,

          limit

        );

      return successResponse(

        res,

        data,

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