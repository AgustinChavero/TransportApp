import axios from "axios";
import { db } from "../../connection/connection";
import createHttpError from "http-errors";

const { MP_TOKEN } = process.env;
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: MP_TOKEN,
});
const { FRONT_URL } = process.env;

export const postPayment = async (req, res, next) => {
  const products = req.body;
  console.log(products[0]);
  const passageDoc = await db.collection("passages").doc(products[0].id).get();

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

  const areSeatsValid = numberSeat.every((seat: string) => passageData.numberSeat.includes(seat));

  if (!areSeatsValid) {
    throw new Error("Algunos asientos seleccionados no son válidos");
  }

  let preference = {
    items: products,
    back_urls: {
      // corregir redireccionamiento
      success: `http://localhost:3001/home/reserva/viajes/${products[0].id}/buslayout/pagos/checkout`,
      failure: `http://localhost:3001/home/reserva/viajes/${products[0].id}/buslayout/pagos/checkout/failed`,
      // success: `https://urban-movi.vercel.app/home/reserva/viajes/${products[0].id}/buslayout/pagos/checkout`,
      // failure: `https://urban-movi.vercel.app/home/reserva/viajes/${products[0].id}/buslayout/pagos/checkout/failed`,
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
};

export const getMerchantOrderData = async (req, res): Promise<void> => {
  const { merchantOrder } = req.query;
  try {
    const { data } = await axios.get(
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
};
