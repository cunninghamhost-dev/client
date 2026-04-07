import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
export const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const payload = jwt.verify(token, env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
export const requireAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const payload = jwt.verify(token, env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
};
//# sourceMappingURL=authMiddleware.js.map