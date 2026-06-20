import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { requireClerkAuth } from "../../middleware/requireClerkAuth";
import { shortUrlParamsSchema } from "../../validation/schemas/common.schema";
import { validate } from "../../validation/validate";
import {
  createShortUrlController,
  deleteLongUrlController,
  getAllUrlsController,
  getAnalyticsController,
  updateLongUrlController,
} from "./url.controller";
import { createUrlBodySchema, updateUrlBodySchema } from "./url.schema";

const router = Router();

router
  .route("/")
  .get(requireClerkAuth, asyncHandler(getAllUrlsController))
  .post(
    requireClerkAuth,
    validate({ body: createUrlBodySchema }),
    asyncHandler(createShortUrlController),
  );

router
  .route("/:shortUrl")
  .put(
    requireClerkAuth,
    validate({ params: shortUrlParamsSchema, body: updateUrlBodySchema }),
    asyncHandler(updateLongUrlController),
  )
  .delete(
    requireClerkAuth,
    validate({ params: shortUrlParamsSchema }),
    asyncHandler(deleteLongUrlController),
  );

router
  .route("/:shortUrl/stats")
  .get(
    requireClerkAuth,
    validate({ params: shortUrlParamsSchema }),
    asyncHandler(getAnalyticsController),
  );

export default router;
