import { Request, Response } from "express";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

export const uploadFile = async (
  req: Request,
  res: Response
) => {
  try {

    if (!req.file) {

      return errorResponse(
        res,
        "No file uploaded",
        400
      );

    }

    return successResponse(
      res,
      {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
      },
      "File uploaded successfully"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 500
    );

  }
};