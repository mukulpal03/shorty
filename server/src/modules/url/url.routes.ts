import { Router } from "express";
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
  .get(requireClerkAuth, getAllUrlsController)
  .post(requireClerkAuth, createShortUrlController);

router
  .route("/:shortUrl")
  .get(retrieveOriginalUrlController)
  .put(requireClerkAuth, updateLongUrlController)
  .delete(requireClerkAuth, deleteLongUrlController);

router.route("/:shortUrl/stats").get(requireClerkAuth, getAnalyticsController);

export default router;
