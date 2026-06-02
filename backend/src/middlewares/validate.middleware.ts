import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: z.ZodSchema) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      req.body = await schema.parseAsync(req.body);

      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues || error.errors,
      });
    }
  };