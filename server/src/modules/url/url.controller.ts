import type { Request, Response } from "express";
import { createShortUrlService } from "./url.service";

export const createShortUrlController = async (req: Request, res: Response) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  try {
    const shortUrl = await createShortUrlService(longUrl);
    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Failed to create short URL" });
  }
};
