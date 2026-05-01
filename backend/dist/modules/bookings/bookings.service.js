import { prisma } from "../../lib/prisma.js";
export const createBookingService = async (input) => {
    const { name, email, date, service } = input;
    return prisma.booking.create({
        data: {
            name,
            email,
            date: new Date(date),
            service,
        },
    });
};
//# sourceMappingURL=bookings.service.js.map