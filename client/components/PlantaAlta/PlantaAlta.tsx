import React, { useEffect, useState } from "react";
import Seat from "@component/assets/icons/svg/Seat";
import { plantaAlta } from "../../assets/data";
import { Passagers } from "@component/app/types/Passages";
import PassengerModal from "../modalPasajeros/ModalPasajeros";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastComponent from "../00-Toastify/ToastComponent";
const PlantaAlta: React.FC<Passagers> = ({ enabledSeats }) => {
  const [seatEnabled, setSeatEnabled] = useState<boolean[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([""]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  const [seatsChosen, setSeatsChosen] = useState<boolean>(false);
  const handleSeatToggle = (seatIndex: number) => {
    setSeatEnabled((prevSeats) => {
      const updatedSeats = [...prevSeats];
      updatedSeats[seatIndex] = !updatedSeats[seatIndex]; // Toggle the seat enabled state
      return updatedSeats;
    });
  };
  const handleSeatSelection = (seat: string) => {
    if (!isSeatEnabled(plantaAlta.indexOf(seat)) || selectedSeats.includes(seat)) {
      return;
    }
    setSelectedSeat(seat);
    setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
    setIsModalOpen(true);
    setSeatsChosen(true);
  };
  useEffect(() => {
    setSeatEnabled(Array(plantaAlta.length).fill(false));
  }, []);
  const numberSeat = enabledSeats?.numberSeat ?? [];
  const isSeatEnabled = (index: number) => {
    const seat = plantaAlta[index];
    return numberSeat.includes(seat) && !occupiedSeats.includes(seat);
  };
  const isSeatSelected = (index: number) => {
    const seat = plantaAlta[index];
    return selectedSeats.includes(seat);
  };
  const notifySeatSelected = () => {
    toast.success("Asiento Seleccionado", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  if (!enabledSeats) {
    return <div>Loading</div>;
  }

  const containerStyles = "flex w-4/5 flex-col gap-4";
  const ulStyles = "grid grid-cols-5 gap-2";
  const listItemStyles = "relative";
  const checkboxStyles = "absolute bottom-0 left-0 right-0 top-0 -z-10 opacity-0";
  const labelStyles = "cursor-pointer";
  const selectedSeatStyles = "bg-blue-500";

  return (
    <div className={containerStyles}>
      Planta baja
      <ToastComponent />
      <ul className={ulStyles}>
        {plantaAlta.map((seat, index) => (
          <React.Fragment key={index}>
            {(index === 2 || (index - 2) % 4 === 0) && <li className="" />}
            <li className={listItemStyles}>
              <input
                type="checkbox"
                name={`checkbox-${seat}`}
                id={`checkbox-${seat}`}
                className={checkboxStyles}
                onClick={() => handleSeatToggle(index)}
                disabled={isSeatEnabled(index)}
              />
              <label
                className={`${labelStyles} ${
                  seatEnabled[index] ? "hover:bg-blue-200" : "cursor-not-allowed"
                } ${selectedSeats.includes(seat) ? selectedSeatStyles : ""}`}
                htmlFor={`checkbox-${seat}`}
                onClick={() => handleSeatSelection(seat)}
              >
                <Seat
                  fill={
                    isSeatEnabled(index) && isSeatSelected(index) && seatsChosen
                      ? "#0000FF"
                      : isSeatEnabled(index)
                      ? "#000000"
                      : "#C0C0C0"
                  }
                  width="30px"
                  height="36px"
                />
              </label>
            </li>
          </React.Fragment>
        ))}
      </ul>
      {isModalOpen && (
        <PassengerModal
          enabledSeats={enabledSeats}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          seat={selectedSeat}
          notifySeatSelected={notifySeatSelected}
          setSelectedSeats={setSelectedSeats}
          selectedSeats={selectedSeats}
        />
      )}
    </div>
  );
};
export default PlantaAlta;
