import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getScoreHistory = async (
  userId: bigint
) => {

  const student =
    await prisma.student.findUnique({
      where: {
        userId,
      },
    });

  if (!student) {
    throw new AppError(
      "Student not found",
      404
    );
  }

  return prisma.activityScoreHistory.findMany({
    where: {
      studentId: student.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createStudentProfile = async (
  userId: bigint,
  data: any
) => {

  const existing =
    await prisma.student.findUnique({
      where: {
        userId,
      },
    });

  if (existing) {
    throw new AppError(
      "Student profile already exists",
      409
    );
  }

  return prisma.student.create({
    data: {
      userId,
      universityId: BigInt(data.universityId),
      facultyId: BigInt(data.facultyId),
      majorId: BigInt(data.majorId),
      academicYear: data.academicYear,
    },

    include: {
      university: true,
      faculty: true,
      major: true,
    },
  });
};

export const getMyProfile = async (
  userId: bigint
) => {
  const profile = await prisma.student.findUnique({
    where: {
      userId,
    },

    include: {
      university: true,
      faculty: true,
      major: true,

      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!profile) {
    throw new AppError(
      "Student profile not found",
      404
    );
  }

  return profile;
};