import { Request, Response } from "express";

import {
  registerUser,
  loginUser,
} from "./auth.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

export const registerController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await registerUser(req.body);

    return successResponse(
      res,
      {
        user: result.user,
        token: result.token,
      },
      "Registration successful",
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

export const loginController = async (
  req: Request,
  res: Response
) => {
  try {

    const result = await loginUser(req.body);

    return successResponse(
      res,
      {
        user: result.user,
        token: result.token,
      },
      "Login successful",
      200
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 400
    );

  }
};