import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { shortUrlParamsSchema } from "../../validation/schemas/common.schema";
import { validate } from "../../validation/validate";
import { retrieveOriginalUrlController } from "./url.controller";

const router = Router();

router.get(
  "/:shortUrl",
  validate({ params: shortUrlParamsSchema }),
  asyncHandler(retrieveOriginalUrlController),
);

export default router;
