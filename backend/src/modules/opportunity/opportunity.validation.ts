import { z } from "zod";

export const createOpportunitySchema = z.object({
  title: z.string().trim().min(3).max(255),
  description: z.string().trim().min(5),
  requirements: z.string().trim().min(3),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  typeId: z.string().regex(/^[1-9]\d*$/, "Invalid opportunity type ID"),
  deadline: z.string().refine((value) => value === "" || !Number.isNaN(Date.parse(value)), "Invalid deadline").optional(),
});
export const updateOpportunitySchema = createOpportunitySchema.partial();
export const applyOpportunitySchema = z.object({
  cvUrl: z.string().url().optional().or(z.literal("")),
});
