import { prisma } from "../../config/prisma.js";
import { AppError } from "../../utils/AppError.js";
import { getPagination } from "../../utils/pagination.js";

export const getLeaderboard =
  async (

    page = 1,

    limit = 10

  ) => {

    if (

      page < 1 ||

      limit < 1

    ) {

      throw new AppError(

        "Invalid pagination values",

        400

      );

    }

    const {

      skip,

    } = getPagination(

      page,

      limit

    );

    const [

      students,

      total,

    ] = await Promise.all([

      prisma.student.findMany({

        skip,

        take: limit,

        include: {

          user: {

            include: {

              profile: true,

            },

          },

          university: true,

          faculty: true,

        },

        orderBy: {

          activityScore:

            "desc",

        },

      }),

      prisma.student.count(),

    ]);

    return {

      students:

        students.map(

          (

            student,

            index

          ) => ({

            rank:

              skip +

              index +

              1,

            id:

              student.id,

            fullName:

              student.user.profile

                ?.fullName ||

              "Unknown",

            university:

              student.university

                ?.universityName ||

              "-",

            faculty:

              student.faculty

                ?.facultyName ||

              "-",

            activityScore:

              student.activityScore,

          })

        ),

      pagination: {

        page,

        limit,

        total,

        totalPages:

          Math.ceil(

            total / limit

          ),

      },

    };

};