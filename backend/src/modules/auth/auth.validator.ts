import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Register Schema
|--------------------------------------------------------------------------
*/

export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

/*
|--------------------------------------------------------------------------
| Login Schema
|--------------------------------------------------------------------------
*/

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
