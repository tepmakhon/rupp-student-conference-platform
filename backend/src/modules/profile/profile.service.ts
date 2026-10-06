import { getBadgesForScore } from "../badge/badge.constants.js";
import { prisma } from "../../config/prisma.js";

import { AppError } from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Get Profile
|--------------------------------------------------------------------------
*/

export const getMyProfile = async (userId: bigint) => {
  const [
    user,
    totalRegistrations,
    totalApplications,
    savedOpportunities,
    recentActivities,
    recentEvents,
    recentApplications,
  ] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },

      include: {
        role: true,

        profile: true,

        student: {
          include: {
            university: true,

            faculty: true,

            major: true,

            studentSkills: {
              include: {
                skill: true,
              },
            },
          },
        },

        organization: true,
      },
    }),

    prisma.eventRegistration.count({
      where: {
        student: {
          userId,
        },
      },
    }),

    prisma.application.count({
      where: {
        student: {
          userId,
        },
      },
    }),

    prisma.savedOpportunity.count({
      where: {
        student: {
          userId,
        },
      },
    }),

    prisma.activityScoreHistory.findMany({
      where: {
        student: {
          userId,
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 5,
    }),

    prisma.eventRegistration.findMany({
      where: {
        student: {
          userId,
        },
      },

      include: {
        event: true,
      },

      orderBy: {
        registeredAt: "desc",
      },

      take: 5,
    }),

    prisma.application.findMany({
      where: {
        student: {
          userId,
        },
      },

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
    }),
  ]);

  if (!user) {
    throw new AppError(
      "User not found",

      404,
    );
  }

  const activityScore = user.student?.activityScore || 0;

  // Preserve the existing profile badgeName contract using the shared catalog.
  const badges = getBadgesForScore(activityScore).map((badge) => ({ ...badge, badgeName: badge.name }));

  return {
    ...user,

    statistics: {
      totalRegistrations,

      totalApplications,

      savedOpportunities,
    },

    badges,

    recentActivities,

    recentEvents,

    recentApplications,
  };
};
/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

export const updateMyProfile = async (
  userId: bigint,

  data: any,
) => {
  const {
    fullName,

    phoneNumber,

    gender,

    dateOfBirth,

    bio,

    profileImageUrl,

    academicYear,

    websiteUrl,
  } = data;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    include: {
      role: true,
    },
  });

  if (!user) {
    throw new AppError(
      "User not found",

      404,
    );
  }

  let parsedDate: Date | null | undefined = dateOfBirth === undefined ? undefined : null;

  if (dateOfBirth && !isNaN(Date.parse(dateOfBirth))) {
    parsedDate = new Date(dateOfBirth);
  }

  await prisma.$transaction(async (tx) => {
    await tx.userProfile.upsert({
      where: {
        userId,
      },

      create: {
        userId,

        fullName: fullName || user.email,

        phoneNumber,

        gender,

        dateOfBirth: parsedDate,

        bio,

        profileImageUrl,
      },

      update: {
        fullName,

        phoneNumber,

        gender,

        dateOfBirth: parsedDate,

        bio,

        profileImageUrl,
      },
    });

    if (user.role.roleName === "STUDENT") {
      const student = await tx.student.findUnique({
        where: {
          userId,
        },
      });

      if (student) {
        await tx.student.update({
          where: {
            userId,
          },

          data: {
            academicYear,
          },
        });
      }
    }

    if (user.role.roleName === "ORGANIZATION") {
      const organization = await tx.organization.findUnique({
        where: {
          userId,
        },
      });

      if (organization) {
        await tx.organization.update({
          where: {
            userId,
          },

          data: {
            websiteUrl,
          },
        });
      }
    }

  });

  return await getMyProfile(userId);
};
