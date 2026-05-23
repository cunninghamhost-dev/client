import { ConstDriverBookingOption } from '@/lib/constants/website/carrentals/cars-main-content.constant';
import z from 'zod';

export const carRentalMenuFormSchema = z.object({
  exclusive_offers: z.array(z.string()),
  carType: z.array(z.string()),
  capacity: z.array(z.string()),
  electric_cars: z.array(z.string()),
  pickup_savetime: z.array(z.string()),
  traveller_rating: z.array(z.string()),
  payment_option: z.array(z.string()),
  total_price: z.array(z.string()),
  rental_car_company: z.array(z.string()),
  airport_pickup: z.array(z.string()),
  specifications: z.array(z.string()),
});
export const carRentalProfileFormSchema = z.object({
  brand: z.string(),
  model: z.string(),
  img_src: z.string().nullable(),
  engine_type: z.string().nullable(),
  numberForSale: z.number(),
  mileage_form: z.string().nullable(),
  evaluation: z.string().nullable(),
  main_amenitels: z.array(z.object()).nullable(),
  amenities: z.array(z.string()).nullable(),
  classImg: z.string().nullable(),
  percentage_rating: z.number(),
  review: z.string(),
  numbers_rated: z.number(),
  rental_per_day: z.number(),
  total_amount: z.number(),
  car_location: z.array(z.object()).nullable(),
});
export const driverProfileFormSchema = z.object({
  full_name: z.string().min(3, 'Invalid Name, Please enter Full Name'),
  country_code: z.string().min(5),
  phone_number: z.string().min(10),
});
export const rentalsPaymentFormSchema = z.object({
  name_on_card: z.string().min(3, 'Invalid Card Name'),
  card_number: z.string().length(16, 'Invalid Card Number.'),
  expiration_date: z.string().length(5),
  security_code: z.string().length(6),
  billing_zip_code: z.string().length(6),
});
export const bookingOptionFormSchema = z.object({
  booking_option: z.enum(ConstDriverBookingOption),
});

export type TCarRentalMenuFormSchema = z.infer<typeof carRentalMenuFormSchema>;
export type TCarRentalProfileFormSchema = z.infer<typeof carRentalProfileFormSchema>;
export type TDriverProfileFormSchema = z.infer<typeof driverProfileFormSchema>;
export type TBookingOptionFormSchema = z.infer<typeof bookingOptionFormSchema>;
export type TRentalsPaymentFormSchema = z.infer<typeof rentalsPaymentFormSchema>;
