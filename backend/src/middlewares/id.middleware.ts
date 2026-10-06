import { type RequestParamHandler } from "express";
import { AppError } from "../utils/AppError.js";

export const validateIdParam: RequestParamHandler = (_req, _res, next, value) => {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value) || BigInt(value) > 9223372036854775807n) {
    return next(new AppError("Invalid resource ID", 400));
  }
  next();
};
