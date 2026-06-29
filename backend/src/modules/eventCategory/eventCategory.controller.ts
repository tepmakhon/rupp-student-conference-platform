import { Request, Response } from "express";

import * as eventCategoryService from "./eventCategory.service.js";

import { successResponse, errorResponse } from "../../utils/apiResponse.js";

export const getAllCategories = async (
  req: Request,

  res: Response,
) => {
  try {
    const categories = await eventCategoryService.getAllCategories();

    return successResponse(
      res,

      categories,

      "Categories retrieved",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 500,
    );
  }
};

export const createCategory = async (
  req: Request,

  res: Response,
) => {
  try {
    const category = await eventCategoryService.createCategory(req.body);

    return successResponse(
      res,

      category,

      "Category created",

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

export const updateCategory = async (
  req: Request,

  res: Response,
) => {
  try {
    const category = await eventCategoryService.updateCategory(
      BigInt(req.params.id as string),

      req.body,
    );

    return successResponse(
      res,

      category,

      "Category updated",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};

export const deleteCategory = async (
  req: Request,

  res: Response,
) => {
  try {
    await eventCategoryService.deleteCategory(BigInt(req.params.id as string));

    return successResponse(
      res,

      null,

      "Category deleted",
    );
  } catch (error: any) {
    return errorResponse(
      res,

      error.message,

      error.statusCode || 400,
    );
  }
};
