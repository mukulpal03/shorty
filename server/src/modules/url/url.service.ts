import { nanoid } from "nanoid";
import Url from "./url.model";

export const createShortUrlService = async (longUrl: string) => {
  const shortUrl = nanoid(6);

  try {
    const url = await Url.create({ originalUrl: longUrl, shortUrl: shortUrl });

    return url;
  } catch (error) {
    console.error("Error creating short URL:", error);
  }
};
