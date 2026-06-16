import Url from "./url.model";
import crypto from "crypto";
import type { Types } from "mongoose";

export const createShortUrlService = async (
  owner: Types.ObjectId,
  longUrl: string,
) => {
  const shortUrl = crypto
    .createHash("md5")
    .update(longUrl)
    .digest("base64url")
    .slice(0, 7);

  try {
    const url = await Url.create({
      owner,
      originalUrl: longUrl,
      shortUrl: shortUrl,
    });

    return url;
  } catch (error) {
    console.error("Error creating short URL:", error);
  }
};

export const retrieveLongUrlService = async (shortUrl: string) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortUrl },
      { $inc: { accessCount: 1 } },
      { returnDocument: "after" },
    );
    return url;
  } catch (error) {
    console.error("Error retrieving long URL:", error);
  }
};

export const updateLongUrlService = async (
  owner: Types.ObjectId,
  shortUrl: string,
  longUrl: string,
) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortUrl, owner },
      { originalUrl: longUrl },
      { returnDocument: "after" },
    );
    return url;
  } catch (error) {
    console.error("Error updating long URL:", error);
  }
};

export const deleteLongUrlService = async (
  owner: Types.ObjectId,
  shortUrl: string,
) => {
  try {
    const url = await Url.findOneAndDelete({ shortUrl, owner });
    return url;
  } catch (error) {
    console.error("Error deleting long URL:", error);
  }
};

export const getAnalyticsService = async (
  owner: Types.ObjectId,
  shortUrl: string,
) => {
  try {
    const url = await Url.findOne({ shortUrl, owner });
    return url;
  } catch (error) {
    console.error("Error getting analytics:", error);
  }
};

export const getAllUrlsService = async (owner: Types.ObjectId) => {
  try {
    const urls = await Url.find({ owner }).sort({ createdAt: -1 });
    return urls;
  } catch (error) {
    console.error("Error fetching all URLs:", error);
  }
};
