import { Request, Response } from "express";

import * as badgeService from "./badge.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getMyBadges = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const data = await badgeService.getMyBadges(BigInt(user.id));

    return successResponse(res, data, "Badges retrieved");
  } catch (error) {
    throw error;
  }
};
