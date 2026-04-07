// src/modules/flights/flights.routes.ts
import { Router } from "express";
import * as flightsController from "./flights.controller"; // Note: removed .js for TS standard, add back if your environment strictly requires it

const router = Router();

// --- Search Routes ---
router.get("/airports", flightsController.getAirports);
router.get("/search", flightsController.getFlights);
router.get("/airlines", flightsController.getAirlinesController);

// --- Flight Selection & Booking ---
router.get("/confirm/:flightId", flightsController.confirmFlightPrice);
router.post("/book/:flightId", flightsController.bookFlightController);
router.post("/multi-city/search", flightsController.multiCitySearch);

// --- Management & Payment ---
router.get("/booking/:reference", flightsController.getBooking);
router.post("/pay/:reference", flightsController.payForFlight);
router.post("/cancel/:reference", flightsController.cancelFlight);

export default router;
