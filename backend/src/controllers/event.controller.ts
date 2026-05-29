import { Request, Response } from "express";
import {
  createEvent,
  getAllEvents,
  registerEvent,
} from "../services/event.service.js";

/**
 * CREATE EVENT
 */
export const createEventController = async (req: any, res: Response) => {
  try {
    const organizationId = req.user.id;

    const event = await createEvent(req.body, BigInt(organizationId));

    res.status(201).json(event);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET EVENTS
 */
export const getEventsController = async (req: Request, res: Response) => {
  try {
    const events = await getAllEvents();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * REGISTER EVENT
 */
export const registerEventController = async (req: any, res: Response) => {
  try {
    const studentId = req.user.id;
    const eventId = BigInt(req.params.id);

    const result = await registerEvent(eventId, BigInt(studentId));

    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};