import { Request, Response } from "express";

import * as applicationService from "./application.service.js";


export const getMyApplications =
  async (
    req: Request,
    res: Response
  ) => {

    const user =
      (req as any).user;

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const result =
      await applicationService.getMyApplications(
        BigInt(user.id),
        page,
        limit
      );

    res.json({
      success: true,
      ...result,
    });
  };

export const getApplicants = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const parseId = (id: string | string[]) =>
      BigInt(Array.isArray(id) ? id[0] : id);

    const applicants = (await applicationService.getApplicantsForOpportunity(
      parseId(req.params.id),
      BigInt(user.id),
    )) as any[];

    res.json({
      success: true,
      applicants,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const parseId = (id: string | string[]) =>
      BigInt(Array.isArray(id) ? id[0] : id);

    const application = (await applicationService.updateApplicationStatus(
      parseId(req.params.id),
      req.body.status,
    )) as any;

    res.json({
      success: true,
      application,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
