import { prisma }
from "../../config/prisma.js";

import { AppError }
from "../../utils/AppError.js";

export const getAllUniversities =
async () => {

  return prisma.university.findMany({

    orderBy: {

      universityName: "asc",

    },

  });

};

export const createUniversity =
async (
  data: any
) => {

  const existing =

    await prisma.university.findFirst({

      where: {

        universityName:

          data.universityName,

      },

    });

  if (existing) {

    throw new AppError(

      "University already exists",

      409

    );

  }

  return prisma.university.create({

    data: {

      universityName:

        data.universityName,

    },

  });

};

export const updateUniversity =
async (

  id: bigint,

  data: any

) => {

  const existing =

    await prisma.university.findUnique({

      where: {

        id,

      },

    });

  if (!existing) {

    throw new AppError(

      "University not found",

      404

    );

  }

  return prisma.university.update({

    where: {

      id,

    },

    data: {

      universityName:

        data.universityName,

    },

  });

};

export const deleteUniversity =
async (
  id: bigint
) => {

  const existing =

    await prisma.university.findUnique({

      where: {

        id,

      },

    });

  if (!existing) {

    throw new AppError(

      "University not found",

      404

    );

  }

  await prisma.university.delete({

    where: {

      id,

    },

  });

  return true;

};