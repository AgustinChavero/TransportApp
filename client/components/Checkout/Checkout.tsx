"use client";
import { Ticket } from "@component/app/types/Ticket";
import { User } from "@component/app/types/User";
import axiosInstance from "@component/services/axiosInstance";
import axios from "axios";

import Link from "next/link";
import { useEffect, useState } from "react";
//import CardCheckout from "@component/components/Cards/CardCheckout";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  //datos mercadopago
  const [dataState, setDataState] = useState({});
  const [paymentId, setPaymentId] = useState<string | null>("");
  const [merchantOrder, setMerchantOrder] = useState<string | null>("");
  const [status, setStatus] = useState<string | null>("");
  const [user, setUser] = useState<User | null>(null);

  const userId = "";

  useEffect(() => {
    if (window) {
      const queryParams = new URLSearchParams(window.location.search);
      const paymentIdData = queryParams.get("payment_id");
      const merchantOrderData = queryParams.get("merchant_order_id");
      const statusData = queryParams.get("status");
      const userData: any | null = JSON.parse(localStorage.getItem("user") || "");
      setPaymentId(paymentIdData);
      setMerchantOrder(merchantOrderData);
      setStatus(statusData);
      setUser(userData);

      const getToken = async () => {
        const { data } = await axiosInstance.get(`/token?merchantOrder=${merchantOrder}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  //id del usuario de la app;

  const [ticket, setTicket] = useState<Ticket | null>(null);

  const notifySuccess = () => {
    if (!toast.isActive("success")) {
      toast.success(`Su pago ha sido realizado con éxito!`, {
        toastId: "success",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const notifyError = () => {
    if (!toast.isActive("error")) {
      toast.error(`Su pago no ha podido realizarse!`, {
        toastId: "error",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/payment/merchantOrder?merchantOrder=${merchantOrder}`
        );
        //este axiosInstance pueeeede llegar a ser a mercadopago
        //aca se guarda la info y con esto generamos la factura
        const requestData = {
          userId: user?.id,
          passageId: data?.items[0].id,
          price: data?.items[0].unit_price,
          quantity: data?.items[0].quantity,
          paymentId: paymentId,
          merchantOrder: merchantOrder,
          statusMp: status,
          passengersData: {
            description: data?.items[0].description,
          },
        };
        return requestData;
      } catch (error) {
        return error;
      }
    };

    (async () => {
      try {
        const ticketData = await getToken();
        axiosInstance.post("/ticket", ticketData);
        setTicket(ticketData as Ticket | null);
        notifySuccess();
      } catch (error) {
        notifyError();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative mt-10 flex h-full w-full flex-col items-center gap-2 rounded-3xl border-2 bg-white p-6 shadow-2xl shadow-black/40 lg:h-[530px]">
      {/* <p className="text-center text-2xl font-bold">Su pago ha sido realizado con éxito !</p> */}
      {/* <Image src={success} alt="pago exitoso" className="h-80 w-80 self-center"></Image> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        closeButton={false}
      />
      <h1 className="abolsute top-4 border-2 text-center text-lg font-bold">
        Su pago ha sido realizado con éxito
      </h1>
      <div className="mt-10 flex h-full flex-col">
        <div className="flex h-full flex-col gap-4 overflow-y-auto">
          <h2 className="text-center text-sm font-light italic">resumen informativo</h2>
          {ticket &&
            Object.entries(ticket.passengersData || {}).map(([key, value]) => (
              <div key={key} className="py-4">
                <h3 className="text-gray-700">Descripcion:</h3>
                <h4 className="text-gray-400">{JSON.stringify(value)}</h4>
              </div>
            ))}
        </div>
        <div className="absolute bottom-10 left-0 flex w-full justify-center">
          <Link
            href="/home"
            className="mx-auto rounded-md bg-blue px-2 py-1 text-center text-white hover:bg-indigo-700"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
