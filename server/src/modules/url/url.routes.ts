import { Router } from "express";
import {
  createShortUrlController,
  retrieveOriginalUrlController,
  updateLongUrlController,
} from "./url.controller";

const router = Router();

router.route("/").post(createShortUrlController);

router
  .route("/:shortUrl")
  .get(retrieveOriginalUrlController)
  .put(updateLongUrlController);

export default router;
