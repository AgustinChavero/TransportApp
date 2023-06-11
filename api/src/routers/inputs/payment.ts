import { postPayment, getMerchantOrderData } from "../../controllers/inputs/payment";

const { Router } = require("express");

const paymentInputRouter = Router();

paymentInputRouter.post("/new", postPayment);

paymentInputRouter.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

paymentInputRouter.get("/merchantOrder", getMerchantOrderData);
export default paymentInputRouter;
