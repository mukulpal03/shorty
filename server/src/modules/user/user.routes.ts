import { Router } from "express";

import { asyncHandler } from "../../middleware/asyncHandler";
import { requireClerkAuth } from "../../middleware/requireClerkAuth";
import { getMeController } from "./user.controller";

const router = Router();

router.get("/me", requireClerkAuth, asyncHandler(getMeController));

export default router;
