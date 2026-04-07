import express from "express";
import { createCheckoutSession } from "./payments.controller";

const router = express.Router();

router.post("/checkout", createCheckoutSession);

export default router;
