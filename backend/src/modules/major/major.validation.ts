import { z } from "zod";

export const createMajorSchema =
  z.object({

    facultyId:

      z.string(),

    majorName:

      z.string()

      .min(
        2,
        "Major name is required"
      ),

    description:

      z.string()

      .optional(),

    careerPath:

      z.string()

      .optional(),

  });

export const updateMajorSchema =
  z.object({

    facultyId:

      z.string()

      .optional(),

    majorName:

      z.string()

      .min(2)

      .optional(),

    description:

      z.string()

      .optional(),

    careerPath:

      z.string()

      .optional(),

  });