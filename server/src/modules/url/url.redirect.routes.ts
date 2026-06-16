import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler";
import { retrieveOriginalUrlController } from "./url.controller";

const router = Router();

router.get("/:shortUrl", asyncHandler(retrieveOriginalUrlController));

export default router;
