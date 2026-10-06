import { Request, Response } from "express";

import * as service from "./opportunityType.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getAllTypes = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.getAllTypes();

    return successResponse(
      res,

      data,

      "Types retrieved",
    );
  } catch (error) {
    throw error;
  }
};

export const createType = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.createType(req.body);

    return successResponse(
      res,

      data,

      "Type created",

      201,
    );
  } catch (error) {
    throw error;
  }
};

export const updateType = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.updateType(
      BigInt(req.params.id as string),

      req.body,
    );

    return successResponse(
      res,

      data,

      "Type updated",
    );
  } catch (error) {
    throw error;
  }
};

export const deleteType = async (
  req: Request,

  res: Response,
) => {
  try {
    await service.deleteType(BigInt(req.params.id as string));

    return successResponse(
      res,

      null,

      "Type deleted",
    );
  } catch (error) {
    throw error;
  }
};
