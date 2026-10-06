import { Request, Response } from "express";

import * as eventCategoryService from "./eventCategory.service.js";

import { successResponse } from "../../utils/apiResponse.js";

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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
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
  } catch (error) {
    throw error;
  }
};
