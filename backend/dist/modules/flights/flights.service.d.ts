/**
 * ✈️ Flight Offer Search
 */
export declare const searchFlights: (params: any) => Promise<any>;
/**
 * 💰 Confirm Price
 */
export declare const confirmPrice: (flightId: any) => Promise<any>;
/**
 * 🧾 Book Flight
 */
export declare const bookFlight: (flight_id: string, payload: any) => Promise<any>;
/**
 * 📄 Booking Details
 */
export declare const getBookingDetails: (reference: string) => Promise<any>;
/**
 * ❌ Cancel Booking
 */
export declare const cancelBooking: (reference: string) => Promise<any>;
/**
 * 🎟️ Issue Ticket (Payment)
 */
export declare const issueTicket: (reference: string) => Promise<any>;
/**
 * 🌍 Multi-city Flight Search
 */
export declare const searchMultiCityFlights: (payload: {
    destinations: {
        origin: string;
        destination: string;
        departure_date: string;
    }[];
    cabin: string;
    adults: number;
    children?: number;
    infants?: number;
}) => Promise<any>;
/**
 * 🛫 Airports Search
 */
export declare const searchAirports: (keyword: string) => Promise<any>;
/**
 * 🛩️ Airlines
 */
export declare const getAirlines: () => Promise<any>;
//# sourceMappingURL=flights.service.d.ts.map