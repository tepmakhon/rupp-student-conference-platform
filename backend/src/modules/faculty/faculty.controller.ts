import { Request, Response } from "express";

import * as service from "./faculty.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getAllFaculties = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllFaculties();

    return successResponse(
      res,

      data,

      "Faculties retrieved",
    );
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
  }
};
