import { stripe } from "../../config/stripe.js";

const paymentIntent = await stripe.paymentIntents.create({
  amount: 1000,
  currency: "usd",
});
