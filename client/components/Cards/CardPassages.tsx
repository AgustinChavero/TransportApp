import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RootState } from "@component/Redux/store/store";
import { AnyAction } from "@reduxjs/toolkit";
import UserDropDownSettings from "../Dropdowns/UserDropDownSettings";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllCompanies } from "@component/Redux/company/companyActions";
import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import axiosInstance from "@component/services/axiosInstance";
// components

export default function CadPassages(props: any) {
  const times = [
    "00:00 am",
    "01:00 am",
    "02:00 am",
    "03:00 am",
    "04:00 am",
    "05:00 am",
    "06:00 am",
    "07:00 am",
    "08:00 am",
    "09:00 am",
    "10:00 am",
    "11:00 am",
    "13:00 pm",
    "14:00 pm",
    "15:00 pm",
    "16:00 pm",
    "17:00 pm",
    "18:00 pm",
    "19:00 pm",
    "20:00 pm",
    "21:00 pm",
    "22:00 pm",
    "23:00 pm",
  ];
  const [newPassage, setNewPassage] = useState({
    stock: 0,
    price: 0,
    numberSeat: [],
    service: "",
    companyId: "",
    origin: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    duration: "",
    img: "",
  });
  const { handleClick, handleSearchChange, searchTerm, filteredPassages } = props;
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const companies = useSelector((state: RootState) => state.companies.allCompanies);

  useEffect(() => {
    dispatch(getAllCompanies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleSettingsClick = () => {
    setShowDropDown(!showDropDown); // toggle state variable on click
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === "stock") {
      const stock = parseInt(value, 10);
      const numberSeat = Array.from({ length: stock }, (_, index) => (index + 1).toString());
      setNewPassage(
        (prevPassage) =>
          ({
            ...prevPassage,
            stock,
            numberSeat,
          } as typeof newPassage)
      );
    } else {
      setNewPassage(
        (prevPassage) =>
          ({
            ...prevPassage,
            [name]: value,
          } as typeof newPassage)
      );
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await axiosInstance.post("/passage", newPassage);
    setNewPassage({
      stock: 0,
      price: 0,
      numberSeat: [],
      service: "",
      companyId: "",
      origin: "",
      destination: "",
      departureDate: "",
      departureTime: "",
      arrivalDate: "",
      arrivalTime: "",
      duration: "",
      img: "",
    });
  };

  return (
    <div>
      {/*contendedor de render de todos los usuarios */}
      <div className="relative mb-6 flex min-w-0 flex-col break-words rounded-lg border-0 bg-blueGray-100 shadow-lg">
        <div className="mb-0 rounded-t bg-white px-6 py-6">
          <div className="flex justify-between text-center">
            <h6 className="flex text-lg font-bold text-blueGray-700">Lista de Viajes</h6>
            <div className="flex items-center">
              <label htmlFor="search" className="flex items-center text-gray-500">
                <FaSearch className="w-auto" />
                <input
                  type="text"
                  id="search"
                  className="ml-2 border-b-2 border-gray-500 focus:outline-none"
                  placeholder="Buscar usuarios"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </label>
              {/* <button
                className="mr-1 w-auto rounded bg-blueGray-700 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blueGray-600"
                type="button"
              >
                Settings
              </button> */}
            </div>
          </div>
          {/* este es el render de los passages */}
        </div>
        <div style={{ height: "500px", overflow: "scroll" }}>
          {filteredPassages.map((passage: any) => (
            <div
              onClick={() => handleClick(passage)}
              key={passage.id}
              className="flex w-full cursor-pointer justify-between gap-4 border-2 px-4 py-2"
            >
              <div className="flex items-center gap-4">
                <h3 className="">{passage.origin}</h3>
              </div>
              <div className="flex items-center gap-4">
                <h3 className="">{passage.destination}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* passage details */}
      <div className="relative mb-6 flex min-w-0 flex-col break-words rounded-lg border-0 bg-blueGray-100 shadow-lg">
        <div className="mb-0 rounded-t bg-white px-6 py-6">
          <div className="flex justify-between  text-center">
            <h6 className="flex text-lg font-bold text-blueGray-700">Crear Viaje.</h6>
            <button
              className="relative mr-1 w-auto rounded bg-blueGray-700 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blueGray-600"
              type="button"
              onClick={handleSettingsClick}
            >
              Settings
            </button>
            {showDropDown && <UserDropDownSettings />}
          </div>
        </div>
        <div className="flex flex-wrap px-4 py-10 pt-0 lg:px-10">
          <form>
            <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-blueGray-400">
              Informacion del pasaje
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    PRECIO:
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    name="price"
                    value={newPassage.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    TIPO DE SERVICIO:
                  </label>
                  <select
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    name="service"
                    value={newPassage.service}
                    onChange={handleChange}
                  >
                    <option value="semi-cama">Semi-cama</option>
                    <option value="cama">Cama</option>
                    <option value="cama-ejecutivo">Cama-ejecutivo</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    ORIGEN:
                  </label>
                  <select
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    name="origin"
                    value={newPassage.origin}
                    onChange={handleChange}
                  >
                    <option value="jardin">Jardin</option>
                    <option value="amaga">Amaga</option>
                    <option value="medellin">Medellin</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    DESTINO:
                  </label>
                  <select
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    name="destination"
                    value={newPassage.destination}
                    onChange={handleChange}
                  >
                    <option value="jardin">Jardin</option>
                    <option value="amaga">Amaga</option>
                    <option value="medellin">Medellin</option>
                  </select>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    FECHA DE SALIDA:
                  </label>
                  <input
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    type="date"
                    name="arrivalDate"
                    value={newPassage.arrivalDate}
                    onChange={handleChange}
                    disabled={false}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    FECHA DE LLEGADA:
                  </label>
                  <input
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    type="date"
                    name="departureDate"
                    value={newPassage.departureDate}
                    onChange={handleChange}
                    disabled={false}
                  />
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    HORARIO DE SALIDA:
                  </label>
                  <select
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    name="departureTime"
                    value={newPassage.departureTime}
                    onChange={handleChange}
                  >
                    {times?.map((i) => {
                      return (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <label
                    className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                    htmlFor="grid-password"
                  >
                    HORARIO DE LLEGADA:
                  </label>
                  <select
                    className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                    name="arrivalTime"
                    value={newPassage.arrivalTime}
                    onChange={handleChange}
                  >
                    {times?.map((i) => {
                      return (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  DURACION DEL VIAJE:
                </label>
                <select
                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  name="duration"
                  value={newPassage.duration}
                  onChange={handleChange}
                >
                  <option value="1">1 hora</option>
                  <option value="2">2 horas</option>
                  <option value="3">3 horas</option>
                  <option value="3">4 horas</option>
                  <option value="3">5 horas</option>
                  <option value="3">6 horas</option>
                </select>
              </div>
            </div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative mb-3 w-full">
                <label
                  className="mb-2 block text-xs font-bold uppercase text-blueGray-600"
                  htmlFor="grid-password"
                >
                  EMPRESA:
                </label>
                <select
                  className="w-full rounded border-0 bg-white px-3 py-3 text-sm text-blueGray-600 placeholder-blueGray-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                  name="companyId"
                  value={newPassage.companyId}
                  onChange={handleChange}
                >
                  {companies?.map((company, i) => {
                    return (
                      <option key={i} value={company.id}>
                        {company.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <button onClick={handleSubmit}>Crear Pasaje</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
