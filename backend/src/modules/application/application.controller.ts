import { Request, Response } from "express";

import * as applicationService from "./application.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getMyApplications = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const page = Number(req.query.page ?? 1);

    const limit = Number(req.query.limit ?? 10);

    const result = await applicationService.getMyApplications(
      BigInt(user.id),
      page,
      limit,
    );

    return successResponse(res, result, "Applications retrieved");
  } catch (error) {
    throw error;
  }
};

export const getApplicants = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const parseId = (id: string | string[]) =>
      BigInt(Array.isArray(id) ? id[0] : id);

    const applicants = await applicationService.getApplicantsForOpportunity(
      parseId(req.params.id),
      BigInt(user.id),
    );

    return successResponse(res, applicants, "Applicants retrieved");
  } catch (error) {
    throw error;
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    const parseId = (id: string | string[]) =>
      BigInt(Array.isArray(id) ? id[0] : id);

    const application = await applicationService.updateApplicationStatus(
      parseId(req.params.id),
      BigInt(user.id),
      req.body.status,
    );

    return successResponse(res, application, "Application status updated");
  } catch (error) {
    throw error;
  }
};
