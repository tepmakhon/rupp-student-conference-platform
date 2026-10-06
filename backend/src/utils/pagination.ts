import { AppError } from "./AppError.js";

export const getPagination = (page = 1, limit = 10) => {
  if (!Number.isSafeInteger(page) || page < 1 ||
      !Number.isSafeInteger(limit) || limit < 1 || limit > 100 ||
      !Number.isSafeInteger((page - 1) * limit)) {
    throw new AppError("Page must be a positive integer and limit must be between 1 and 100", 400);
  }
  return { skip: (page - 1) * limit, take: limit };
};
