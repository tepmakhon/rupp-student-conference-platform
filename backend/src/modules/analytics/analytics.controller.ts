import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as analyticsService
from "./analytics.service.js";

import {
  successResponse,
} from "../../utils/apiResponse.js";

export const getStudentAnalytics =
async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const data =
      await analyticsService.getStudentAnalytics(
        BigInt(req.user!.id)
      );

    return successResponse(
      res,
      data,
      "Student analytics"
    );

  }

  catch (error) {

    next(error);

  }

};

export const getOrganizationAnalytics =
async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const data =
      await analyticsService.getOrganizationAnalytics(
        BigInt(req.user!.id)
      );

    return successResponse(
      res,
      data,
      "Organization analytics"
    );

  }

  catch (error) {

    next(error);

  }

};

export const getAdminAnalytics =
async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const data =
      await analyticsService.getAdminAnalytics();

    return successResponse(
      res,
      data,
      "Platform analytics"
    );

  }

  catch (error) {

    next(error);

  }

};