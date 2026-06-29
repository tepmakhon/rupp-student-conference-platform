import { prisma } from "../../config/prisma.js";

import { AppError } from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Get All
|--------------------------------------------------------------------------
*/

export const getAllCategories = async () => {
  return prisma.eventCategory.findMany({
    orderBy: {
      categoryName: "asc",
    },
  });
};

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export const createCategory = async (data: any) => {
  const existing = await prisma.eventCategory.findUnique({
    where: {
      categoryName: data.categoryName,
    },
  });

  if (existing) {
    throw new AppError(
      "Category already exists",

      409,
    );
  }

  return prisma.eventCategory.create({
    data: {
      categoryName: data.categoryName,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export const updateCategory = async (
  id: bigint,

  data: any,
) => {
  const category = await prisma.eventCategory.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new AppError(
      "Category not found",

      404,
    );
  }

  const existing = await prisma.eventCategory.findFirst({
    where: {
      categoryName: data.categoryName,

      NOT: {
        id,
      },
    },
  });

  if (existing) {
    throw new AppError(
      "Category already exists",

      409,
    );
  }

  return prisma.eventCategory.update({
    where: {
      id,
    },

    data: {
      categoryName: data.categoryName,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export const deleteCategory = async (id: bigint) => {
  const category = await prisma.eventCategory.findUnique({
    where: {
      id,
    },
  });

  if (!category) {
    throw new AppError(
      "Category not found",

      404,
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Prevent deleting if used
  |--------------------------------------------------------------------------
  */

  const totalEvents = await prisma.event.count({
    where: {
      categoryId: id,
    },
  });

  if (totalEvents > 0) {
    throw new AppError(
      "Category is currently used by events",

      400,
    );
  }

  await prisma.eventCategory.delete({
    where: {
      id,
    },
  });

  return true;
};
