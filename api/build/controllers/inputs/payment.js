"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMerchantOrderData = exports.postPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const connection_1 = require("../../connection/connection");
const { MP_TOKEN } = process.env;
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: MP_TOKEN,
});
const { FRONT_URL } = process.env;
const postPayment = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const products = req.body;
    console.log(products[0]);
    const passageDoc = yield connection_1.db.collection("passages").doc(products[0].id).get();
    if (!passageDoc.exists) {
      throw new Error("El pasaje no existe");
    }
    const passageData = passageDoc.data();
    const currentStock = passageData.stock;
    if (currentStock < products[0].quantity) {
      throw new Error("No hay suficiente stock disponible");
    }
    const description = products[0].description;
    const seatRegex = /asiento (\d+)/g;
    const numberSeat = [];
    let match;
    while ((match = seatRegex.exec(description)) !== null) {
      numberSeat.push(match[1]);
    }
    const areSeatsValid = numberSeat.every((seat) => passageData.numberSeat.includes(seat));
    if (!areSeatsValid) {
      throw new Error("Algunos asientos seleccionados no son válidos");
    }
    let preference = {
      items: products,
      back_urls: {
        // corregir redireccionamiento
        // success: `http://localhost:3001/home/reserva/viajes/${products[0].id}/buslayout/confirmacion/pagos/checkout`,
        // failure: `http://localhost:3001/home/reserva/viajes/${products[0].id}/buslayout/confirmacion/pagos/checkout/failed`,
        success: `https://urban-movi.vercel.app/home/reserva/viajes/${products[0].id}/buslayout/pagos/checkout`,
        failure: `https://urban-movi.vercel.app/home/reserva/viajes/${products[0].id}/buslayout/pagos/checkout/failed`,
        pending: ``,
      },
      auto_return: "approved",
      binary_mode: true,
    };
    mercadopago.preferences
      .create(preference)
      .then((response) => {
        res.status(200).json({
          response,
        });
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  });
exports.postPayment = postPayment;
const getMerchantOrderData = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { merchantOrder } = req.query;
    try {
      const { data } = yield axios_1.default.get(
        `https://api.mercadopago.com/merchant_orders/${merchantOrder}`,
        {
          headers: {
            Authorization: `Bearer ${MP_TOKEN}`,
          },
        }
      );
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
exports.getMerchantOrderData = getMerchantOrderData;
