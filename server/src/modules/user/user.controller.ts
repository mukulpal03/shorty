import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { upsertCurrentUser } from "./user.service";

export async function getMeController(req: Request, res: Response) {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const user = await upsertCurrentUser(userId);
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Failed to upsert current user:", error);
    return res.status(500).json({ error: "Failed to sync user" });
  }
}

