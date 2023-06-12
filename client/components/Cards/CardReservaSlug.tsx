"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store/store";

import { FaBus } from "react-icons/fa";

export default function CardReservaSlug() {
  const passages = useSelector((state: RootState) => state.passage.allPassagesByQuery);

  const groupContainerStyles =
    "group flex items-center flex-col  sm:flex-row justify-between gap-4 rounded-md border bg-white px-2 py-2 transition-all duration-200 hover:border-blue";
  const companyContainerStyles =
    "flex flex-col sm:flex-row py-4 sm:py-0 items-center justify-between border-2 sm:border-none rounded-xl w-full gap-2 sm:gap-4 align-middle";
  const companyTextStyles =
    "flex items-center justify-between px-1  w-full text-left align-middle font-bold capitalize text-blueGray-700";
  const smallTextStyles = "flex items-center  justify-between px-1 text-left";
  const stockContainerStyles = "flex flex-row items-center justify-around px-1";
  const stockTextStyles = "rounded-md bg-blue px-1.5 text-center text-sm font-bold text-white";
  const serviceContainerStyles = "flex w-24 items-center justify-around px-1 text-center";
  const priceContainerStyles =
    "flex items-center justify-around px-2 text-white sm:text-black sm:px-1 text-right bg-blue sm:bg-white rounded-full ";

  return (
    <>
      {passages.map((passage) => (
        <Link
          href={`/home/reserva/viajes/${passage.id}`}
          key={passage.id}
          className={groupContainerStyles}
        >
          <div className={companyContainerStyles}>
            <div className="flex items-center px-1 align-middle">
              <small className={companyTextStyles}>
                <FaBus size="40" className="w-auto pr-2 text-blue" />
                {passage.companyData?.name}
              </small>
            </div>
            <div className="flex w-auto sm:flex-col">
              <small className={smallTextStyles}>
                {passage.departureDate} {passage.departureTime}
              </small>
            </div>
            <div className="flex w-auto sm:flex-col">
              <small className={smallTextStyles}>
                {passage.arrivalDate} {passage.arrivalTime}
              </small>
            </div>
            <div className={stockContainerStyles}>
              <small>
                Pasajes:
                <small className={stockTextStyles}>{passage.stock}</small>
              </small>
            </div>
            <div className={serviceContainerStyles}>{passage.service}</div>
            <div className={priceContainerStyles}>Precio: {passage.price}</div>
          </div>
        </Link>
      ))}
    </>
  );
}
