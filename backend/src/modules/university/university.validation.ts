import { z } from "zod";

export const createUniversitySchema = z.object({
  universityName: z
    .string()

    .min(2, "University name is required"),
});

export const updateUniversitySchema = z.object({
  universityName: z
    .string()

    .min(2)

    .optional(),
});
