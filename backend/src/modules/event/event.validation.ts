import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().min(1),

  location: z.string().min(1),

  categoryId: z.string(),

  capacity: z.number().positive(),

  eventDate: z.string(),
});