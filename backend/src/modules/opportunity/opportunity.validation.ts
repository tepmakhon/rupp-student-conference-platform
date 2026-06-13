import { z } from "zod";

export const createOpportunitySchema =
  z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters"),

    description: z
      .string()
      .min(5, "Description is required"),

    requirements: z
      .string()
      .min(3, "Requirements are required"),

    coverImageUrl: z
      .string()
      .url("Must be a valid URL")
      .optional()
      .or(z.literal("")),

    typeId: z.string(),

    deadline: z.string().optional(),
  });