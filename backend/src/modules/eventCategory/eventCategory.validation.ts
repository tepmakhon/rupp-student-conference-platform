import { z } from "zod";

export const createEventCategorySchema =

  z.object({

    categoryName:

      z.string()

      .trim()

      .min(

        2,

        "Category name is required"

      ),

  });

export const updateEventCategorySchema =

  z.object({

    categoryName:

      z.string()

      .trim()

      .min(

        2,

        "Category name is required"

      ),

  });