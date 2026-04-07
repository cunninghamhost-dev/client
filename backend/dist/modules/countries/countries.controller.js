import { Request, Response } from "express";
import { getCountries } from "./countries.service.js";
export const fetchCountries = async (req, res) => {
    const countries = await getCountries();
    res.json(countries);
};
//# sourceMappingURL=countries.controller.js.map