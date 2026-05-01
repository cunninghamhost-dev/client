import { Router } from "express";
import { fetchCountries, fetchCountry } from "./countries.controller.js";
const router = Router();
router.get("/", fetchCountries);
router.get("/:code", fetchCountry);
export default router;
//# sourceMappingURL=countries.routes.js.map