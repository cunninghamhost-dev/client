import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Register Schema
|--------------------------------------------------------------------------
*/

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
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
