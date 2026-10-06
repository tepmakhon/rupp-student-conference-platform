import { Request, Response } from "express";

import * as service from "./university.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getAllUniversities = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.getAllUniversities();

    return successResponse(
      res,

      data,

      "Universities retrieved",
    );
  } catch (error) {
    throw error;
  }
};

export const createUniversity = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.createUniversity(req.body);

    return successResponse(
      res,

      data,

      "University created",

      201,
    );
  } catch (error) {
    throw error;
  }
};

export const updateUniversity = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.updateUniversity(
      BigInt(req.params.id as string),

      req.body,
    );

    return successResponse(
      res,

      data,

      "University updated",
    );
  } catch (error) {
    throw error;
  }
};

export const deleteUniversity = async (
  req: Request,

  res: Response,
) => {
  try {
    await service.deleteUniversity(BigInt(req.params.id as string));

    return successResponse(
      res,

      null,

      "University deleted",
    );
  } catch (error) {
    throw error;
  }
};
