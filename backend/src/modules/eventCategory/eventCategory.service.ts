import { prisma }
from "../../config/prisma.js";

export const getAllCategories =
  async () => {
    return prisma.eventCategory.findMany({
      orderBy: {
        categoryName: "asc",
      },
    });
};