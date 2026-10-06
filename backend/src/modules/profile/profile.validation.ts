import { z } from "zod";

const optionalText = (max: number) => z.string().max(max).nullable().optional();
export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(2).max(150).optional(),
  phoneNumber: optionalText(20),
  gender: z.enum(["MALE", "FEMALE", "OTHER", ""]).nullable().optional(),
  dateOfBirth: z.string().refine((value) => value === "" || !Number.isNaN(Date.parse(value)), "Invalid date of birth").nullable().optional(),
  bio: optionalText(1000),
  profileImageUrl: z.string().url().or(z.literal("")).nullable().optional(),
  academicYear: optionalText(50),
  websiteUrl: z.string().url().or(z.literal("")).nullable().optional(),
});
