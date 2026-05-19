import { Router } from "express";
import {
  createShortUrlController,
  deleteLongUrlController,
  getAnalyticsController,
  retrieveOriginalUrlController,
  updateLongUrlController,
} from "./url.controller";

const router = Router();

router.route("/").post(createShortUrlController);

router
  .route("/:shortUrl")
  .get(retrieveOriginalUrlController)
  .put(updateLongUrlController)
  .delete(deleteLongUrlController);

router.route("/:shortUrl/stats").get(getAnalyticsController);

export default router;
