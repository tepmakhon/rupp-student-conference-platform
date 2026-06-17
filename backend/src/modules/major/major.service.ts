import { prisma }
from "../../config/prisma.js";

import { AppError }
from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Get All Majors
|--------------------------------------------------------------------------
*/

export const getAllMajors =
async () => {

  return prisma.major.findMany({

    include: {

      faculty: {

        include: {

          university: true,

        },

      },

    },

    orderBy: {

      majorName: "asc",

    },

  });

};

/*
|--------------------------------------------------------------------------
| Create Major
|--------------------------------------------------------------------------
*/

export const createMajor =
async (
  data: any
) => {

  const faculty =

    await prisma.faculty.findUnique({

      where: {

        id: BigInt(
          data.facultyId
        ),

      },

    });

  if (!faculty) {

    throw new AppError(

      "Faculty not found",

      404

    );

  }

  return prisma.major.create({

    data: {

      facultyId:

        BigInt(
          data.facultyId
        ),

      majorName:

        data.majorName,

      description:

        data.description || null,

      careerPath:

        data.careerPath || null,

    },

  });

};

/*
|--------------------------------------------------------------------------
| Update Major
|--------------------------------------------------------------------------
*/

export const updateMajor =
async (

  id: bigint,

  data: any

) => {

  const existing =

    await prisma.major.findUnique({

      where: {

        id,

      },

    });

  if (!existing) {

    throw new AppError(

      "Major not found",

      404

    );

  }

  return prisma.major.update({

    where: {

      id,

    },

    data: {

      facultyId:

        data.facultyId

        ? BigInt(
            data.facultyId
          )

        : undefined,

      majorName:

        data.majorName,

      description:

        data.description,

      careerPath:

        data.careerPath,

    },

  });

};

/*
|--------------------------------------------------------------------------
| Delete Major
|--------------------------------------------------------------------------
*/

export const deleteMajor =
async (
  id: bigint
) => {

  const existing =

    await prisma.major.findUnique({

      where: {

        id,

      },

    });

  if (!existing) {

    throw new AppError(

      "Major not found",

      404

    );

  }

  await prisma.major.delete({

    where: {

      id,

    },

  });

  return true;

};