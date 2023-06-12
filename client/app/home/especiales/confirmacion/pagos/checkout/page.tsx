"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import success from "../../../../../../assets/imagenes/success.png";
import { useEffect, useState } from "react";

export default function Checkout() {
  const [dataState, setDataState] = useState({});
  const userId = "";

  useEffect(() => {
    if (window) {
      const queryParams = new URLSearchParams(window.location.search);
      const paymentId = queryParams.get("payment_id");
      const merchantOrder = queryParams.get("merchant_order_id");
      const status = queryParams.get("status");

      const getToken = async () => {
        const { data } = await axios.get(`/token?merchantOrder=${merchantOrder}`);
        setDataState(data);
        const requestData = {
          userId: userId,
          products: data.items.map((product: any) => ({
            id: product.id,
            unitPrice: product.unit_price,
            quantity: product.quantity,
          })),
          paymentId: paymentId,
          merchantOrder: merchantOrder,
          status: status,
        };
        return requestData;
      };

      getToken();
    }
  }, [userId]);

  return (
    <div className="flex flex-col justify-center gap-8">
      <p className="text-center text-2xl font-bold">Su pago ha sido realizado con éxito!</p>
      <Image src={success} alt="pago exitoso" className="h-80 w-80 self-center" />

      <Link href="/home">
        <button className="mx-auto flex w-1/2 justify-center py-1 text-center">
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}
