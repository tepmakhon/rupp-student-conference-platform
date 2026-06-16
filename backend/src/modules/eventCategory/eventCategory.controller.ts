import {
  Request,
  Response,
} from "express";

import * as eventCategoryService
from "./eventCategory.service.js";

import {

  successResponse,

  errorResponse,

} from "../../utils/apiResponse.js";

export const getAllCategories =
  async (

    req: Request,

    res: Response

  ) => {

    try {

      const categories =

        await eventCategoryService.getAllCategories();

      return successResponse(

        res,

        categories,

        "Categories retrieved"

      );

    } catch (error: any) {

      return errorResponse(

        res,

        error.message,

        error.statusCode || 500

      );

    }

};