import { Request, Response, NextFunction } from "express";

import * as recommendationService from "./recommendation.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getRecommendations = async (
  req: Request,

  res: Response,

  next: NextFunction,
) => {
  try {
    const data = await recommendationService.getRecommendations(
      BigInt(req.user!.id),
    );

    return successResponse(
      res,

      data,

      "Recommendations fetched",
    );
  } catch (error) {
    next(error);
  }
};
