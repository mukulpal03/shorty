import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
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

  const user = await getOrCreateUserByClerkId(userId!);
  const shortUrl = await createShortUrlService(user._id, longUrl, title);
  res.status(201).json({ shortUrl });
};

export const retrieveOriginalUrlController = async (
  req: Request,
  res: Response,
) => {
  const { shortUrl } = req.params;
  const url = await retrieveLongUrlService(shortUrl as string);
  res.status(302).redirect(url.originalUrl);
};

export const updateLongUrlController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { longUrl, title } = req.body;
  const { shortUrl } = req.params;

  const user = await getOrCreateUserByClerkId(userId!);
  const url = await updateLongUrlService(user._id, shortUrl as string, longUrl, title);
  res.status(200).json({ url });
};

export const deleteLongUrlController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { shortUrl } = req.params;

  const user = await getOrCreateUserByClerkId(userId!);
  await deleteLongUrlService(user._id, shortUrl as string);
  res.status(204).send();
};

export const getAnalyticsController = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  const { shortUrl } = req.params;

  const user = await getOrCreateUserByClerkId(userId!);
  const url = await getAnalyticsService(user._id, shortUrl as string);
  res.status(200).json({ url });
};
