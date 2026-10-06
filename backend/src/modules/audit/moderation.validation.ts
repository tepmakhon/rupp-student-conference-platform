import { z } from "zod";
export const rejectionSchema = z.object({ reason: z.string().trim().min(3).max(1000) });
