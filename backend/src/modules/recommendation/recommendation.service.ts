import { prisma } from "../../config/prisma.js";

export const getRecommendations = async (userId: bigint) => {
  /*
 |--------------------------------------------------------------------------
 | Get Student
 |--------------------------------------------------------------------------
 */

  const student = await prisma.student.findUnique({
    where: {
      userId,
    },

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
  });

  if (!student) {
    return {
      keywords: [],

      events: [],

      opportunities: [],
    };
  }

  /*
 |--------------------------------------------------------------------------
 | Build Keywords
 |--------------------------------------------------------------------------
 */

  const majorName = student.major?.majorName || "";

  const facultyName = student.faculty?.facultyName || "";

  const universityName = student.university?.universityName || "";

  const skillNames = student.studentSkills.map(
    (studentSkill) => studentSkill.skill.skillName,
  );

  const keywords = [
    universityName,

    facultyName,

    majorName,

    ...skillNames,
  ].filter(Boolean);

  /*
 |--------------------------------------------------------------------------
 | Recommended Events
 |--------------------------------------------------------------------------
 */

  const events = await prisma.event.findMany({
    where: {
      status: "APPROVED",
      eventDate: {
        gte: new Date(),
      },
      OR: keywords.flatMap((keyword) => [
        {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ]),
    },

    include: {
      organization: true,
      category: true,
    },

    take: 6,

    orderBy: {
      createdAt: "desc",
    },
  });

  /*
 |--------------------------------------------------------------------------
 | Recommended Opportunities
 |--------------------------------------------------------------------------
 */

  const opportunities = await prisma.opportunity.findMany({
    where: {
      status: "APPROVED",

      deadline: {
        gte: new Date(),
      },

      OR: keywords.flatMap((keyword) => [
        {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ]),
    },

    include: {
      organization: true,
      type: true,
    },

    take: 6,

    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    student: {
      university: universityName,

      faculty: facultyName,

      major: majorName,

      skills: skillNames,
    },

    keywords,

    events,

    opportunities,
  };
};
