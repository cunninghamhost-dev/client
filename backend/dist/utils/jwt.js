// src/utils/jwt.ts
import jwt from "jsonwebtoken";
import { env } from "../config/env.js"; // your secret/key env
export function generateToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });
}
export function verifyToken(token) {
    return jwt.verify(token, env.JWT_SECRET);
}
//# sourceMappingURL=jwt.js.map