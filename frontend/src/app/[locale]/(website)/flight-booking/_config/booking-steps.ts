// src/app/[locale]/(website)/flight-booking/_config/booking-steps.ts
export const BOOKING_STEPS = [
  {
    key: 'customer-info',
    label: 'Customer Information',
    path: 'customer-info',
  },
  {
    key: 'review',
    label: 'Review',
    path: 'review',
  },
  {
    key: 'payment',
    label: 'Overview & Payment',
    path: 'payment',
  },
] as const;
