import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { requireClerkAuth } from "../../middleware/requireClerkAuth";
import {
  createShortUrlController,
  deleteLongUrlController,
  getAllUrlsController,
  getAnalyticsController,
  retrieveOriginalUrlController,
  updateLongUrlController,
} from "./url.controller";

const router = Router();

router
  .route("/")
  .get(requireClerkAuth, asyncHandler(getAllUrlsController))
  .post(requireClerkAuth, asyncHandler(createShortUrlController));

router
  .route("/:shortUrl")
  .get(asyncHandler(retrieveOriginalUrlController))
  .put(requireClerkAuth, asyncHandler(updateLongUrlController))
  .delete(requireClerkAuth, asyncHandler(deleteLongUrlController));

router
  .route("/:shortUrl/stats")
  .get(requireClerkAuth, asyncHandler(getAnalyticsController));

export default router;
