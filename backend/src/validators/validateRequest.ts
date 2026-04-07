import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import type { ZodTypeAny } from "zod";

export const validateRequest = (schema: ZodTypeAny, property: "body" | "query" | "params" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (err: any) {
      res.status(400).json({ message: "Validation error", errors: err.errors });
    }
  };
};

