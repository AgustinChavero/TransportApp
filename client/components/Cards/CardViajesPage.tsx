"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@component/Redux/store/store";

export default function CardViajesPage() {
  const passages = useSelector((state: RootState) => state.passage.allPassagesByQuery);
  const status = useSelector((state: RootState) => state.passage.status);

  if (status === "loading") {
    return <span>loadin</span>;
  }

  return (
    <>
      {passages.map((passage) => (
        <Link
          href={`/home/reserva/viajes/${passage.id}`}
          key={passage.id}
          className="group flex items-center justify-between gap-4 rounded-full border bg-white px-10 py-2 transition-all duration-200 hover:border-blue"
        >
          <small className="font-bold capitalize text-blueGray-700 ">
            {passage.origin} - {passage.destination}
          </small>
          <small>{passage.departureDate}</small>
        </Link>
      ))}
    </>
  );
}
