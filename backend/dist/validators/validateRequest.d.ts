import type { Request, Response, NextFunction } from "express";
import type { ZodTypeAny } from "zod";
export declare const validateRequest: (schema: ZodTypeAny, property?: "body" | "query" | "params") => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validateRequest.d.ts.map