import { z } from "zod";
import { optionalTitleSchema } from "../../validation/schemas/common.schema";

export const createUrlBodySchema = z.object({
  longUrl: z.url("Long URL must be a valid URL"),
  title: optionalTitleSchema,
});

export const updateUrlBodySchema = z.object({
  longUrl: z.url("Long URL must be a valid URL"),
  title: optionalTitleSchema,
});

export type CreateUrlBody = z.infer<typeof createUrlBodySchema>;
export type UpdateUrlBody = z.infer<typeof updateUrlBodySchema>;
