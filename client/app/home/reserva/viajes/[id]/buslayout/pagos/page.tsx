"use client";
import BtnMp from "./components/btnMp.pasajes";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import icon from "../../../../../../../assets/icons/user-01.png";

export default function Pagos() {
  const passagerData = useSelector((state: any) => state.payment?.passengerData);

  const cardsPerPage = 1; // Number of cards to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes of the cards to display on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = passagerData.slice(indexOfFirstCard, indexOfLastCard);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const showButtons = passagerData.length > 1;

  return (
    <div className="mb-10 mt-20 flex h-full max-h-[530px] w-11/12 flex-col items-center justify-center gap-2 border-2  sm:mb-0 sm:mt-0 sm:w-full">
      {currentCards.map((passager: any, index: any) => (
        <div
          key={index}
          className="flex h-full w-full flex-col items-center justify-center rounded-3xl border bg-white shadow-xl shadow-black/40"
        >
          <div className="shadow-3xl shadow-shadow-500 dark:!bg-navy-800 relative mx-auto flex w-10/12 flex-col items-center rounded-[20px] bg-white bg-clip-border p-4 dark:text-white dark:!shadow-none sm:w-[400px]">
            <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
              <Image
                src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
                className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                alt=""
                width={50}
                height={50}
              />
              <div className="dark:!border-navy-700 absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                <Image
                  className="h-full w-full rounded-full"
                  src={icon}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="mt-8 flex flex-col items-center">
              <span className="text-navy-700 mt-4 flex text-2xl font-bold text-gray-600">
                {passager?.nombre + " " + passager?.apellido}
              </span>
              <p className="text-base font-normal text-gray-600">{passager?.nacionalidad}</p>
            </div>
            <div className="mb-3 mt-6 flex flex-col sm:flex-row sm:gap-14 md:!gap-14">
              <div className="flex flex-col items-center justify-center">
                <p className="text-navy-700 text-xl font-bold text-gray-600">Nacimiento</p>
                <p className="text-sm font-normal text-gray-600">{passager?.fechaNacimiento}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-navy-700 text-xl font-bold text-gray-600">CC</p>
                <p className="text-sm font-normal text-gray-600">{passager?.cc}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-navy-700 text-xl font-bold text-gray-600">Asiento</p>
                <p className="text-sm font-normal text-gray-600">{passager?.seat}</p>
              </div>
            </div>
          </div>
          <p className="text-navy-700 mx-auto w-max font-normal sm:mt-10">
            Información de pasajero
          </p>
          {showButtons && (
            <div className="mt-4 flex justify-center gap-4 pb-2">
              <button onClick={handlePreviousPage} disabled={currentPage === 1} className="">
                Anterior
              </button>
              <button
                onClick={handleNextPage}
                disabled={indexOfLastCard >= passagerData.length}
                className=""
              >
                Siguiente
              </button>
            </div>
          )}
          <BtnMp />
        </div>
      ))}
    </div>
  );
}
