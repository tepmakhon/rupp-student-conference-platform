import { Request, Response } from "express";
import * as eventService
from "./event.service.js";
import {
  createEvent,
  getApprovedEvents,
  getEventById,
  getPendingEvents,
  approveEvent,
  rejectEvent,
  registerForEvent,
  updateEvent,
  deleteEvent,
} from "./event.service.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";

/*
|--------------------------------------------------------------------------
| Create Event
|--------------------------------------------------------------------------
*/

export const createEventController = async (
  req: Request,
  res: Response
) => {
  try {

    const event =
      await createEvent(
        req.body,
        req.user
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

/*
|--------------------------------------------------------------------------
| Get Approved Events
|--------------------------------------------------------------------------
*/

export const getApprovedEventsController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const keyword = String(req.query.keyword || "");

      const categoryId = req.query.categoryId
        ? BigInt(req.query.categoryId as string)
        : undefined;

      const result = await getApprovedEvents(
        page,
        limit,
        keyword,
        categoryId
      );

      return successResponse(
        res,
        {
          events:
            result.events,
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

/*
|--------------------------------------------------------------------------
| Get Event By Id
|--------------------------------------------------------------------------
*/

export const getEventByIdController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const eventId =
        BigInt(
          Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id
        );

      const event =
        await getEventById(
          eventId
        );

      return successResponse(
        res,
        event,
        "Event retrieved"
      );

    } catch (error: any) {

      return errorResponse(
        res,
        error.message,
        error.statusCode || 404
      );

    }
  };

/*
|--------------------------------------------------------------------------
| Get Pending Events
|--------------------------------------------------------------------------
*/

export const getPendingEventsController =
  async (
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

/*
|--------------------------------------------------------------------------
| Approve Event
|--------------------------------------------------------------------------
*/

export const approveEventController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const eventId =
        BigInt(
          Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id
        );

      const event =
        await approveEvent(
          eventId
        );

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

/*
|--------------------------------------------------------------------------
| Reject Event
|--------------------------------------------------------------------------
*/

export const rejectEventController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const eventId =
        BigInt(
          Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id
        );

      const event =
        await rejectEvent(
          eventId
        );

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

/*
|--------------------------------------------------------------------------
| Register For Event
|--------------------------------------------------------------------------
*/

export const registerEventController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const eventId =
        BigInt(
          Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id
        );

      const user =
        req.user!;

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

  export const getMyEventsController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        req.user!;

      const events =

        await eventService.getMyEvents(

          BigInt(user.id)

        );

      return successResponse(

        res,

        events,

        "Events retrieved"

      );

    } catch (error: any) {

      return errorResponse(

        res,

        error.message,

        error.statusCode || 500

      );

    }

};

export const getMyRegistrationsController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        req.user!;

      const events =

        await eventService.getMyRegistrations(

          BigInt(user.id)

        );

      return successResponse(

        res,

        events,

        "Registered events retrieved"

      );

    } catch (error: any) {

      return errorResponse(

        res,

        error.message,

        error.statusCode || 500

      );

    }

};

export const updateEventController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        req.user!;

      const event =

        await eventService.updateEvent(

          BigInt(
            Array.isArray(req.params.id)
              ? req.params.id[0]
              : req.params.id
          ),
          BigInt(user.id),

          req.body

        );

      return successResponse(

        res,

        event,

        "Event updated"

      );

    } catch (error: any) {

      return errorResponse(

        res,

        error.message,

        error.statusCode || 400

      );

    }

};

export const deleteEventController =
  async (
    req:Request,
    res:Response
  ) => {

    try {

      const user =
        req.user!;

      await eventService.deleteEvent(

        BigInt(
          Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id
        ),

        BigInt(user.id)

      );

      return successResponse(

        res,

        null,

        "Event deleted"

      );

    } catch (error: any) {

      return errorResponse(

        res,

        error.message,

        error.statusCode || 400

      );

    }

};

export const getEventRegistrationsController =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const user =
        req.user!;

      const registrations =

        await eventService.getEventRegistrations(

          BigInt(
            Array.isArray(req.params.id)
              ? req.params.id[0]
              : req.params.id
          ),


          BigInt(user.id)

        );

      return successResponse(

        res,

        registrations,

        "Registrations retrieved"

      );

    } catch (error: any) {

      return errorResponse(

        res,

        error.message,

        error.statusCode || 400

      );

    }

};