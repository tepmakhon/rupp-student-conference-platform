import { prisma } from "../../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (data: any) => {
  const {
    email,
    password,
    roleName = "STUDENT",
    organizationName,
    description,
  } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const role = await prisma.role.findUnique({
    where: {
      roleName,
    },
  });

  if (!role) {
    throw new Error("Role not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      roleId: role.id,
    },
    include: {
      role: true,
    },
  });

  // Create organization profile automatically
  if (role.roleName === "ORGANIZATION") {
    await prisma.organization.create({
      data: {
        userId: user.id,
        organizationName:
          organizationName || "Unnamed Organization",
        description: description || "",
      },
    });
  }

  const token = jwt.sign(
    {
      id: user.id.toString(),
      email: user.email,
      roleId: user.roleId.toString(),
      roleName: user.role.roleName,
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

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id.toString(),
      email: user.email,
      roleId: user.roleId.toString(),
      roleName: user.role.roleName,
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