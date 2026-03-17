import { Router } from "express";
import * as authController from "./auth.controller.js";
import { validateRequest } from "../../validators/validateRequest.js";
import {
  registerSchema,
  loginSchema,
} from "./auth.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Base route: /api/auth
|
| POST /register   
| POST /login     
|
*/

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

router.post(
  "/login",
  validateRequest(loginSchema),
  authController.login
);

export default router;
