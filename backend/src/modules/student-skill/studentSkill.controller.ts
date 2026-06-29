import { Request, Response, NextFunction } from "express";

import * as studentSkillService from "./studentSkill.service.js";

import { successResponse } from "../../utils/apiResponse.js";

/*
|--------------------------------------------------------------------------
| Get My Skills
|--------------------------------------------------------------------------
*/

export const getMySkills = async (
  req: Request,

  res: Response,

  next: NextFunction,
) => {
  try {
    const data = await studentSkillService.getMySkills(BigInt(req.user!.id));

    return successResponse(
      res,

      data,

      "Skills fetched",
    );
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update My Skills
|--------------------------------------------------------------------------
*/

export const updateMySkills = async (
  req: Request,

  res: Response,

  next: NextFunction,
) => {
  try {
    const data = await studentSkillService.updateMySkills(
      BigInt(req.user!.id),

      req.body.skillIds || [],
    );

    return successResponse(
      res,

      data,

      "Skills updated",
    );
  } catch (error) {
    next(error);
  }
};
