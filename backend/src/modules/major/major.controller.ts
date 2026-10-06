import { Request, Response } from "express";

import * as service from "./major.service.js";

import { successResponse } from "../../utils/apiResponse.js";

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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
  }
};
