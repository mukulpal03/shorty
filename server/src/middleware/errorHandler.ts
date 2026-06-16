import type { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { AppError } from "../errors/AppError";

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ error: "Not found" });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (res.headersSent) {
    console.error("Error after headers sent:", err);
    return;
  }

  if (err instanceof AppError) {
    if (!err.isOperational) {
      console.error("Non-operational error:", err);
    }

    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.code && { code: err.code }),
    });
  }

  if (err instanceof MongooseError.ValidationError) {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");

    return res.status(400).json({ error: message, code: "VALIDATION_ERROR" });
  }

  if (err instanceof MongooseError.CastError) {
    return res.status(400).json({
      error: `Invalid ${err.path}: ${err.value}`,
      code: "INVALID_ID",
    });
  }

  console.error("Unhandled error:", err);

  return res.status(500).json({
    error: "Internal server error",
    code: "INTERNAL_ERROR",
  });
}
