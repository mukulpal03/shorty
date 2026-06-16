import type { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";

export function requireClerkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return next();
  } catch (error) {
    console.error("Auth check failed:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}

