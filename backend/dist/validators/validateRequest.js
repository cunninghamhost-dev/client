import { z } from "zod";
export const validateRequest = (schema, property = "body") => {
    return (req, res, next) => {
        try {
            schema.parse(req[property]);
            next();
        }
        catch (err) {
            res.status(400).json({ message: "Validation error", errors: err.errors });
        }
    };
};
//# sourceMappingURL=validateRequest.js.map