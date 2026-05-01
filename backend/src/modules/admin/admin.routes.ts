import { Router } from "express";
import { requireAdmin } from "../../middleware/authMiddleware.js";
import { validateRequest } from "../../validators/validateRequest.js";
import * as adminController from "./admin.controller.js";
import { z } from "zod";

const router = Router();

// Admin: Get all users
router.get("/users", requireAdmin, adminController.getAllUsers);

// Admin: Get user by ID
router.get("/users/:id", requireAdmin, adminController.getUserById);

// Admin: Delete user
router.delete("/users/:id", requireAdmin, adminController.deleteUser);

// Admin: Dashboard stats
router.get("/stats", requireAdmin, adminController.getDashboardStats);

// Admin: Update user role
const updateUserRoleSchema = z.object({
  role: z.enum(["user", "admin", "moderator"])
});
router.patch(
  "/users/:id/role",
  requireAdmin,
  validateRequest(updateUserRoleSchema, "body"),
  adminController.updateUserRole
);

export default router;

