// src/modules/admin/admin.controller.ts
import type { Request, Response } from "express";

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  // your logic
  res.json({ message: "All users" });
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `User ${id}` });
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ message: `Deleted user ${id}` });
};

// Dashboard stats
export const getDashboardStats = async (req: Request, res: Response) => {
  res.json({ users: 100, sales: 5000 });
};

// Update user role
export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  res.json({ message: `Updated user ${id} to role ${role}` });
};
