import { Request, Response } from "express";

import {
  createEvent,
  getApprovedEvents,
  getPendingEvents,
  approveEvent,
  rejectEvent,
  registerForEvent,
} from "./event.service.js";

export const createEventController = async (req: Request, res: Response) => {
  try {
    const event = await createEvent(req.body, (req as any).user);

    res.status(201).json(event);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getApprovedEventsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const events = await getApprovedEvents();

    res.json(events);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPendingEventsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const events = await getPendingEvents();

    res.json(events);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const approveEventController = async (req: Request, res: Response) => {
  try {
    const eventId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const event = await approveEvent(BigInt(eventId));

    res.json({
      message: "Event approved",
      event,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const rejectEventController = async (req: Request, res: Response) => {
  try {
    const eventId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const event = await rejectEvent(BigInt(eventId));

    res.json({
      message: "Event rejected",
      event,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const registerEventController = async (req: Request, res: Response) => {
  try {
    const eventId = BigInt(
      Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
    );
    const user = (req as any).user;
    const registration = await registerForEvent(eventId, BigInt(user.id));
    res.status(201).json({
      success: true,
      registration,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
