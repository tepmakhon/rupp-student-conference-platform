import { prisma } from "../../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { createAuditLog } from "../audit/audit.service.js";
import { AppError } from "../../utils/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (data: any) => {
  const {
    email,
    password,
    roleName = "STUDENT",
    organizationName,
    description,
  } = data;

  const existingUser =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      409
    );
  }

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

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  const user =
    await prisma.user.create({
      data: {
        email,
        passwordHash:
          hashedPassword,
        roleId: role.id,
      },

      include: {
        role: true,
      },
    });

  /*
  |--------------------------------------------------------------------------
  | Auto Create Organization Profile
  |--------------------------------------------------------------------------
  */
  if (
    role.roleName ===
    "ORGANIZATION"
  ) {
    await prisma.organization.create({
      data: {
        userId: user.id,

        organizationName:
          organizationName ||
          "Unnamed Organization",

        description:
          description || "",
      },
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Audit Log
  |--------------------------------------------------------------------------
  */
  await createAuditLog(
    user.id,
    `USER_REGISTERED_${role.roleName}`
  );

  const token = jwt.sign(
    {
      id: user.id.toString(),
      email: user.email,
      roleId:
        user.roleId.toString(),
      roleName:
        user.role.roleName,
    },

    JWT_SECRET,

    {
      expiresIn: "7d",
    }
  );

  return {
    user,
    token,
  };
};

export const loginUser = async (
  data: any
) => {
  const {
    email,
    password,
  } = data;

  const user =
    await prisma.user.findUnique({
      where: {
        email,
      },

      include: {
        role: true,
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

  const token = jwt.sign(
    {
      id: user.id.toString(),
      email: user.email,
      roleId:
        user.roleId.toString(),
      roleName:
        user.role.roleName,
    },

    JWT_SECRET,

    {
      expiresIn: "7d",
    }
  );

  return {
    user,
    token,
  };
};