import {

 prisma,

} from "../../config/prisma.js";

import {

 AppError,

} from "../../utils/AppError.js";

/*
|--------------------------------------------------------------------------
| Get Profile
|--------------------------------------------------------------------------
*/

export const getMyProfile =

async (

 userId: bigint

) => {
const [

  user,

  totalRegistrations,

  totalApplications,

  savedOpportunities,

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

]);

return {

  ...user,

  statistics: {

    totalRegistrations,

    totalApplications,

    savedOpportunities,

  },

};

};

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

export const updateMyProfile =

async (

 userId: bigint,

 data: any

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

 const user =

 await prisma.user.findUnique({

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

     404

   );

 }

 let parsedDate = null;

 if (

   dateOfBirth &&

   !isNaN(

     Date.parse(

       dateOfBirth

     )

   )

 ) {

   parsedDate =

   new Date(

     dateOfBirth

   );

 }

 await prisma.userProfile.upsert({

   where: {

     userId,

   },

   create: {

     userId,

     fullName,

     phoneNumber,

     gender,

     dateOfBirth:

     parsedDate,

     bio,

     profileImageUrl,

   },

   update: {

     fullName,

     phoneNumber,

     gender,

     dateOfBirth:

     parsedDate,

     bio,

     profileImageUrl,

   },

 });

 if (

   user.role.roleName ===

   "STUDENT"

 ) {

   const student =

   await prisma.student.findUnique({

     where: {

       userId,

     },

   });

   if (student) {

     await prisma.student.update({

       where: {

         userId,

       },

       data: {

         academicYear,

       },

     });

   }

 }

 if (

   user.role.roleName ===

   "ORGANIZATION"

 ) {

   const organization =

   await prisma.organization.findUnique({

     where: {

       userId,

     },

   });

   if (organization) {

     await prisma.organization.update({

       where: {

         userId,

       },

       data: {

         websiteUrl,

       },

     });

   }

 }

 return await getMyProfile(

   userId

 );

};