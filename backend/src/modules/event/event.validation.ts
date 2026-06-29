import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()

    .min(3),

  description: z
    .string()

    .min(1),

  location: z
    .string()

    .min(1),

  categoryId: z.string(),

  capacity: z.coerce
    .number()

    .positive()

    .optional(),

  bannerImageUrl: z
    .string()

    .optional(),

  eventDate: z.string(),
});

export const updateEventSchema = z.object({
  title: z
    .string()

    .min(3)

    .optional(),

  description: z
    .string()

    .min(10)

    .optional(),

  location: z
    .string()

    .min(3)

    .optional(),

  categoryId: z
    .string()

    .optional(),

  capacity: z.coerce
    .number()

    .positive()

    .optional(),

  bannerImageUrl: z
    .string()

    .url()

    .optional(),

  eventDate: z
    .string()

    .optional(),
});
