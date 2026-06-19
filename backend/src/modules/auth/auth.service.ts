import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { prisma }
from "../../config/prisma.js";

import { AppError }
from "../../utils/AppError.js";

import {
  createAuditLog,
}
from "../audit/audit.service.js";

import {
  RegisterPayload,
  LoginPayload,
}
from "./auth.types.js";

import {
  validateRegister,
  validateLogin,
}
from "./auth.validation.js";

const JWT_SECRET =

process.env.JWT_SECRET ||

"secret";

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

export const registerUser =

async (

  data: RegisterPayload

) => {

  validateRegister(

    data

  );

  const {

    email,

    password,

    roleName,

    fullName,

    universityId,

    facultyId,

    majorId,

    academicYear,

    organizationName,

    description,

  } = data;

  /*
  |--------------------------------------------------------------------------
  | Disable Admin Registration
  |--------------------------------------------------------------------------
  */

  if (
    roleName === "ADMIN"
  ) {

    throw new AppError(

      "Admin registration is disabled",

      403

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Normalize Email
  |--------------------------------------------------------------------------
  */

  const normalizedEmail =

    email

    .trim()

    .toLowerCase();

  /*
  |--------------------------------------------------------------------------
  | Check Existing User
  |--------------------------------------------------------------------------
  */

  const existingUser =

  await prisma.user.findUnique({

    where: {

      email:

      normalizedEmail,

    },

  });

  if (existingUser) {

    throw new AppError(

      "Email already exists",

      409

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Find Role
  |--------------------------------------------------------------------------
  */

  const role =

  await prisma.role.findUnique({

    where: {

      roleName,

    },

  });

  if (!role) {

    throw new AppError(

      "Role not found",

      404

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Student Validation
  |--------------------------------------------------------------------------
  */

  if (

    roleName ===

    "STUDENT"

  ) {

    if (

      !fullName ||

      !universityId ||

      !facultyId ||

      !majorId

    ) {

      throw new AppError(

        "Student information is required",

        400

      );

    }

  }

  /*
  |--------------------------------------------------------------------------
  | Organization Validation
  |--------------------------------------------------------------------------
  */

  if (

    roleName ===

    "ORGANIZATION"

  ) {

    if (

      !organizationName

    ) {

      throw new AppError(

        "Organization name is required",

        400

      );

    }

  }

  /*
  |--------------------------------------------------------------------------
  | Hash Password
  |--------------------------------------------------------------------------
  */

  const hashedPassword =

  await bcrypt.hash(

    password,

    10

  );

  /*
  |--------------------------------------------------------------------------
  | Transaction
  |--------------------------------------------------------------------------
  */

  const user =

  await prisma.$transaction(

  async (tx) => {

    /*
    |--------------------------------------------------------------------------
    | Create User
    |--------------------------------------------------------------------------
    */

    const newUser =

    await tx.user.create({

      data: {

        email:

        normalizedEmail,

        passwordHash:

        hashedPassword,

        roleId:

        role.id,

      },

      include: {

        role: true,

      },

    });

    /*
    |--------------------------------------------------------------------------
    | Create User Profile
    |--------------------------------------------------------------------------
    */

    await tx.userProfile.create({

      data: {

        userId:

        newUser.id,

        fullName:

        fullName ||

        organizationName ||

        "Unknown",

      },

    });

    /*
    |--------------------------------------------------------------------------
    | Create Student
    |--------------------------------------------------------------------------
    */

    if (

      role.roleName ===

      "STUDENT"

    ) {

      await tx.student.create({

        data: {

          userId:

          newUser.id,

          universityId:

          BigInt(

            String(

              universityId

            )

          ),

          facultyId:

          BigInt(

            String(

              facultyId

            )

          ),

          majorId:

          BigInt(

            String(

              majorId

            )

          ),

          academicYear:

          academicYear ||

          null,

        },

      });

    }

    /*
    |--------------------------------------------------------------------------
    | Create Organization
    |--------------------------------------------------------------------------
    */

    if (

  role.roleName ===

  "ORGANIZATION"

) {

  await tx.organization.create({

    data: {

      userId:

      newUser.id,

      organizationName:

      organizationName ||

      "Unnamed Organization",

      description:

      description ||

      "",

    },

  });

}

    return newUser;

  });

  /*
  |--------------------------------------------------------------------------
  | Audit Log
  |--------------------------------------------------------------------------
  */

  await createAuditLog(

    user.id,

    `USER_REGISTERED_${role.roleName}`

  );

  /*
  |--------------------------------------------------------------------------
  | JWT
  |--------------------------------------------------------------------------
  */

  const token =

  jwt.sign(

  {

    id:

    user.id.toString(),

    email:

    user.email,

    roleId:

    user.roleId.toString(),

    roleName:

    role.roleName,

  },

  JWT_SECRET,

  {

    expiresIn:

    "7d",

  });

  return {

    user,

    token,

  };

};

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export const loginUser =

async (

  data: LoginPayload

) => {

  validateLogin(

    data

  );

  const {

    email,

    password,

  } = data;

  const normalizedEmail =

    email

    .trim()

    .toLowerCase();

  const user =

  await prisma.user.findUnique({

    where: {

      email:

      normalizedEmail,

    },

    include: {

      role: true,

      profile: true,

    },

  });

  if (!user) {

    throw new AppError(

      "Invalid credentials",

      401

    );

  }

  const isValid =

  await bcrypt.compare(

    password,

    user.passwordHash

  );

  if (!isValid) {

    await createAuditLog(

      user.id,

      "LOGIN_FAILED"

    );

    throw new AppError(

      "Invalid credentials",

      401

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Audit Log
  |--------------------------------------------------------------------------
  */

  await createAuditLog(

    user.id,

    "LOGIN_SUCCESS"

  );

  /*
  |--------------------------------------------------------------------------
  | JWT
  |--------------------------------------------------------------------------
  */

  const token =

  jwt.sign(

  {

    id:

    user.id.toString(),

    email:

    user.email,

    roleId:

    user.roleId.toString(),

    roleName:

    user.role.roleName,

  },

  JWT_SECRET,

  {

    expiresIn:

    "7d",

  });

  return {

    user,

    token,

  };

};