// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { env } from "../config/env.js"; // your secret/key env

export function generateToken(payload: { userId: string; role: "USER" | "ADMIN" }) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET);
}
