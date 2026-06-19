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

 return await prisma.user.findUnique({

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

       },

     },

     organization: true,

   },

 });

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

 /*
 |--------------------------------------------------------------------------
 | User Profile
 |--------------------------------------------------------------------------
 */

 await prisma.userProfile.update({

   where: {

     userId,

   },

   data: {

     fullName,

     phoneNumber,

     gender,

     dateOfBirth:

     dateOfBirth

     ? new Date(

       dateOfBirth

     )

     : null,

     bio,

     profileImageUrl,

   },

 });

 /*
 |--------------------------------------------------------------------------
 | Student
 |--------------------------------------------------------------------------
 */

 if (

 user.role.roleName ===

 "STUDENT"

 ) {

   await prisma.student.update({

     where: {

       userId,

     },

     data: {

       academicYear,

     },

   });

 }

 /*
 |--------------------------------------------------------------------------
 | Organization
 |--------------------------------------------------------------------------
 */

 if (

 user.role.roleName ===

 "ORGANIZATION"

 ) {

   await prisma.organization.update({

     where: {

       userId,

     },

     data: {

       websiteUrl,

     },

   });

 }

 return await getMyProfile(

   userId

 );

};