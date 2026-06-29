import { Request, Response, NextFunction } from "express";

import { registerUser, loginUser } from "./auth.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const register = async (
  req: Request,

  res: Response,

  next: NextFunction,
) => {
  try {
    const data = await registerUser(req.body);

    return successResponse(
      res,

      data,

      "Registration successful",

      201,
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,

  res: Response,

  next: NextFunction,
) => {
  try {
    const data = await loginUser(req.body);

    return successResponse(
      res,

      data,

      "Login successful",
    );
  } catch (error) {
    next(error);
  }
};
