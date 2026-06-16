import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { BadRequestError } from "../../errors/AppError";
import { getOrCreateUserByClerkId } from "../user/user.service";
import {
  createShortUrlService,
  deleteLongUrlService,
  getAllUrlsService,
  getAnalyticsService,
  retrieveLongUrlService,
  updateLongUrlService,
} from "./url.service";

export const getAllUrlsController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const user = await getOrCreateUserByClerkId(userId!);
  const urls = await getAllUrlsService(user._id);
  res.status(200).json({ urls });
};

export const createShortUrlController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { longUrl, title } = req.body;

  if (!longUrl) {
    throw new BadRequestError("Long URL is required");
  }

  const trimmedTitle =
    typeof title === "string" ? title.trim().slice(0, 100) : undefined;

  const user = await getOrCreateUserByClerkId(userId!);
  const shortUrl = await createShortUrlService(
    user._id,
    longUrl,
    trimmedTitle || undefined,
  );
  res.status(201).json({ shortUrl });
};

export const retrieveOriginalUrlController = async (
  req: Request,
  res: Response,
) => {
  const { shortUrl } = req.params;

  if (!shortUrl) {
    throw new BadRequestError("Short URL is required");
  }

  const url = await retrieveLongUrlService(String(shortUrl));
  res.status(302).redirect(url.originalUrl);
};

export const updateLongUrlController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { longUrl, title } = req.body;
  const { shortUrl } = req.params;

  if (!longUrl) {
    throw new BadRequestError("Long URL is required");
  }

  if (!shortUrl) {
    throw new BadRequestError("Short URL is required");
  }

  const trimmedTitle =
    typeof title === "string" ? title.trim().slice(0, 100) : undefined;

  const user = await getOrCreateUserByClerkId(userId!);
  const url = await updateLongUrlService(
    user._id,
    String(shortUrl),
    longUrl,
    trimmedTitle,
  );
  res.status(200).json({ url });
};

export const deleteLongUrlController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { shortUrl } = req.params;

  if (!shortUrl) {
    throw new BadRequestError("Short URL is required");
  }

  const user = await getOrCreateUserByClerkId(userId!);
  await deleteLongUrlService(user._id, String(shortUrl));
  res.status(204).send();
};

export const getAnalyticsController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { shortUrl } = req.params;

  if (!shortUrl) {
    throw new BadRequestError("Short URL is required");
  }

  const user = await getOrCreateUserByClerkId(userId!);
  const url = await getAnalyticsService(user._id, String(shortUrl));
  res.status(200).json({ url });
};
