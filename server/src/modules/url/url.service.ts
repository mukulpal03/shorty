import type { Types } from "mongoose";
import crypto from "crypto";
import { NotFoundError } from "../../errors/AppError";
import { rethrowMongoError } from "../../errors/mongo";
import Url from "./url.model";

export const createShortUrlService = async (
  owner: Types.ObjectId,
  longUrl: string,
  title?: string,
) => {
  const shortUrl = crypto
    .createHash("md5")
    .update(longUrl)
    .digest("base64url")
    .slice(0, 7);

  try {
    return await Url.create({
      owner,
      originalUrl: longUrl,
      shortUrl,
      ...(title ? { title } : {}),
    });
  } catch (error) {
    rethrowMongoError(error);
  }
};

export const retrieveLongUrlService = async (shortUrl: string) => {
  const url = await Url.findOneAndUpdate(
    { shortUrl },
    { $inc: { accessCount: 1 } },
    { returnDocument: "after" },
  );

  if (!url) {
    throw new NotFoundError("URL not found");
  }

  return url;
};

export const updateLongUrlService = async (
  owner: Types.ObjectId,
  shortUrl: string,
  longUrl: string,
) => {
  const url = await Url.findOneAndUpdate(
    { shortUrl, owner },
    { originalUrl: longUrl },
    { returnDocument: "after" },
  );

  if (!url) {
    throw new NotFoundError("URL not found");
  }

  return url;
};

export const deleteLongUrlService = async (
  owner: Types.ObjectId,
  shortUrl: string,
) => {
  const url = await Url.findOneAndDelete({ shortUrl, owner });

  if (!url) {
    throw new NotFoundError("URL not found");
  }

  return url;
};

export const getAnalyticsService = async (
  owner: Types.ObjectId,
  shortUrl: string,
) => {
  const url = await Url.findOne({ shortUrl, owner });

  if (!url) {
    throw new NotFoundError("URL not found");
  }

  return url;
};

export const getAllUrlsService = async (owner: Types.ObjectId) => {
  return Url.find({ owner }).sort({ createdAt: -1 });
};
