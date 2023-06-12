"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineLocationMarker, HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { QueryParams } from "@component/app/types/QueryParams";
import Select, { SingleValue } from "react-select";


import { Location } from "@component/app/types/Select";
import getLocations from "@component/services/api/locations";
import { useDispatch } from "react-redux";
import { getPassagesByQuery } from "../../Redux/passage/passageActions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "@component/Redux/store/store";


export default function Reserva() {
  const router = useRouter();

  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const today = new Date().toISOString().slice(0, 10); // la fecha actual en formato YYYY-MM-DD
  // - - - - - - - - - - - - - -  ESTADOS LOCALES - - - - - - - - - - - - - - -
  const [origin, setOrigin] = useState<string | null>();
  const [destination, setDestination] = useState<string | null>();
  const [departureDate, setDepartureDate] = useState<string>("");
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const isFormValid = origin && destination ? true : false;
  // ------------ Handle Location Origin Selected -------------
  const handleOriginChange = (e: SingleValue<Location> | null) => {
    const value = e?.value ?? null;
    setOrigin(value);
  };
  // ---------- Handle Location Destination Selected ----------
  const handleDestinationChange = (e: SingleValue<Location> | null) => {
    const value = e?.value ?? null;
    setDestination(value);
  };
  // ------------------- Handle Departure ----------------------
  const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartureDate(e.target.value);
  };
  // --------------------- Handle Arrival ----------------------
  const handleArrivalDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrivalDate(e.target.value);
  };
  // - - - - - - - - - - - - -  HANDLE SUBMIT - - - - - - - - - - - - -
  const handleSubmit = (e: any) => {
    e.preventDefault(); // evitar el envio del formulario predeterminado
    const query: QueryParams = {
      origin: origin?.toLowerCase(),
      destination: destination?.toLowerCase(),
      ...(departureDate && { departureDate: departureDate.split("-").reverse().join("-") }),
      ...(arrivalDate && { arrivalDate: arrivalDate.split("-").reverse().join("-") }),
      // armo la query y agrego las propiedades extras si las hay
    };
    dispatch(getPassagesByQuery(query));
    const URL = Object.values(query).join("/");
    router.push("/home/reserva/viajes");
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const adapter: Location[] = [];
      const locations = await getLocations();
      locations.map((location: string) => {
        adapter.push({ label: location, value: location });
      });
      setLocations(adapter);
    };
    fetchLocations();
  }, []);

  const formStyles = "flex flex-col items-center justify-center gap-6 bg-white pb-16 pt-12";
  const inputWrapperStyles = "flex w-full items-center justify-center";
  const inputIconStyles = "w-10 text-blue";
  const inputStyles = "w-2/3 pl-2";
  const buttonStyles = `transition_all mt-4 w-1/2 self-center ${
    !isFormValid ? "!bg-gray-500" : "cursor-pointer"
  }`;

  return (
    <>
      <form className={formStyles}>
        <div className={inputWrapperStyles}>
          <HiOutlineLocationMarker className={inputIconStyles} />
          <Select
            options={locations}
            placeholder="Origen..."
            className="w-2/3 capitalize"
            onChange={handleOriginChange}
            isClearable
            value={origin ? { value: origin, label: origin } : null}
          />
        </div>
        <div className={inputWrapperStyles}>
          <HiOutlineLocationMarker className={inputIconStyles} />
          <Select
            options={locations}
            placeholder="Destino..."
            className="w-2/3 capitalize"
            onChange={handleDestinationChange}
            isClearable
            value={destination ? { value: destination, label: destination } : null}
          />
        </div>

        <div className={inputWrapperStyles}>
          <HiTrendingUp className={inputIconStyles} />
          <input
            className={inputStyles}
            placeholder="Fecha de salida"
            type="date"
            value={departureDate}
            min={today}
            onChange={handleDepartureDateChange}
          />
        </div>
        <div className={inputWrapperStyles}>
          <HiTrendingDown className={inputIconStyles} />
          <input
            className={inputStyles}
            placeholder="Fecha de llegada"
            type="date"
            value={arrivalDate}
            min={departureDate ? departureDate : today}
            onChange={handleArrivalDateChange}
          />
        </div>

        <button onClick={handleSubmit} disabled={!isFormValid} className={buttonStyles}>
          Buscar tu viaje!
        </button>
      </form>
    </>
  );
}
