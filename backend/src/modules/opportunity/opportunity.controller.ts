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

export const getAllOpportunities = async (req: Request, res: Response) => {
  const opportunities = await opportunityService.getAllOpportunities();

  res.json({
    success: true,
    opportunities,
  });
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

export const applyOpportunity = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const application = await opportunityService.applyOpportunity(
      BigInt(id),
      BigInt(user.id),
    );

    res.status(201).json({
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
