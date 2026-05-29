import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (data: any) => {
  const { email, password } = data;
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ FIX: get STUDENT role safely
  const studentRole = await prisma.role.findUnique({
    where: { roleName: "STUDENT" },
  });

  if (!studentRole) {
    throw new Error("STUDENT role not found in DB");
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      roleId: studentRole.id,
    },
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      roleName: "STUDENT",
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { user, token };
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: true, // ✅ important
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      roleName: user.role.roleName,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { user, token };
};
