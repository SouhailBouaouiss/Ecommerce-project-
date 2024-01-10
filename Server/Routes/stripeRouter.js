import express from "express";
import str from "stripe";
import { clientUrl } from "../Config/env.js";

const stripe = str(
  "sk_test_51OWK92GOPixmdfdYkdYHDyVlcAnInkRpdjHH0h3GfKgzmrYPeNGKKYMCaWQ264jwBL8ObJwjFBVUaLBxQiTVfYsy00tdIQYH7y"
);

const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", async (req, res, next) => {
  const line_items = req.body.cartProducts.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.imgUrl],
        },
        unit_amount: 1524,
      },
      quantity: product.quantity,
    };
  });
  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${clientUrl}/ld`,
      cancel_url: `${clientUrl}/vd`,
    });
  } catch (error) {}

  res.send({ url: session.url });
});

export { stripeRouter };
