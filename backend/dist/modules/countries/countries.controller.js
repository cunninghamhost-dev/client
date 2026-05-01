import { getCountries, getCountryByCode } from "./countries.service.js";
export const fetchCountries = async (req, res) => {
    const limit = typeof req.query.limit === "string" ? Number(req.query.limit) : undefined;
    const countries = await getCountries({
        search: typeof req.query.search === "string" ? req.query.search : undefined,
        continent: typeof req.query.continent === "string" ? req.query.continent : undefined,
        limit: Number.isFinite(limit) ? limit : undefined,
    });
    res.json(countries);
};
export const fetchCountry = async (req, res) => {
    const code = Array.isArray(req.params.code) ? req.params.code[0] : req.params.code;
    const country = await getCountryByCode(code ?? "");
    if (!country) {
        return res.status(404).json({ success: false, message: "Country not found" });
    }
    res.json(country);
};
//# sourceMappingURL=countries.controller.js.map