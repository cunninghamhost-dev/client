import { z } from "zod";
const envSchema = z.object({
    PORT: z.string(),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    CLIENT_URL: z.string().optional(),
    CLIENT_URLS: z.string().optional(),
});
export const env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map