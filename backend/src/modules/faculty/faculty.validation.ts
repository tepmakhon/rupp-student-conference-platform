import { z } from "zod";

export const createFacultySchema =
  z.object({

    facultyName:

      z.string()

      .min(
        2,
        "Faculty name is required"
      ),

    universityId:

      z.string(),

  });

export const updateFacultySchema =
  z.object({

    facultyName:

      z.string()

      .min(2)

      .optional(),

    universityId:

      z.string()

      .optional(),

  });