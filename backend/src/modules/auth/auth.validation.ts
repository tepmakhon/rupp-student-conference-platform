import { z } from "zod";
import { AppError } from "../../utils/AppError.js";
import { type RegisterPayload, type LoginPayload } from "./auth.types.js";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).refine((value) => Buffer.byteLength(value, "utf8") <= 72, "Password exceeds bcrypt's 72-byte limit"),
});
const registerSchema = loginSchema.extend({
  password: z.string().min(8).refine((value) => Buffer.byteLength(value, "utf8") <= 72, "Password exceeds bcrypt's 72-byte limit"),
  roleName: z.enum(["STUDENT", "ORGANIZATION", "ADMIN"]),
  fullName: z.string().trim().min(2).max(150).optional(),
  organizationName: z.string().trim().min(2).max(255).optional(),
  description: z.string().max(5000).optional(),
  academicYear: z.string().max(50).optional(),
  universityId: z.string().regex(/^[1-9]\d*$/).optional(),
  facultyId: z.string().regex(/^[1-9]\d*$/).optional(),
  majorId: z.string().regex(/^[1-9]\d*$/).optional(),
});
export const validateRegister = (data: RegisterPayload) => {
  const result = registerSchema.safeParse(data);
  if (!result.success) throw new AppError(result.error.issues[0].message, 400);
};
export const validateLogin = (data: LoginPayload) => {
  if (!loginSchema.safeParse(data).success) throw new AppError("Invalid credentials", 400);
};
