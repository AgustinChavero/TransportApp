"use client";
import { savePassengerData } from "@component/Redux/payment/paymentSlice";
import { PassengerFormData, PassengerFormModalProps } from "@component/app/types/Passenger";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { countryOptions } from "@component/assets/data";
import { toast } from "react-toastify";

const ModalPasajeros: React.FC<PassengerFormModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  seat,
  enabledSeats,
  notifySeatSelected,
  setSelectedSeats,
  selectedSeats,
}) => {
  const [formData, setFormData] = useState<PassengerFormData>({
    nombre: "",
    apellido: "",
    nacionalidad: "",
    tipoDocumento: "",
    fechaNacimiento: "",
    genero: "",
    codigoArea: "",
    telefono: "",
    email: "",
    cc: "",
    quantity: "",
  });

  const [nombreError, setNombreError] = useState("");
  const [nacionalidadError, setNacionalidadError] = useState("");
  const [apellidoError, setApellidoError] = useState("");
  const [codigoAreaError, setCodigoAreaError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [age, setAge] = useState(0);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "isMinor") {
      const isChecked = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        isMinor: isChecked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    // Rest of the code...

    switch (name) {
      case "nombre":
        if (value.length > 20) {
          setNombreError("El nombre no puede superar los 20 caracteres");
        } else {
          setNombreError("");
        }
        break;
      case "apellido":
        if (value.length > 20) {
          setApellidoError("El apellido no puede superar los 20 caracteres");
        } else {
          setApellidoError("");
        }
        break;
      case "nacionalidad":
        // Perform validation to check if the value is a valid country
        // You can use an external library or API to validate the country name
        // For simplicity, let's assume it's valid for now
        setNacionalidadError("");
        break;

      case "codigoArea":
        if (value.length > 5) {
          setCodigoAreaError("El código de área no puede tener más de 5 caracteres");
        } else {
          setCodigoAreaError("");
        }
        break;
      case "fechaNacimiento":
        const birthDate = new Date(value);
        const today = new Date();
        const calculatedAge = today.getFullYear() - birthDate.getFullYear();
        setIsDateSelected(true); // Set the date selection flag

        setAge(calculatedAge);
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));

        break;
      case "telefono":
        if (value.length < 6 || value.length > 10) {
          setTelefonoError("El teléfono debe tener entre 6 y 10 caracteres");
        } else {
          setTelefonoError("");
        }
        break;
      case "email":
        // Perform validation to check if the value is a valid email
        // You can use a regular expression or an external library for email validation
        // For simplicity, let's assume it's valid for now
        setEmailError("");
        break;
      default:
        break;
    }
  };

  const dispatch = useDispatch();
  const existingData = useSelector((state: any) => state.payment?.passengerData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the checkbox for minors is checked
    if (age > 1 && age < 18 && isDateSelected && !formData.isMinor) {
      toast.error("Debe confirmar que el pasajero es menor de edad");
      return;
    }

    // Rest of the code...

    setIsModalOpen(false);

    // Only dispatch the form data if the checkbox is checked or if the passenger is not a minor
    if (formData.isMinor || age >= 18 || !isDateSelected) {
      const updatedPassengerData = [...existingData, { ...formData, seat, quantity: "1" }];
      dispatch(savePassengerData(updatedPassengerData));
      setFormData({
        nombre: "",
        apellido: "",
        nacionalidad: "",
        tipoDocumento: "",
        fechaNacimiento: "",
        genero: "",
        codigoArea: "",
        telefono: "",
        email: "",
        cc: "",
        quantity: "",
      });
      setIsDateSelected(false);
      notifySeatSelected();
    } else {
      toast.error("Debe confirmar que el pasajero es menor de edad");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSeats(selectedSeats?.filter((prevSeat) => prevSeat !== seat));
  };

  return (
    <>
      {isModalOpen && (
        <>
          <div
            onClick={handleCloseModal}
            className="fixed left-0 top-0 z-40 h-screen w-screen bg-black/30"
          ></div>
          <div className="fixed left-1/2 top-1/2 z-50 h-[660px] w-11/12 -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl shadow-black/40 sm:w-96 ">
            <h2 className=" text-2xl font-bold">Información del pasajero</h2>
            <form onSubmit={handleSubmit}>
              <div className="">
                <label className=" block" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-1"
                  maxLength={20}
                  required
                />
                {nombreError && <span className="error">{nombreError}</span>}
              </div>
              <div className="">
                <label className="mb-2 block" htmlFor="apellido">
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-1"
                  maxLength={20}
                  required
                />
                {apellidoError && <span className="error">{apellidoError}</span>}
              </div>
              <div className="">
                <label className="mb-2 block" htmlFor="nacionalidad">
                  Nacionalidad
                </label>
                <select
                  id="nacionalidad"
                  name="nacionalidad"
                  value={formData.nacionalidad}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-1"
                  required
                >
                  <option value="">Seleccione una opción</option>
                  {countryOptions.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {nacionalidadError && <span className="error">{nacionalidadError}</span>}
              </div>
              <div className="">
                <label className="mb-2 block" htmlFor="tipoDocumento">
                  Tipo de Documento
                </label>
                <div className="flex">
                  {" "}
                  <select
                    id="tipoDocumento"
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleChange}
                    className="w-1/4 rounded border border-gray-300 px-3 py-1"
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="CC">C.C</option>
                    <option value="CE">C.E</option>
                  </select>
                  <input
                    type="text"
                    id="cc"
                    name="cc"
                    value={formData.cc}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-3 py-1"
                    maxLength={8}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                  className="w-full rounded border border-gray-300 px-3 py-1"
                />
              </div>
              {age > 1 && age < 18 && isDateSelected && (
                <div className="flex items-center justify-between">
                  <label htmlFor="isMinor" className="text-xs font-light italic tracking-tighter">
                    Entiendo que es un pasajero menor de edad y viajará con un adulto responsable
                  </label>
                  <input
                    type="checkbox"
                    id="isMinor"
                    name="isMinor"
                    checked={formData.isMinor}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div>
                <label htmlFor="genero">Género:</label>
                <select
                  id="genero"
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="w-full rounded border border-gray-300 px-3 py-1"
                  required
                >
                  <option value="">Seleccione un género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="prefiero declarar">No Declara</option>
                </select>
              </div>
              <div>
                <div className="flex gap-4">
                  <div className="flex w-1/3 flex-col">
                    <label htmlFor="telefono">Area:</label>
                    <input
                      type="text"
                      id="codigoArea"
                      name="codigoArea"
                      value={formData.codigoArea}
                      onChange={handleChange}
                      maxLength={5}
                      className="w-full rounded border border-gray-300 px-3 py-1"
                      required
                    />
                    {codigoAreaError && <span className="error">{codigoAreaError}</span>}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                      type="text"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      minLength={6}
                      maxLength={10}
                      className="w-full rounded border border-gray-300 px-3 py-1"
                      required
                    />
                    {telefonoError && <span className="error">{telefonoError}</span>}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                  className="w-full rounded border border-gray-300 px-3 py-1"
                  required
                />
                {emailError && <span className="error">{emailError}</span>}
              </div>

              <div className="flex justify-center gap-4 pt-8">
                <button
                  type="button"
                  className="bg-blue px-4 py-2 text-white"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue px-4 py-2 text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ModalPasajeros;
