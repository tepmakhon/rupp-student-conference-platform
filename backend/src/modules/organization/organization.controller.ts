import { Request, Response } from "express";

import {
  getMyOrganization,
  updateOrganizationLogo,
} from "./organization.service.js";

import { successResponse, errorResponse } from "../../utils/apiResponse.js";

export const getOrganizationProfile = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const organization = await getMyOrganization(BigInt(user.id));

    return successResponse(res, organization, "Organization profile retrieved");
  } catch (error: any) {
    return errorResponse(res, error.message, error.statusCode || 400);
  }
};

export const updateLogo = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const organization = await updateOrganizationLogo(
      BigInt(user.id),
      req.body.logoUrl,
    );

    return successResponse(res, organization, "Organization logo updated");
  } catch (error: any) {
    return errorResponse(res, error.message, error.statusCode || 400);
  }
};
