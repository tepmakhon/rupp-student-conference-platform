import { prisma }
from "../../config/prisma.js";

import { AppError }
from "../../utils/AppError.js";

export const getAllTypes =
async () => {

  return prisma.opportunityType.findMany({

    orderBy: {

      typeName: "asc",

    },

  });

};

export const createType =
async (
  data: any
) => {

  const existing =

    await prisma.opportunityType.findUnique({

      where: {

        typeName:

          data.typeName,

      },

    });

  if (existing) {

    throw new AppError(

      "Type already exists",

      409

    );

  }

  return prisma.opportunityType.create({

    data: {

      typeName:

        data.typeName,

    },

  });

};

export const updateType =
async (

  id: bigint,

  data: any

) => {

  const existing =

    await prisma.opportunityType.findUnique({

      where: {

        id,

      },

    });

  if (!existing) {

    throw new AppError(

      "Type not found",

      404

    );

  }

  return prisma.opportunityType.update({

    where: {

      id,

    },

    data: {

      typeName:

        data.typeName,

    },

  });

};

export const deleteType =
async (
  id: bigint
) => {

  const existing =

    await prisma.opportunityType.findUnique({

      where: {

        id,

      },

    });

  if (!existing) {

    throw new AppError(

      "Type not found",

      404

    );

  }

  await prisma.opportunityType.delete({

    where: {

      id,

    },

  });

  return true;

};