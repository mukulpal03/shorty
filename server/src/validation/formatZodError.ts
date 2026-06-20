import type { ZodError } from "zod";
import type { ValidationIssue } from "../errors/AppError";

export function formatZodError(error: ZodError): ValidationIssue[] {
  return error.issues.map((issue) => ({
    field: issue.path.length > 0 ? issue.path.join(".") : "request",
    message: issue.message,
  }));
}
