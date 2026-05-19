import { Router } from "express";
import {
  createShortUrlController,
  retrieveOriginalUrlController,
} from "./url.controller";

const router = Router();

router.route("/").post(createShortUrlController);

router.route("/:shortUrl").get(retrieveOriginalUrlController);

export default router;
