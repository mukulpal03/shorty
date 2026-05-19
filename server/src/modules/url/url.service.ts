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

export const retrieveLongUrlService = async (shortUrl: string) => {
  try {
    const url = await Url.findOne({ shortUrl });
    return url;
  } catch (error) {
    console.error("Error retrieving long URL:", error);
  }
};

export const updateLongUrlService = async (
  shortUrl: string,
  longUrl: string,
) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortUrl },
      { originalUrl: longUrl },
      { new: true },
    );
    return url;
  } catch (error) {
    console.error("Error updating long URL:", error);
  }
};
