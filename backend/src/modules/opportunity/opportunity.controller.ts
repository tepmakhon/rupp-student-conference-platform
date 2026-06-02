import { Request, Response } from "express";

import * as opportunityService from "./opportunity.service.js";

export const createOpportunity = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const opportunity = await opportunityService.createOpportunity(
      req.body,
      BigInt(user.id),
    );

    res.status(201).json({
      success: true,
      opportunity,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOpportunities = async (
  req: Request,
  res: Response
) => {
  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const result =
      await opportunityService.getAllOpportunities(
        page,
        limit
      );

    res.json({
      success: true,
      ...result,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const getOpportunityById = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const opportunity = await opportunityService.getOpportunityById(BigInt(id));

    res.json({
      success: true,
      opportunity,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveOpportunity = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const opportunity = await opportunityService.approveOpportunity(BigInt(id));

    res.json({
      success: true,
      opportunity,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const applyOpportunity = async (
  req: Request,
  res: Response
) => {
  try {

    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const opportunityId = BigInt(id);

    const user = (req as any).user;

    const application =
      await opportunityService.applyOpportunity(
        opportunityId,
        BigInt(user.id),
        req.body
      );

    return res.status(201).json({
      success: true,
      application,
    });

  } catch (error: any) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};
