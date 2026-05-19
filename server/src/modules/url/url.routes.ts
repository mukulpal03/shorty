import { Router } from "express";
import { createShortUrlController } from "./url.controller";

const router = Router();

router.route("/").post(createShortUrlController);

export default router;
