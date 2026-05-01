import express from "express";
import { createCheckoutSession } from "./payments.controller.js";
const router = express.Router();
router.post("/checkout", createCheckoutSession);
export default router;
//# sourceMappingURL=payments.routes.js.map