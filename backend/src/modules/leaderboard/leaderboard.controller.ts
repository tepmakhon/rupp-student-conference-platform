import { Request, Response } from "express";

import * as leaderboardService
from "./leaderboard.service.js";

export const getLeaderboard =
  async (
    req: Request,
    res: Response
  ) => {

    const students =
      await leaderboardService.getLeaderboard();

    res.json({
      success: true,
      students,
    });
};