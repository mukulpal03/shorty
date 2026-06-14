import { Router } from "express";
import {
  createShortUrlController,
  deleteLongUrlController,
  getAllUrlsController,
  getAnalyticsController,
  retrieveOriginalUrlController,
  updateLongUrlController,
} from "./url.controller";

const router = Router();

router.route("/").get(getAllUrlsController).post(createShortUrlController);

router
  .route("/:shortUrl")
  .get(retrieveOriginalUrlController)
  .put(updateLongUrlController)
  .delete(deleteLongUrlController);

router.route("/:shortUrl/stats").get(getAnalyticsController);

export default router;
