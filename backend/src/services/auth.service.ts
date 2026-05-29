import {
  findUserByEmail,
  createUser,
} from "../repositories/auth.repository.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/hash.js";

import { generateToken } from "../utils/jwt.js";

export const registerUser = async (data: any) => {
  const existing = await findUserByEmail(data.email);

  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser({
    email: data.email,
    passwordHash: hashedPassword,
    roleId: data.roleId,
  });

  const token = generateToken({
    id: user.id,
    email: user.email,
    roleId: user.roleId,
  });

  return { user, token };
};

export const loginUser = async (data: any) => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await comparePassword(
    data.password,
    user.passwordHash
  );

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    roleId: user.roleId,
  });

  return { user, token };
};