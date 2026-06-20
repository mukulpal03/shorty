import { z } from "zod";

export const shortUrlSchema = z
  .string()
  .trim()
  .min(1, "Short URL is required")
  .regex(/^[A-Za-z0-9_-]+$/, "Invalid short URL format");

export const shortUrlParamsSchema = z.object({
  shortUrl: shortUrlSchema,
});

export const optionalTitleSchema = z
  .string()
  .trim()
  .max(100, "Title must be at most 100 characters")
  .optional()
  .transform((value) => value || undefined);
