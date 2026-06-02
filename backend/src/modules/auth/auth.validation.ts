import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  roleName: z
    .enum(["STUDENT", "ORGANIZATION"])
    .optional(),

  organizationName: z.string().optional(),

  description: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});