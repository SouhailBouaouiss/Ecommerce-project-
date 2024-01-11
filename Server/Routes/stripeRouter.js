import express from "express";
import str from "stripe";
import { clientUrl } from "../Config/env.js";
import { Order } from "../Models/Order.js";

const stripe = str(
  "sk_test_51OWK92GOPixmdfdYkdYHDyVlcAnInkRpdjHH0h3GfKgzmrYPeNGKKYMCaWQ264jwBL8ObJwjFBVUaLBxQiTVfYsy00tdIQYH7y"
);

const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", async (req, res, next) => {
  const customer_id = req.body.customer_id;
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
    const orderDetails = JSON.stringify(
      req.body.cartProducts.map((prd) => prd.id)
    );

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${clientUrl}/ld?order_data=${orderDetails}`,
      cancel_url: `${clientUrl}/vd`,
    });

    console.log(session.url);

    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export { stripeRouter };
