import Seat from "@component/assets/icons/svg/Seat";
import React from "react";
import { plantaAlta } from "../../assets/data";
import { CardProfilePropsPassage } from "@component/app/types/Passages";

const PlantaAltaAdmin: React.FC<CardProfilePropsPassage> = ({
  selectedPassage,
  newSeats,
  disabledSeats,
  onSeatToggle,
  onDisableSeatToggle,
}) => {
  const handleClick = (index: number) => {
    const seatNumber = (index + 41).toString();

    if (selectedPassage?.numberSeat.includes(seatNumber)) {
      if (disabledSeats?.includes(seatNumber)) {
        // Habilitar asiento
        onDisableSeatToggle && onDisableSeatToggle(seatNumber);
      } else {
        // Deshabilitar asiento
        onDisableSeatToggle && onDisableSeatToggle(seatNumber);
      }
      return; // No agregar asientos seleccionados por props a newSeats
    }

    onSeatToggle && onSeatToggle(seatNumber);
  };

  return (
    <div className='flex w-4/5 flex-col gap-4'>
      <p className='text-center'>Planta alta</p>
      <ul className='grid grid-cols-5 gap-2'>
        {plantaAlta.map((seat, index) => {
          const seatNumber = (index + 41).toString();
          const isSelected = selectedPassage?.numberSeat.includes(seatNumber);
          const isNewSeat = newSeats?.includes(seatNumber);
          const isDisabledSeat = disabledSeats?.includes(seatNumber);
          let seatColor = isSelected ? "#000000" : isNewSeat ? "#0000FF" : "#888888";
          const seatStyle = isSelected ? {} : { cursor: "pointer" };

          if (isDisabledSeat) {
            seatColor = "#FF0000";
          }

          return (
            <React.Fragment key={index}>
              {(index === 2 || (index - 2) % 4 === 0) && <li className='' />}
              <li className='relative' style={seatStyle}>
                <input
                  type='checkbox'
                  name={`checkbox-${seat}`}
                  id={`checkbox-${seat}`}
                  className='absolute bottom-0 left-0 right-0 top-0 -z-10 opacity-0'
                  onClick={() => handleClick(index)}
                />
                <label htmlFor={`checkbox-${seat}`} style={seatStyle}>
                  <Seat fill={seatColor} width='30px' height='36px' />
                </label>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default PlantaAltaAdmin;
