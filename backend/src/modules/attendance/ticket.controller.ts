import { Request, Response, NextFunction } from "express";

import * as ticketService from "./ticket.service.js";

import { successResponse } from "../../utils/apiResponse.js";

export const getEventTicket = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const eventIdParam = req.params.eventId;

    if (!eventIdParam || Array.isArray(eventIdParam)) {
      throw new Error("Invalid eventId");
    }

    const eventId = BigInt(eventIdParam);

    const data = await ticketService.getEventTicket(
      eventId,
      BigInt(req.user!.id),
    );

    return successResponse(
      res,

      data,

      "Event ticket",
    );
  } catch (error) {
    next(error);
  }
};
