import { type Request, type Response, type NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

export const errorMiddleware = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ success: false, message: error.message });
  }
  if (error instanceof ZodError) {
    return res.status(400).json({ success: false, message: "Validation failed", errors: error.issues });
  }
  if (error instanceof SyntaxError && "status" in error && error.status === 400) {
    return res.status(400).json({ success: false, message: "Invalid JSON request body" });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const errors: Record<string, { status: number; message: string }> = {
      P2002: { status: 409, message: "This record already exists" },
      P2003: { status: 409, message: "A related record is missing or still in use" },
      P2025: { status: 404, message: "Resource not found" },
      P2034: { status: 409, message: "A concurrent update occurred. Please try again" },
    };
    const known = errors[error.code];
    if (known) return res.status(known.status).json({ success: false, message: known.message });
  }
  console.error(error);
  return res.status(500).json({ success: false, message: "Internal Server Error" });
};
