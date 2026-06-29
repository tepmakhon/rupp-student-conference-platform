import { Request, Response, NextFunction } from "express";

import * as profileService from "./profile.service.js";

import { successResponse } from "../../utils/apiResponse.js";

/*
|--------------------------------------------------------------------------
| Get My Profile
|--------------------------------------------------------------------------
*/

export const getMyProfile = async (
  req: Request,

  res: Response,

  next: NextFunction,
) => {
  try {
    const data = await profileService.getMyProfile(BigInt(req.user!.id));

    return successResponse(
      res,

      data,

      "Profile fetched",
    );
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update My Profile
|--------------------------------------------------------------------------
*/

export const updateMyProfile = async (
  req: Request,

  res: Response,

  next: NextFunction,
) => {
  try {
    const data = await profileService.updateMyProfile(
      BigInt(req.user!.id),

      req.body,
    );

    return successResponse(
      res,

      data,

      "Profile updated",
    );
  } catch (error) {
    next(error);
  }
};
