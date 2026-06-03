import { Request, Response } from "express";

import * as studentService
from "./student.service.js";

export const getMyHistory =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user = (req as any).user;

      const history =
        await studentService.getScoreHistory(
          BigInt(user.id)
        );

      res.json({
        success: true,
        history,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }
};

export const createProfile =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        (req as any).user;

      const profile =
        await studentService.createStudentProfile(
          BigInt(user.id),
          req.body
        );

      res.status(201).json({
        success: true,
        profile,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }
};

export const getMyProfile =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        (req as any).user;

      const profile =
        await studentService.getMyProfile(
          BigInt(user.id)
        );

      res.json({
        success: true,
        profile,
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }
};