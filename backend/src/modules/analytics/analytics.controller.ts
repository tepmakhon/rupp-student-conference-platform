import { Request, Response, NextFunction } from "express";

import * as analyticsService from "./analytics.service.js";

import { successResponse } from "../../utils/apiResponse.js";

const getMonthYear = (req: Request) => {
  return {
    month: req.query.month ? Number(req.query.month) : undefined,

    year: req.query.year ? Number(req.query.year) : undefined,
  };
};

/*
|--------------------------------------------------------------------------
| Student
|--------------------------------------------------------------------------
*/

export const getStudentAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { month, year } = getMonthYear(req);

    const data = await analyticsService.getStudentAnalytics(
      BigInt(req.user!.id),
      month,
      year,
    );

    return successResponse(res, data, "Student analytics");
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Organization
|--------------------------------------------------------------------------
*/

export const getOrganizationAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { month, year } = getMonthYear(req);

    const data = await analyticsService.getOrganizationAnalytics(
      BigInt(req.user!.id),
      month,
      year,
    );

    return successResponse(res, data, "Organization analytics");
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

export const getAdminAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { month, year } = getMonthYear(req);

    const data = await analyticsService.getAdminAnalytics(month, year);

    return successResponse(res, data, "Platform analytics");
  } catch (error) {
    next(error);
  }
};
