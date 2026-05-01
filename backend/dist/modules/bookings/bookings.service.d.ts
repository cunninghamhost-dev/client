interface CreateBookingInput {
    name: string;
    email: string;
    date: string;
    service: string;
}
export declare const createBookingService: (input: CreateBookingInput) => Promise<{
    email: string;
    id: string;
    createdAt: Date;
    name: string;
    date: Date;
    service: string;
}>;
export {};
//# sourceMappingURL=bookings.service.d.ts.map