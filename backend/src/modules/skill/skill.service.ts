import { prisma }
from "../../config/prisma.js";

import { AppError }
from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Get All Skills
|--------------------------------------------------------------------------
*/

export const getAllSkills =
async () => {

  return prisma.skill.findMany({

    orderBy: {

      skillName: "asc",

    },

  });

};

/*
|--------------------------------------------------------------------------
| Create Skill
|--------------------------------------------------------------------------
*/

export const createSkill =
async (
  data: any
) => {

  const existing =

    await prisma.skill.findUnique({

      where: {

        skillName:

          data.skillName,

      },

    });

  if (existing) {

    throw new AppError(

      "Skill already exists",

      409

    );

  }

  return prisma.skill.create({

    data: {

      skillName:

        data.skillName,

    },

  });

};

/*
|--------------------------------------------------------------------------
| Update Skill
|--------------------------------------------------------------------------
*/

export const updateSkill =
async (

  id: bigint,

  data: any

) => {

  const existing =

    await prisma.skill.findUnique({

      where: {

        id,

      },

    });

  if (!existing) {

    throw new AppError(

      "Skill not found",

      404

    );

  }

  return prisma.skill.update({

    where: {

      id,

    },

    data: {

      skillName:

        data.skillName,

    },

  });

};

/*
|--------------------------------------------------------------------------
| Delete Skill
|--------------------------------------------------------------------------
*/

export const deleteSkill =
async (
  id: bigint
) => {

  const existing =

    await prisma.skill.findUnique({

      where: {

        id,

      },

    });

  if (!existing) {

    throw new AppError(

      "Skill not found",

      404

    );

  }

  await prisma.skill.delete({

    where: {

      id,

    },

  });

  return true;

};
