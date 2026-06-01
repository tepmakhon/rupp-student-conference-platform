import { Request, Response } from "express";

import {
  getMyOrganization,
  updateOrganizationLogo,
} from "./organization.service.js";

export const getOrganizationProfile =
  async (
    req: Request,
    res: Response
  ) => {
    try {

      const user =
        (req as any).user;

      const organization =
        await getMyOrganization(
          BigInt(user.id)
        );

      return res.status(200).json({
        success: true,
        organization,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  };

export const updateLogo = async (
  req: Request,
  res: Response
) => {
  try {

    const user =
      (req as any).user;

    const organization =
      await updateOrganizationLogo(
        BigInt(user.id),
        req.body.logoUrl
      );

    return res.status(200).json({
      success: true,
      organization,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};