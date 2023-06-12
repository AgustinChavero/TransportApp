"use client";

import { RootState } from "@component/Redux/store/store";
import { getTicketsByUserId } from "@component/Redux/ticket/ticketActions";
import { AnyAction } from "@reduxjs/toolkit";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import logo from "../../assets/imagenes/UrbanIsoLogo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Ticket } from "@component/app/types/Ticket";
import { FaBus, FaCar, FaTaxi } from "react-icons/fa";

export default function CardHistorialTickets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const allTickets = useSelector((state: RootState) => state.ticket.allTickets) as Ticket[];

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Retrieve "user" from local storage
    if (window) {
      const userString = localStorage.getItem("user") || "";
      if (userString) {
        const user = JSON.parse(userString);
        dispatch(getTicketsByUserId(user.id));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (ticket: any) => {
    setSelectedTicket(ticket); // Set the selected ticket
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  const handleModalClick = (event: any) => {
    if (event.target === modalRef.current) {
      closeModal();
    }
  };

  const saveAsPDF = () => {
    if (modalRef.current) {
      html2canvas(modalRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        pdf.save(`ticket-Urban-id-${allTickets[0].id}.pdf`);
      });
    }
  };

  return (
    <section
      className={`  flex h-full w-full flex-col  gap-2 p-2  ${
        allTickets.length > 4 ? "scrollbar overflow-y-scroll" : ""
      } overflow-y-scroll rounded-3xl  bg-transparent lg:container  lg:mx-auto lg:h-[500px] lg:p-10`}
    >
      {allTickets.map((ticket) => (
        <>
          <div
            key={ticket.id}
            className="flex h-full flex-col items-center justify-around gap-2  py-4 align-middle lg:h-24 lg:flex-row"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <FaBus size="40" className=" w-auto  text-blue" />
              <small className="w-full text-right md:w-auto ">
                {ticket.passageInfo?.departureDate}
              </small>
            </div>
            <div className="flex items-center gap-2 ">
              <span className="text-xl font-semibold text-gray-600">Bus</span>
            </div>
            <div className="flex flex-col">
              {" "}
              <span className="flex flex-col items-center justify-between  text-gray-600 md:flex-row">
                <div className="flex flex-col items-center justify-center">
                  <strong className="px-2"> Origen:</strong>
                  <p>
                    {ticket.passageInfo?.origin} - {ticket.passageInfo?.departureTime} - Estrella St{" "}
                    <br />
                  </p>{" "}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <strong className="px-2">Tiempo estimado: </strong>
                  <p>{ticket.passageInfo?.duration}</p>
                </div>
              </span>
            </div>
            <button onClick={() => handleOpenModal(ticket)}>Ticket</button>
          </div>
          <hr className="py-4" />
        </>
      ))}
      {isModalOpen && (
        <>
          <div
            onClick={closeModal}
            className=" fixed left-0 top-0 z-10 h-screen w-screen bg-black/30"
          ></div>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={handleModalClick}
            ref={modalRef}
          >
            <div
              className="mx-auto h-96 w-96 rounded-2xl bg-white shadow-2xl shadow-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedTicket && (
                <article
                  key={selectedTicket.id}
                  className="flex h-full w-full flex-col items-center justify-center p-6 "
                >
                  <Image src={logo} alt="logo" className="mx-auto  w-16  py-4" />
                  <h2 className="mb-4 text-center text-2xl font-bold">
                    <>
                      {selectedTicket.passageInfo.origin} to{" "}
                      {selectedTicket.passageInfo.destination}
                    </>
                  </h2>

                  <div className="grid w-full grid-cols-2 gap-4 text-center">
                    <div className="w-full">
                      <p className="mb-2 flex flex-col">
                        <strong>Fecha de salida:</strong>
                        <small> {selectedTicket.passageInfo.departureDate}</small>
                      </p>
                      <p className="mb-2 flex flex-col">
                        <strong>Horario de salida:</strong>{" "}
                        <small>{selectedTicket.passageInfo.departureTime}</small>
                      </p>
                      <p className="mb-2 flex flex-col">
                        <strong>Duracion del viaje:</strong>{" "}
                        <small> {selectedTicket.passageInfo.duration}</small>
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 flex flex-col">
                        <strong>Ticket ID:</strong> <small>{selectedTicket.id}</small>
                      </p>
                      <p className="mb-2 flex flex-col">
                        <strong>Precio:</strong> <small>${selectedTicket.price}</small>
                      </p>
                      <p className="mb-2 flex flex-col">
                        <strong>Número de asiento:</strong>{" "}
                        <small>{selectedTicket.passageInfo.numberSeat}</small>
                      </p>
                    </div>
                  </div>
                  <div className="mx-auto flex w-full justify-center ">
                    <button onClick={saveAsPDF}>Guardar Ticket</button>
                  </div>
                </article>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
