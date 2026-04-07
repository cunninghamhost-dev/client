import type { Request, Response } from "express";
import { stripe } from "../../config/stripe.js";

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { price, flightId } = req.body;

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
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                },
            ],

            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,

            metadata: {
                flightId,
            },
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: "Payment failed" });
    }
};
