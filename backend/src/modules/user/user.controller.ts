import { Request, Response } from "express";

import * as userService from "./user.service.js";

import { createProfileSchema, updateProfileSchema } from "./user.validation.js";

import { successResponse, errorResponse } from "../../utils/apiResponse.js";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    roleId: string;
    roleName: string;
  };
}

export const createProfile = async (req: AuthRequest, res: Response) => {
  try {
    const data = createProfileSchema.parse(req.body);

    const profile = await userService.createProfile(BigInt(req.user!.id), data);

    return successResponse(res, profile, "Profile created successfully");
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const getMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await userService.getProfile(BigInt(req.user!.id));

    return successResponse(res, profile, "Profile fetched successfully");
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    const data = updateProfileSchema.parse(req.body);

    const profile = await userService.updateProfile(BigInt(req.user!.id), data);

    return successResponse(res, profile, "Profile updated successfully");
  } catch (error: any) {
    return errorResponse(res, error.message, 400);
  }
};
