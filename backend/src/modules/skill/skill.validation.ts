import { z } from "zod";

export const createSkillSchema = z.object({
  skillName: z
    .string()

    .min(2, "Skill name is required"),
});

export const updateSkillSchema = z.object({
  skillName: z
    .string()

    .min(2)

    .optional(),
});
