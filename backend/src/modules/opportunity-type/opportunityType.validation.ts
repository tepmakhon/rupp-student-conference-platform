import { z } from "zod";

export const createOpportunityTypeSchema =
  z.object({

    typeName:

      z.string()

      .min(
        2,
        "Type name is required"
      ),

  });

export const updateOpportunityTypeSchema =
  z.object({

    typeName:

      z.string()

      .min(2)

      .optional(),

  });