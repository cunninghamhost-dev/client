import jwt from "jsonwebtoken";
export declare function generateToken(payload: {
    userId: string;
    role: "USER" | "ADMIN";
}): string;
export declare function verifyToken(token: string): string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map