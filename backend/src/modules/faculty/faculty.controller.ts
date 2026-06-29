import { Request, Response } from "express";

import * as service from "./faculty.service.js";

import { successResponse, errorResponse } from "../../utils/apiResponse.js";

export const getAllFaculties = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllFaculties();

    return successResponse(
      res,

      data,

      "Faculties retrieved",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 500,
    );
  }
};

export const createFaculty = async (req: Request, res: Response) => {
  try {
    const data = await service.createFaculty(req.body);

    return successResponse(
      res,

      data,

      "Faculty created",

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

export const updateFaculty = async (req: Request, res: Response) => {
  try {
    const data = await service.updateFaculty(
      BigInt(req.params.id as string),

      req.body,
    );

    return successResponse(
      res,

      data,

      "Faculty updated",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};

export const deleteFaculty = async (req: Request, res: Response) => {
  try {
    await service.deleteFaculty(BigInt(req.params.id as string));

    return successResponse(
      res,

      null,

      "Faculty deleted",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};
