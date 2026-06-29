import { prisma } from "../../config/prisma.js";

import { AppError } from "../../utils/AppError.js";

export const getAllFaculties = async () => {
  return prisma.faculty.findMany({
    include: {
      university: true,
    },

    orderBy: {
      facultyName: "asc",
    },
  });
};

export const createFaculty = async (data: any) => {
  const university = await prisma.university.findUnique({
    where: {
      id: BigInt(data.universityId),
    },
  });

  if (!university) {
    throw new AppError(
      "University not found",

      404,
    );
  }

  return prisma.faculty.create({
    data: {
      facultyName: data.facultyName,

      universityId: BigInt(data.universityId),
    },
  });
};

export const updateFaculty = async (
  id: bigint,

  data: any,
) => {
  const existing = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    throw new AppError(
      "Faculty not found",

      404,
    );
  }

  return prisma.faculty.update({
    where: {
      id,
    },

    data: {
      facultyName: data.facultyName,

      universityId: data.universityId ? BigInt(data.universityId) : undefined,
    },
  });
};

export const deleteFaculty = async (id: bigint) => {
  const existing = await prisma.faculty.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    throw new AppError(
      "Faculty not found",

      404,
    );
  }

  await prisma.faculty.delete({
    where: {
      id,
    },
  });

  return true;
};
