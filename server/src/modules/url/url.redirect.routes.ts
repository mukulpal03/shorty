import { Router, type NextFunction, type Request, type Response } from "express";

import { asyncHandler } from "../../middleware/asyncHandler";
import { SHORT_CODE_PATTERN } from "./url.constants";
import { retrieveOriginalUrlController } from "./url.controller";

const router = Router();

function requireValidShortCode(req: Request, _res: Response, next: NextFunction) {
  const { shortUrl } = req.params;

  if (!shortUrl || !SHORT_CODE_PATTERN.test(shortUrl as string)) {
    return next();
  }

  return next();
}

router.get(
  "/:shortUrl",
  requireValidShortCode,
  asyncHandler(retrieveOriginalUrlController),
);

export default router;
