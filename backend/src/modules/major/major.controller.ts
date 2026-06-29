import { Request, Response } from "express";

import * as service from "./major.service.js";

import { successResponse, errorResponse } from "../../utils/apiResponse.js";

export const getAllMajors = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.getAllMajors();

    return successResponse(
      res,

      data,

      "Majors retrieved",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 500,
    );
  }
};

export const createMajor = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.createMajor(req.body);

    return successResponse(
      res,

      data,

      "Major created",

      201,
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};

export const updateMajor = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.updateMajor(
      BigInt(req.params.id as string),

      req.body,
    );

    return successResponse(
      res,

      data,

      "Major updated",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};

export const deleteMajor = async (
  req: Request,

  res: Response,
) => {
  try {
    await service.deleteMajor(BigInt(req.params.id as string));

    return successResponse(
      res,

      null,

      "Major deleted",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};
