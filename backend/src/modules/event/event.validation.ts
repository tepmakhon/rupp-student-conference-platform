import { z } from "zod";

const optionalCapacity = z.preprocess(
  (value) => value === "" || value === null ? undefined : value,
  z.coerce.number().int().positive().optional(),
);
const eventFields = {
  title: z.string().trim().min(3).max(255),
  description: z.string().trim().min(1),
  location: z.string().trim().min(1).max(255),
  categoryId: z.string().regex(/^[1-9]\d*$/, "Invalid category ID"),
  capacity: optionalCapacity,
  bannerImageUrl: z.string().url().or(z.literal("")).optional(),
  eventDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), "Invalid event date"),
};
export const createEventSchema = z.object(eventFields);
export const updateEventSchema = createEventSchema.partial();
