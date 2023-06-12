"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = require("../../controllers/inputs/payment");
const { Router } = require("express");
const paymentInputRouter = Router();
paymentInputRouter.post("/new", payment_1.postPayment);
paymentInputRouter.get("/feedback", function (req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id,
    });
});
paymentInputRouter.get("/merchantOrder", payment_1.getMerchantOrderData);
exports.default = paymentInputRouter;
