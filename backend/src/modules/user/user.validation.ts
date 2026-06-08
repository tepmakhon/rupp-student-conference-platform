import { z } from "zod";

export const createProfileSchema = z.object({
  fullName: z
    .string()
    .min(2)
    .max(150),

  phoneNumber: z
    .string()
    .max(20)
    .optional(),

  gender: z
    .enum([
      "MALE",
      "FEMALE",
      "OTHER",
    ])
    .optional(),

  dateOfBirth: z
    .string()
    .datetime()
    .optional(),

  bio: z
    .string()
    .max(1000)
    .optional(),

  profileImageUrl: z
    .string()
    .optional(),
});

export const updateProfileSchema =
  createProfileSchema.partial();

export type CreateProfileInput =
  z.infer<
    typeof createProfileSchema
  >;

export type UpdateProfileInput =
  z.infer<
    typeof updateProfileSchema
  >;