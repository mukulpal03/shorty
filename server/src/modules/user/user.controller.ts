import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { upsertCurrentUser } from "./user.service";

export async function getMeController(req: Request, res: Response) {
  const { userId } = getAuth(req);
  const user = await upsertCurrentUser(userId!);
  return res.status(200).json({ user });
}
