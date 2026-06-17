import { Request, Response }
from "express";

import * as service
from "./skill.service.js";

import {

  successResponse,

  errorResponse,

}

from "../../utils/apiResponse.js";

export const getAllSkills =
async (

  req: Request,

  res: Response

) => {

  try {

    const data =

      await service.getAllSkills();

    return successResponse(

      res,

      data,

      "Skills retrieved"

    );

  } catch (error: any) {

    return errorResponse(

      res,

      error.message,

      error.statusCode || 500

    );

  }

};

export const createSkill =
async (

  req: Request,

  res: Response

) => {

  try {

    const data =

      await service.createSkill(

        req.body

      );

    return successResponse(

      res,

      data,

      "Skill created",

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

export const updateSkill =
async (

  req: Request,

  res: Response

) => {

  try {

    const data =

      await service.updateSkill(

        BigInt(
          req.params.id as string
        ),

        req.body

      );

    return successResponse(

      res,

      data,

      "Skill updated"

    );

  } catch (error: any) {

    return errorResponse(

      res,

      error.message,

      error.statusCode || 400

    );

  }

};

export const deleteSkill =
async (

  req: Request,

  res: Response

) => {

  try {

    await service.deleteSkill(

      BigInt(
        req.params.id as string
      )

    );

    return successResponse(

      res,

      null,

      "Skill deleted"

    );

  } catch (error: any) {

    return errorResponse(

      res,

      error.message,

      error.statusCode || 400

    );

  }

};