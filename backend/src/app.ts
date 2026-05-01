// src/app.ts
import express from "express";
import cors from "cors";
import helmet from "helmet";

// Import all module routes
import authRoutes from "./modules/auth/auth.routes.js";
import bookingsRoutes from "./modules/bookings/bookings.routes.js";
import flightsRoutes from "./modules/flights/flights.routes.js";
import paymentsRoutes from "./modules/payments/payments.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import countriesRoutes from "./modules/countries/countries.routes.js";

// Import middleware
import { errorHandler } from "./middleware/errorMiddleware.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { env } from "./config/env.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  env.CLIENT_URL,
  ...(env.CLIENT_URLS?.split(",").map((origin) => origin.trim()).filter(Boolean) ?? []),
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    const isAllowedVercelPreview = /^https:\/\/client-frontend(?:-[\w-]+)?\.vercel\.app$/.test(origin);

    if (isAllowedVercelPreview) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
}));

app.use(helmet());
app.use(express.json());
app.use(requestLogger);

// Register routes for all modules here
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/flights", flightsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/countries", countriesRoutes);

// Global error handler
app.use(errorHandler);

export default app;
