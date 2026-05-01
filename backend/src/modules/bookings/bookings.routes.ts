import { Router } from "express";
import * as bookingsController from "./bookings.controller.js";

const router = Router();

// Example routes
router.get("/", bookingsController.getAllBookings);
router.post("/", bookingsController.createBooking);

export default router;

