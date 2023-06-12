"use client";
import { useState, useEffect } from "react";

import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const isRegisterFromSessionStorage = sessionStorage.getItem("isRegister");
    setIsRegister(Boolean(isRegisterFromSessionStorage) || false);
  }, []);

  const handleSetIsRegister = (value: boolean | ((prevState: boolean) => boolean)) => {
    setIsRegister(value);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("isRegister", value.toString());
    }
  };

  return (
    <div className="relative mt-0 flex items-center  justify-center sm:w-full lg:h-screen ">
      <div
        className={` transition_all absolute bottom-0 left-0 right-0 top-56 m-auto grid place-content-center  opacity-0 sm:w-auto lg:-left-96 lg:top-0   ${
          isRegister && "z-10 opacity-100"
        }`}
      >
        <RegisterForm isRegister={isRegister} setIsRegister={handleSetIsRegister} />
      </div>
      <div
        className={`transition_all absolute bottom-0 left-0 right-0 top-56 m-auto grid place-content-center opacity-0 lg:-left-96  lg:top-0  ${
          !isRegister && "z-10 opacity-100"
        }`}
      >
        <LoginForm isRegister={isRegister} setIsRegister={handleSetIsRegister} />
      </div>
    </div>
  );
};

export default Login;
