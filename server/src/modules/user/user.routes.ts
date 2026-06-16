import { Router } from "express";

import { requireClerkAuth } from "../../middleware/requireClerkAuth";
import { getMeController } from "./user.controller";

const router = Router();

router.get("/me", requireClerkAuth, getMeController);

export default router;

