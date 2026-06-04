import { Request, Response } from "express";

import {
  createEvent,
  getApprovedEvents,
  getPendingEvents,
  approveEvent,
  rejectEvent,
  registerForEvent,
} from "./event.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

export const createEventController = async (
  req: Request,
  res: Response
) => {
  try {

    const event = await createEvent(
      req.body,
      (req as any).user
    );

    return successResponse(
      res,
      event,
      "Event created",
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

export const getApprovedEventsController = async (
  req: Request,
  res: Response
) => {
  try {

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const result =
      await getApprovedEvents(
        page,
        limit
      );

    return successResponse(
      res,
      {
        events: result.events,
        pagination:
          result.pagination,
      },
      "Approved events fetched"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 500
    );

  }
};

export const getPendingEventsController = async (
  req: Request,
  res: Response
) => {
  try {

    const events =
      await getPendingEvents();

    return successResponse(
      res,
      events,
      "Pending events fetched"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 500
    );

  }
};

export const approveEventController = async (
  req: Request,
  res: Response
) => {
  try {

    const eventId = BigInt(
      Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id
    );

    const event =
      await approveEvent(eventId);

    return successResponse(
      res,
      event,
      "Event approved"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 400
    );

  }
};

export const rejectEventController = async (
  req: Request,
  res: Response
) => {
  try {

    const eventId = BigInt(
      Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id
    );

    const event =
      await rejectEvent(eventId);

    return successResponse(
      res,
      event,
      "Event rejected"
    );

  } catch (error: any) {

    return errorResponse(
      res,
      error.message,
      error.statusCode || 400
    );

  }
};

export const registerEventController = async (
  req: Request,
  res: Response
) => {
  try {

    const eventId = BigInt(
      Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id
    );

    const user =
      (req as any).user;

    const registration =
      await registerForEvent(
        eventId,
        BigInt(user.id)
      );

    return successResponse(
      res,
      registration,
      "Successfully registered for event",
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