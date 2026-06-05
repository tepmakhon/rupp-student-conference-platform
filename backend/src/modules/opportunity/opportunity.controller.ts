import { Request, Response } from "express";

import * as opportunityService from "./opportunity.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

export const createOpportunity = async (
  req: Request,
  res: Response
) => {
  try {

    const user = req.user!;

    const opportunity =
      await opportunityService.createOpportunity(
        req.body,
        BigInt(user.id)
      );

    return successResponse(
      res,
      opportunity,
      "Opportunity created",
      201
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 400
    );

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

    return successResponse(
      res,
      result,
      "Opportunities retrieved"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 500
    );

  }
};

export const getOpportunityById = async (
  req: Request,
  res: Response
) => {
  try {

    const id = BigInt(
      Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id
    );

    const opportunity =
      await opportunityService.getOpportunityById(
        id
      );

    return successResponse(
      res,
      opportunity,
      "Opportunity retrieved"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 404
    );

  }
};

export const approveOpportunity = async (
  req: Request,
  res: Response
) => {
  try {

    const id = BigInt(
      Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id
    );

    const opportunity =
      await opportunityService.approveOpportunity(
        id
      );

    return successResponse(
      res,
      opportunity,
      "Opportunity approved"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 400
    );

  }
};

export const applyOpportunity = async (
  req: Request,
  res: Response
) => {
  try {

    const opportunityId = BigInt(
      Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id
    );

    const user =
      req.user!;

    const application =
      await opportunityService.applyOpportunity(
        opportunityId,
        BigInt(user.id),
        req.body
      );

    return successResponse(
      res,
      application,
      "Application submitted successfully",
      201
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 400
    );

  }
};