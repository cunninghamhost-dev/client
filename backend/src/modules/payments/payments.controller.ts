import type { Request, Response } from "express";
import { stripe } from "../../config/stripe.js";
import { env } from "../../config/env.js";

const getClientUrl = () => {
    const clientUrl = env.CLIENT_URL ?? "http://localhost:3000";
    return clientUrl.endsWith("/") ? clientUrl.slice(0, -1) : clientUrl;
};

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { price, flightId, bookingReference, successUrl, cancelUrl } = req.body;
        const amount = Math.round(Number(price) * 100);

        if (!Number.isFinite(amount) || amount <= 0) {
            return res.status(400).json({ success: false, message: "A valid payment amount is required" });
        }

        if (!flightId || typeof flightId !== "string") {
            return res.status(400).json({ success: false, message: "Flight ID is required" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",

            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Flight Booking",
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],

            success_url: typeof successUrl === "string" ? successUrl : `${getClientUrl()}/payment-success`,
            cancel_url: typeof cancelUrl === "string" ? cancelUrl : `${getClientUrl()}/payment-cancel`,

            metadata: {
                flightId,
                ...(bookingReference ? { bookingReference: String(bookingReference) } : {}),
            },
        });

        res.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe checkout error:", error.message);
        res.status(500).json({ success: false, message: "Payment failed" });
    }
};
