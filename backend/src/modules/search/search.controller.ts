import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as searchService
from "./search.service.js";

import {
  successResponse,
} from "../../utils/apiResponse.js";

export const globalSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const keyword =
      String(
        req.query.q ?? ""
      );

    const result =
      await searchService.globalSearch(
        keyword
      );

    return successResponse(
      res,
      result,
      "Search completed"
    );

  }

  catch (error) {

    next(error);

  }

};