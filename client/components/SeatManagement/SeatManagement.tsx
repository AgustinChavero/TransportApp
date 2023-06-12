"use client";
import React, { useState } from "react";
import axios from "axios";
import PlantaAltaAdmin from "../PlantaAltaAdmin/PlantaAltaAdmin";
import PlantaBajaAdmin from "../PlantaBajaAdmin/PlantaBajaAdmin";
import { CardProfilePropsPassage } from "@component/app/types/Passages";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@component/services/axiosInstance";

const SeatManagement: React.FC<CardProfilePropsPassage> = ({ selectedPassage, newSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>(newSeats || []);
  const [disabledSeats, setDisabledSeats] = useState<string[]>([]);

  const handleSeatToggle = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats((prevSeats) => prevSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      setSelectedSeats((prevSeats) => [...prevSeats, seat]);
    }
  };

  const handleDisableSeatToggle = (seat: string) => {
    if (disabledSeats.includes(seat)) {
      setDisabledSeats((prevSeats) => prevSeats.filter((disabledSeat) => disabledSeat !== seat));
    } else {
      setDisabledSeats((prevSeats) => [...prevSeats, seat]);
    }
  };

  const enableSeats = async () => {
    try {
      await axiosInstance.put(`/admin/enableSeats/${selectedPassage?.id}`, {
        numberSeat: selectedSeats,
      });
      toastSuccess();
      setSelectedSeats([]);
      console.log("Todo Ok");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const disabledSeat = async () => {
    try {
      await axiosInstance.put(`/admin/disableSeats/${selectedPassage?.id}`, {
        numberSeat: disabledSeats,
      });
      toastSuccess();
      setDisabledSeats([]);
      console.log("Todo Ok");
    } catch (error) {
      console.error("Error", error);
    }
  };
  const toastSuccess = () => {
    toast.success("Asientos habilitados exitosamente", {
      position: "top-center",
      autoClose: 5000, //Con autoClose={false} no se cierra automaticamente
      hideProgressBar: false, //Para que se vea o no el progreso
      closeOnClick: true,
      pauseOnHover: false, //Se pondra en pausa, o no, si el mouse esta encima
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  if (!selectedPassage) {
    return <div>Aún no has seleccionado ningún pasaje</div>;
  }

  return (
    <div className='relative mb-6 mt-16 flex min-w-0 flex-col break-words rounded-lg bg-white shadow-xl'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false} //Con esto quitamos o habilitamos la X para cerrar
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        //Light, dark o colored... elijan el mas conveniente, recuerden cambiar esto tambien en el toast
        theme='light'
        closeButton={false}
      />
      <h2 className='py-4 text-center'>Seat Management</h2>

      {selectedSeats.length === 0 ? (
        <div>No se han seleccionado asientos</div>
      ) : (
        <div className='flex w-full flex-wrap '>
          <h3 className='mx-auto py-2 text-center italic'>Asientos seleccionados:</h3>
          <ul className='flex w-full flex-wrap '>
            {selectedSeats.map((seat, index) => (
              <li
                className='mx-1 mt-2 w-10 rounded-xl border-b-2 border-r-2 border-blue px-2 text-center text-blue'
                key={index}
              >
                {seat}
              </li>
            ))}
          </ul>
          <button onClick={enableSeats}>Habilitar asientos</button>
        </div>
      )}

      {disabledSeats.length === 0 ? (
        <div>No se han deshabilitado asientos</div>
      ) : (
        <div className='flex w-full flex-wrap '>
          <h3 className='mx-auto py-2 text-center italic'>Asientos deshabilitados:</h3>
          <ul className='flex w-full flex-wrap '>
            {disabledSeats.map((seat, index) => (
              <li
                className='mx-1 mt-2 w-10 rounded-xl border-b-2 border-r-2 border-blue px-2 text-center text-blue'
                key={index}
              >
                {seat}
              </li>
            ))}
          </ul>
          <button onClick={disabledSeat}>Deshabilitar Asientos</button>
        </div>
      )}

      <ul className='flex items-center justify-center gap-4'>
        <li className='flex w-1/2 items-center justify-center rounded-xl border-2 border-blue p-4'>
          <PlantaAltaAdmin
            selectedPassage={selectedPassage}
            newSeats={selectedSeats}
            disabledSeats={disabledSeats}
            onSeatToggle={handleSeatToggle}
            onDisableSeatToggle={handleDisableSeatToggle}
          />
        </li>
        <li className='flex w-1/2 items-center justify-center rounded-xl border-2 border-blue p-4'>
          <PlantaBajaAdmin
            selectedPassage={selectedPassage}
            newSeats={selectedSeats}
            disabledSeats={disabledSeats}
            onSeatToggle={handleSeatToggle}
            onDisableSeatToggle={handleDisableSeatToggle}
          />
        </li>
      </ul>
    </div>
  );
};

export default SeatManagement;
