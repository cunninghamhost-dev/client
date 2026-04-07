import { searchAirports, searchFlights, confirmPrice, bookFlight, getBookingDetails, cancelBooking, issueTicket, searchMultiCityFlights, getAirlines, } from "./flights.service";
export const getAirports = async (req, res) => {
    try {
        const keyword = String(req.query.keyword || "");
        const data = await searchAirports(keyword);
        res.json(data);
    }
    catch (error) {
        console.error("Airport fetch error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getFlights = async (req, res) => {
    try {
        const { adults, cabin, departure_date, destination, origin } = req.query;
        // Quick validation for required fields
        if (!adults || !cabin || !departure_date || !destination || !origin) {
            return res.status(400).json({
                success: false,
                message: "Missing required search parameters: adults, cabin, departure_date, destination, and origin are required."
            });
        }
        const data = await searchFlights(req.query);
        res.json(data);
    }
    catch (error) {
        console.error("Flight search error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
// backend/src/modules/flights/flights.controller.ts
export const confirmFlightPrice = async (req, res) => {
    try {
        // Destructure the string out of req.params
        const { flightId } = req.params;
        if (!flightId) {
            return res.status(400).json({ message: "Flight ID is required" });
        }
        // Pass the STRING 'flightId' to the service
        const data = await confirmPrice(flightId);
        res.json(data);
    }
    catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};
export const bookFlightController = async (req, res) => {
    try {
        const { flightId } = req.params;
        const data = await bookFlight(flightId, req.body);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getBooking = async (req, res) => {
    try {
        const { reference } = req.params;
        const data = await getBookingDetails(reference);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const cancelFlight = async (req, res) => {
    try {
        const { reference } = req.params;
        const data = await cancelBooking(reference);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const payForFlight = async (req, res) => {
    try {
        const { reference } = req.params;
        const data = await issueTicket(reference);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const multiCitySearch = async (req, res) => {
    try {
        const data = await searchMultiCityFlights(req.body);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const getAirlinesController = async (req, res) => {
    try {
        const data = await getAirlines();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
//# sourceMappingURL=flights.controller.js.map