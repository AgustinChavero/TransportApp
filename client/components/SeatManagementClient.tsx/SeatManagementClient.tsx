"use client";
import React, { useEffect } from "react";
import { CardProfilePropsEnabledSeats } from "@component/app/types/Passages";
import PlantaAlta from "@component/components/PlantaAlta/PlantaAlta";
import PlantaBaja from "@component/components/PlantaBaja/PlantaBaja";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@component/Redux/store/store";
const SeatManagement: React.FC<CardProfilePropsEnabledSeats> = ({ enabledSeats }) => {
  const router = useRouter();
  const passage = useSelector((state: RootState) => state.passage.passageById);
  const count = useSelector((state: any) => state.payment.passageById[0]);
  const passagerData = useSelector((state: any) => state.payment?.passengerData);
  const lengthData = passagerData.length;

  const containerStyles =
    "flex w-11/12 sm:w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-gray-300 bg-white py-4 shadow-xl shadow-black/40 xl:h-[650px] xl:justify-between";
  const relativeContainerStyles =
    "relative flex min-w-0 px-4 sm:px-0 flex-col break-words rounded-lg bg-transparent";
  const titleStyles = "py-4 text-center";
  const italicStyles = "italic text-gray-400";
  const passengersRemainingStyles = "";
  const ulStyles = "flex items-center justify-center gap-4 bg-transparent";
  const liStyles = "flex w-1/2 items-center justify-center rounded-xl border-2 border-blue p-4";

  const passangers = count?.quantity;

  if (count?.quantity - lengthData === 0) {
    router.push(`/home/reserva/viajes/${passage?.id}/buslayout/pagos`);
  }

  return (
    <div className={containerStyles}>
      <div className={relativeContainerStyles}>
        <h2 className={titleStyles}>Elige tus asientos </h2>
        <p className={italicStyles}>
          Al hacer click se te solicitará la información de los pasajeros
        </p>
        <p className={passengersRemainingStyles}>
          Pasajeros restantes: {count?.quantity - lengthData}
        </p>
        <ul className={ulStyles}>
          <li className={liStyles}>
            <PlantaAlta enabledSeats={enabledSeats} passangers={passangers} />
          </li>
          <li className={liStyles}>
            <PlantaBaja enabledSeats={enabledSeats} passangers={passangers} />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SeatManagement;
