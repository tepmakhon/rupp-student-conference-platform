import { z } from "zod";

export const updateOrganizationSchema =
  z.object({
    organizationName: z
      .string()
      .min(3)
      .optional(),

    description: z
      .string()
      .optional(),

    websiteUrl: z
      .string()
      .url()
      .optional(),
  });