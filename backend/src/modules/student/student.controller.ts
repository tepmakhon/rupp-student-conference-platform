import { Request, Response } from "express";

import * as studentService from "./student.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

export const getMyHistory = async (
  req: Request,
  res: Response
) => {
  try {

    const user = req.user!;

    const history =
      await studentService.getScoreHistory(
        BigInt(user.id)
      );

    return successResponse(
      res,
      history,
      "Score history retrieved"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 400
    );

  }
};

export const createProfile = async (
  req: Request,
  res: Response
) => {
  try {

    const user =
      req.user!;

    const profile =
      await studentService.createStudentProfile(
        BigInt(user.id),
        req.body
      );

    return successResponse(
      res,
      profile,
      "Student profile created",
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

export const getMyProfile = async (
  req: Request,
  res: Response
) => {
  try {

    const user =
      req.user!;

    const profile =
      await studentService.getMyProfile(
        BigInt(user.id)
      );

    return successResponse(
      res,
      profile,
      "Student profile retrieved"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 400
    );

  }
};