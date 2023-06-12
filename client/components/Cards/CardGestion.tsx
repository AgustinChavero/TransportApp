"use client";
import { RootState } from "@component/Redux/store/store";
import { getTicketsByUserId } from "@component/Redux/ticket/ticketActions";
import { AnyAction } from "@reduxjs/toolkit";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import logo from "../../assets/imagenes/UrbanIsoLogo.png";
import { Ticket } from "@component/app/types/Ticket";
import { FaBus } from "react-icons/fa";
import RatingStars from "../RatingStars/RatingStars";
import { toast } from "react-toastify";
import ToastComponent from "../00-Toastify/ToastComponent";
import axios, { AxiosError } from "axios";
import { User } from "@component/app/types/User";
import "react-toastify/dist/ReactToastify.css";
import { updateReviewSent } from "@component/Redux/ticket/ticketSlice";
import axiosInstance from "@component/services/axiosInstance";
interface ValuationData {
  rating: number | null;
  comment: string;
}
interface UserAndCompanyIds {
  userId: string;
  companyId: string;
}
export default function CardGestion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>();
  const [valuationData, setValuationData] = useState<ValuationData>({
    rating: null,
    comment: "",
  });
  const [userData, setUserData] = useState<User | null>(null);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const allTickets = useSelector((state: RootState) => state.ticket.allTickets) as Ticket[];
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Retrieve "user" from local storage
    const userString = window && localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      dispatch(getTicketsByUserId(user.id));
      setUserData(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOpenModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
    setValuationData({ rating: 0, comment: "" });
  };
  const handleModalClick = (event: any) => {
    if (event.target === modalRef.current) {
      closeModal();
    }
  };
  const onClickFuntionToRatingStars = (value: number) => {
    setValuationData((prev) => {
      return { ...prev, rating: value };
    });
  };
  const handleChangeValuationComment = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    if (target.value.length <= 200) {
      setValuationData((prev) => {
        return { ...prev, comment: target.value };
      });
    }
  };
  const sendValuation = () => {
    if (selectedTicket) {
      const { id: ticketId, passageInfo } = selectedTicket;
      const { companyId } = passageInfo;
      const currentValuationData = valuationData; // Capture the current value of valuationData
      axiosInstance
        .post(`/user/rating/company/${ticketId}/${companyId}`, currentValuationData)
        .then((response) => {
          console.log("Axios request successful");
          console.log(response.data);
          notifySuccess();
          closeModal();
          dispatch(updateReviewSent(ticketId));
        })
        .catch((error: AxiosError | any) => {
          console.log(error);
        });
    }
  };

  const notifySuccess = () => {
    if (!toast.isActive("sucess")) {
      toast.success(`Gracias por su valoración!`, {
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

  // Styles
  const sectionStyles = `flex h-full w-full flex-col gap-2 ${
    allTickets.length > 4 ? "scrollbar overflow-y-scroll" : ""
  } rounded-3xl bg-transparent lg:container lg:mx-auto lg:h-[500px] lg:p-10`;
  const ticketStyles = "flex items-center justify-around align-middle";
  const busIconStyles = "w-auto pr-2 text-blue";
  const ticketInfoStyles = "flex flex-col";
  const busTypeStyles = "text-xl font-semibold text-gray-600";
  const ticketDetailsStyles = "pt-2 text-gray-600";
  const buttonStyles = "w-auto shadow-transparent";

  return (
    <section className={sectionStyles}>
      {allTickets.map((ticket, index) => (
        <div key={index}>
          <div className={ticketStyles}>
            <FaBus size='40' className={busIconStyles} />
            <div className={ticketInfoStyles}>
              <div className='flex items-center gap-2'>
                <span className={busTypeStyles}>Bus intermunicipal</span>
              </div>
              <span className={ticketDetailsStyles}>
                Origen: {ticket.passageInfo?.origin} - {ticket.passageInfo?.departureTime} -
                Estrella St <br />
                Tiempo estimado: {ticket.passageInfo?.duration}
              </span>
            </div>
            {!ticket.reviewSent && (
              <button className={buttonStyles} onClick={() => handleOpenModal(ticket)}>
                Valorar
              </button>
            )}
          </div>
          <hr className='mb-4' />
        </div>
      ))}
      {isModalOpen && (
        <>
          <div
            onClick={closeModal}
            className='absolute left-0 top-0 h-screen w-screen bg-black/30'
          ></div>
          <div
            className='fixed inset-0 z-50 flex items-center justify-center'
            onClick={handleModalClick}
            ref={modalRef}
          >
            <div
              className='mx-auto h-96 w-96 rounded-2xl bg-white shadow-2xl shadow-black/60'
              onClick={(e) => e.stopPropagation()}
            >
              {selectedTicket && (
                <article className='flex flex-col items-center justify-center gap-4 p-6 '>
                  <Image src={logo} alt='logo' className='mx-auto w-16' />
                  <h2 className='text-center text-2xl font-bold'>Valoración</h2>
                  <div className='flex flex-col items-center justify-center'>
                    <RatingStars
                      onClickFunction={onClickFuntionToRatingStars}
                      stateValue={valuationData?.rating || 0}
                    />
                    <textarea
                      onChange={handleChangeValuationComment}
                      className='border'
                      cols={30}
                      rows={4}
                      value={valuationData.comment}
                      placeholder='tu feedback nos ayuda a mejorar la calidad de nuestro servicio'
                    />
                  </div>
                  <button onClick={sendValuation} className='w-1/2'>
                    Enviar Valoración
                  </button>
                </article>
              )}
            </div>
          </div>
        </>
      )}
      <ToastComponent />
    </section>
  );
}
