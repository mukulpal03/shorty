import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";
import type { ZodType } from "zod";
import { z } from "zod";
import { ValidationError } from "../errors/AppError";
import { formatZodError } from "./formatZodError";

type RequestSchemas = {
  body?: ZodType;
  params?: ZodType<ParamsDictionary>;
  query?: ZodType<ParsedQs>;
};

function parseSchema<T extends ZodType>(
  schema: T,
  data: unknown,
  source: "body" | "params" | "query",
): z.infer<T> {
  const result = schema.safeParse(data);

  if (!result.success) {
    const details = formatZodError(result.error).map((issue) => ({
      ...issue,
      field: issue.field === "request" ? source : issue.field,
    }));

    throw new ValidationError(details);
  }

  return result.data;
}

export function validate(schemas: RequestSchemas): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = parseSchema(schemas.body, req.body, "body");
      }

      if (schemas.params) {
        req.params = parseSchema(schemas.params, req.params, "params");
      }

      if (schemas.query) {
        req.query = parseSchema(schemas.query, req.query, "query");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
