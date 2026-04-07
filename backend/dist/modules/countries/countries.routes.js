import { Router } from "express";
import { fetchCountries } from "./countries.controller.js";
const router = Router();
router.get("/", fetchCountries);
export default router;
//# sourceMappingURL=countries.routes.js.map