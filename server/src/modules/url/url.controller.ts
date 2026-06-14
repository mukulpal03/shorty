import type { Request, Response } from "express";
import {
  createShortUrlService,
  deleteLongUrlService,
  getAnalyticsService,
  retrieveLongUrlService,
  updateLongUrlService,
} from "./url.service";

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

export const retrieveOriginalUrlController = async (
  req: Request,
  res: Response,
) => {
  const { shortUrl } = req.params;

  if (!shortUrl) {
    return res.status(400).json({ error: "Short URL is required" });
  }

  try {
    const url = await retrieveLongUrlService(String(shortUrl));

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.status(302).redirect(url.originalUrl);
  } catch (error) {
    console.error("Error retrieving long URL:", error);
    res.status(500).json({ error: "Failed to retrieve long URL" });
  }
};

export const updateLongUrlController = async (req: Request, res: Response) => {
  const { longUrl } = req.body;
  const { shortUrl } = req.params;

  if (!longUrl) {
    return res.status(400).json({ error: "Long URL is required" });
  }

  if (!shortUrl) {
    return res.status(400).json({ error: "Short URL is required" });
  }

  try {
    const url = await updateLongUrlService(String(shortUrl), longUrl);

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.status(200).json({ url });
  } catch (error) {
    console.error("Error updating long URL:", error);
    res.status(500).json({ error: "Failed to update long URL" });
  }
};

export const deleteLongUrlController = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  if (!shortUrl) {
    return res.status(400).json({ error: "Short URL is required" });
  }

  try {
    const url = await deleteLongUrlService(String(shortUrl));

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting long URL:", error);
    res.status(500).json({ error: "Failed to delete long URL" });
  }
};

export const getAnalyticsController = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;

  if (!shortUrl) {
    return res.status(400).json({ error: "Short URL is required" });
  }

  try {
    const url = await getAnalyticsService(String(shortUrl));

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.status(200).json({ url });
  } catch (error) {
    console.error("Error getting analytics:", error);
    res.status(500).json({ error: "Failed to get analytics" });
  }
};
