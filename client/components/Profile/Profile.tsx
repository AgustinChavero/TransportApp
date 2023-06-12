"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@component/services/axiosInstance";

export default function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (window) {
      const userString = localStorage.getItem("user");
      const userData = userString ? JSON.parse(userString) : null;
      setUserData(userData);
    }
  }, []);

  const onClick = () => {
    setShowInput(!showInput);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Retrieve the user ID from localStorage
    const userString = window && localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    // Make the PUT request to update the user
    axiosInstance
      .put(`/user/${user.id}`, userData)
      .then((response) => {
        window && localStorage.setItem("user", JSON.stringify(userData));
        setShowInput(false);
        console.log("todo bien", userData);

        // Redirect to a new page or perform any other actions
        // window.location.href = "/success"; // Replace "/success" with your desired route
      })
      .catch((error) => {
        // Handle any errors if needed
        console.error("Error updating user:", error);
      });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "areacode") {
      setUserData((prevUserData: any) => ({
        ...prevUserData,
        phone: {
          ...prevUserData.phone,
          areaCode: value,
        },
      }));
    } else if (name === "number") {
      setUserData((prevUserData: any) => ({
        ...prevUserData,
        phone: {
          ...prevUserData.phone,
          number: value,
        },
      }));
    } else {
      setUserData((prevUserData: any) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className=' flex w-full flex-col items-center justify-evenly gap-4 rounded-xl py-8 shadow-xl  shadow-black/40 xl:h-[600px]  xl:flex-col'
    >
      <div className='relative flex flex-col items-center justify-center '>
        {userData && (
          <Image
            alt='...'
            src={userData?.img}
            className='max-w-150-px h-20 w-20 overflow-hidden rounded-full shadow-xl md:-top-20 lg:h-20 lg:w-20 2xl:h-28 2xl:w-28'
            width={200}
            height={200}
          />
        )}
        <h3 className=' w-auto pt-20 text-xl font-semibold leading-normal text-blueGray-700 md:pt-4'>
          {userData?.name}
        </h3>
      </div>

      <div className='lg:w-8/10 flex h-auto w-[350px] flex-wrap justify-center gap-2 rounded-3xl border  text-center lg:mb-0 lg:justify-between xl:flex-col 2xl:text-lg '>
        <div className=' flex w-36 gap-2  p-2 md:w-full'>
          <label htmlFor='' className='flex w-1/2 flex-col'>
            Cod. Area
            {showInput === true ? (
              <input
                name='areacode'
                type='text'
                placeholder='area'
                className='border-b-1 rounded-2xl bg-white py-1 text-center text-base  font-light italic text-gray-800'
                onChange={onChange}
                value={userData?.phone.areaCode}
              />
            ) : (
              <input
                type='text'
                placeholder='Ingrese su numero'
                className=' border-0 bg-white text-center font-semibold text-gray-800'
                disabled
                value={userData?.phone.areaCode}
              />
            )}
          </label>

          <label htmlFor='' className='flex w-1/2 flex-col'>
            Telefono
            {showInput === true ? (
              <input
                name='number'
                type='text'
                placeholder='número'
                className='border-b-1 rounded-2xl bg-white py-1 text-center text-base font-light italic text-gray-800'
                onChange={onChange}
                value={userData?.phone?.number}
              />
            ) : (
              <input
                type='text'
                placeholder='Ingrese su numero'
                className=' border-0 bg-white text-center font-semibold text-gray-800'
                disabled
                value={userData?.phone?.number}
              />
            )}
          </label>
        </div>
        <div className=' flex w-36 justify-center gap-2 p-2 md:w-full'>
          <label htmlFor='' className='flex w-1/2 flex-col'>
            Cc:
            {showInput === true ? (
              <input
                name='cc'
                type='text'
                placeholder='Ingrese su CC'
                className='border-b-1 rounded-2xl py-1 text-center text-base font-light italic text-gray-800'
                onChange={onChange}
                value={userData?.cc}
              />
            ) : (
              <input
                type='text'
                placeholder='Ingrese su CC'
                className='rounded-2xl border-0 bg-white text-center font-semibold text-gray-800'
                disabled
                value={userData?.cc}
              />
            )}
          </label>
        </div>

        <div className=' flex w-36 gap-2  p-2 md:w-full'>
          <label htmlFor='' className='flex w-1/2 flex-col'>
            State
            {showInput === true ? (
              <input
                name='state'
                type='text'
                placeholder='Ingrese su Estado'
                className='border-b-1 rounded-2xl py-1 text-center text-base font-light italic text-gray-800'
                onChange={onChange}
                value={userData?.state}
              />
            ) : (
              <input
                type='text'
                disabled
                placeholder='Ingrese su Estado'
                className='border-0 bg-white text-center font-semibold  text-gray-800'
                value={userData?.state}
              />
            )}
          </label>
          <label htmlFor='' className='flex w-1/2 flex-col'>
            Location
            {showInput === true ? (
              <input
                name='location'
                type='text'
                placeholder='Ingrese su Ciudad'
                className='border-b-1 rounded-2xl py-1 text-center text-base font-light italic text-gray-800'
                onChange={onChange}
                value={userData?.location}
              />
            ) : (
              <input
                type='text'
                disabled
                placeholder='Ingrese su Ciudad'
                className='border-0 bg-white text-center font-semibold text-gray-800'
                value={userData?.location}
              />
            )}
          </label>
        </div>

        <div className=' flex w-36 gap-2  p-2 md:w-full'>
          <label htmlFor='' className='flex w-1/2 flex-col'>
            Calle
            {showInput === true ? (
              <input
                name='street'
                type='text'
                placeholder='Ingrese su Calle'
                className='border-b-1 rounded-2xl py-1 text-center text-base font-light italic text-gray-800'
                onChange={onChange}
                value={userData?.street}
              />
            ) : (
              <input
                type='text'
                disabled
                placeholder='Ingrese su Calle'
                className='border-0 bg-white text-center font-semibold text-gray-800'
                value={userData?.street}
              />
            )}
          </label>
          <label htmlFor='' className='flex w-1/2 flex-col'>
            Numero
            {showInput === true ? (
              <input
                name='number'
                type='text'
                placeholder='Ingrese su Numero'
                className='border-b-1 rounded-2xl py-1 text-center text-base font-light italic text-gray-800'
                onChange={onChange}
                value={userData?.number}
              />
            ) : (
              <input
                type='text'
                disabled
                placeholder='Ingrese su Numero'
                className='border-0 bg-white text-center font-semibold text-gray-800'
                value={userData?.number}
              />
            )}
          </label>
        </div>
      </div>
      <div className='flex items-center justify-center gap-4'>
        <button type='button' onClick={onClick} className='rounded bg-blue px-4 py-1  text-white'>
          Editar
        </button>
        <button className='rounded bg-blue px-2 py-1  text-white'>Guardar</button>
      </div>
    </form>

    // postalCode,
    // location,
    // state,
    // street,
    // number,
  );
}
