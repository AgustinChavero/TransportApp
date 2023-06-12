"use client";
import { RootState } from "@component/Redux/store/store";
import { useSelector } from "react-redux";
import { ToPay } from "@component/app/types/MercadoPago";
import axiosInstance from "@component/services/axiosInstance";

export default function Pagos() {
  const userJSON = localStorage.getItem("user");
  const user = userJSON ? JSON.parse(userJSON) : null;
  const passages = useSelector((state: RootState) => state.payment?.passageById);
  const passagerData = useSelector((state: any) => state.payment?.passengerData);

  const token: string = `${user?.id}`;
  let toPay: ToPay[] = [];
  if (passages && passagerData) {
    toPay = passages.map((passage, index) => {
      const passenger = passagerData[index];
      let description = `Pasaje de viaje cantidad ${passage.quantity},`;

      passagerData.forEach((passenger: any) => {
        const passengerInfo = `${passenger.nombre} ${passenger.apellido}`;
        description += ` asiento ${passenger.seat}, a nombre de ${passengerInfo}`;
        console.log(passagerData.seat);
      });

      return {
        passageId: passage.id,
        id: passage.id,
        name: `De ${passage.origin} a ${passage.destination}`,
        img: passage.img,
        unit_price: passage.price,
        quantity: passage.quantity,
        description: description,
      };
    });
  }

  const totalPrice = toPay.reduce((total, item) => {
    const unitPrice = typeof item.unit_price === "number" ? item.unit_price : 0;
    const quantity = typeof item.quantity === "number" ? item.quantity : 0;
    return total + unitPrice * quantity;
  }, 0);

  const arrToPay = toPay.map((item) => {
    return {
      id: item.id,
      title: item.name,
      picture_url: item.img,
      unit_price: item.unit_price,
      quantity: item.quantity,
      description: item.description,
    };
  });

  const handleClickMP = async () => {
    try {
      if (token) {
        const { data } = await axiosInstance.post("/payment/new", arrToPay);
        window.location.href = data.response.body.init_point;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 pb-4">
      <span className=" rounded-2xl bg-white px-4 text-2xl">Valor a pagar: ${totalPrice}</span>
      <button onClick={handleClickMP} className="w-48">
        Mercado Pago
      </button>
    </div>
  );
}
