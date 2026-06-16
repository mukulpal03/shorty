import type { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { UnauthorizedError } from "../errors/AppError";

export function requireClerkAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return next(new UnauthorizedError());
    }

    return next();
  } catch (error) {
    console.error("Auth check failed:", error);
    return next(new UnauthorizedError());
  }
}
