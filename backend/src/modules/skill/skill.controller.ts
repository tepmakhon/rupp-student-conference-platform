import { Request, Response } from "express";

import * as service from "./skill.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getAllSkills = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.getAllSkills();

    return successResponse(
      res,

      data,

      "Skills retrieved",
    );
  } catch (error) {
    throw error;
  }
};

export const createSkill = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.createSkill(req.body);

    return successResponse(
      res,

      data,

      "Skill created",

      201,
    );
  } catch (error) {
    throw error;
  }
};

export const updateSkill = async (
  req: Request,

  res: Response,
) => {
  try {
    const data = await service.updateSkill(
      BigInt(req.params.id as string),

      req.body,
    );

    return successResponse(
      res,

      data,

      "Skill updated",
    );
  } catch (error) {
    throw error;
  }
};

export const deleteSkill = async (
  req: Request,

  res: Response,
) => {
  try {
    await service.deleteSkill(BigInt(req.params.id as string));

    return successResponse(
      res,

      null,

      "Skill deleted",
    );
  } catch (error) {
    throw error;
  }
};
