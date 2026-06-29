import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";

export const getScoreHistory = async (userId: bigint) => {
  const student = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (!student) {
    throw new AppError("Student not found", 404);
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

export const createStudentProfile = async (userId: bigint, data: any) => {
  const existing = await prisma.student.findUnique({
    where: {
      userId,
    },
  });

  if (existing) {
    throw new AppError("Student profile already exists", 409);
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

export const getMyProfile = async (userId: bigint) => {
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
    throw new AppError("Student profile not found", 404);
  }

  return profile;
};

/*
|--------------------------------------------------------------------------
| Get Student Public Profile
|--------------------------------------------------------------------------
*/

export const getStudentPublicProfile = async (studentId: bigint) => {
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },

    include: {
      user: {
        include: {
          profile: true,
        },
      },

      university: true,

      faculty: true,

      major: true,

      studentSkills: {
        include: {
          skill: true,
        },
      },

      applications: {
        include: {
          opportunity: {
            include: {
              organization: true,
            },
          },
        },

        orderBy: {
          appliedAt: "desc",
        },

        take: 5,
      },

      scoreHistory: {
        orderBy: {
          createdAt: "desc",
        },

        take: 10,
      },
    },
  });

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  return student;
};
