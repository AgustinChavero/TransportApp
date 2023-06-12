"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Google } from "@component/assets/icons/svg/Google";
import setValidate from "./Validate";
import { UserToRegister } from "@component/app/types/LoginRegister";
import { RegisterError } from "@component/app/types/LoginRegister";
import axios from "axios";
import axiosInstance from "@component/services/axiosInstance";

function Register({ isRegister, setIsRegister }: { isRegister: boolean; setIsRegister: any }) {
  const [userData, setUserData] = useState<UserToRegister>({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errores, setErrores] = useState<RegisterError>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toString();
    const name = e.target.name.toString();
    const { repeatPassword } = userData;
    let errorRepeatPassword = {};
    if (name === "password") {
      errorRepeatPassword = setValidateRepeatPassword(repeatPassword, value);
    }
    setUserData({ ...userData, [name]: value });
    setErrores({ ...errores, ...setValidate({ [name]: value }), ...errorRepeatPassword });
  };

  function setValidateRepeatPassword(repeatPassword: string, password: string) {
    if (repeatPassword === password || repeatPassword === "") {
      return { messageRepeatPassword: "" };
    } else {
      return { messageRepeatPassword: "La contraseña no coincide" };
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name.toString();
    const value = e.target.value.toString();
    setUserData({ ...userData, [name]: value });
    const { password } = userData;
    setErrores({ ...errores, ...setValidateRepeatPassword(value, password) });
  };

  const router = useRouter();

  const handleLoginClick = () => {
    setIsRegister(!isRegister);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const { name, lastName, email, password } = userData;
    if (userData.password === userData.repeatPassword) {
      const userData = {
        firstName: name,
        lastName,
        email,
        password,
      };
      await createUser(userData);

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("isRegister");
      }
    } else {
      alert("Passwords do not match");
    }
  };

  const createUser = async (userData: any) => {
    try {
      const response = await axiosInstance.post("/user", userData);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      router.push("/home");
    } catch (error: any) {
      console.log(error);
      // Este mismo error pero con la alerta de notificacion
      alert(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const userFromSessionStorage: UserToRegister | {} = JSON.parse(
      sessionStorage.getItem("user") || "{}"
    );
    setUserData(userFromSessionStorage as UserToRegister);
  }, []);
  return (
    <>
      <form
        onSubmit={handleRegister}
        className="relative mx-2 h-[500px] w-80 max-w-md rounded-lg bg-white px-4 py-8 text-sm text-white/90 shadow-lg shadow-black/40 sm:w-96"
      >
        {/* div que contiene todos los labels e inputs */}

        <div className="flex h-[250px] flex-col gap-5 px-5 pb-5 sm:pt-10">
          {/* Name and lastName */}
          <div className="flex gap-1">
            {/* Name */}
            <div className="relative w-1/2">
              <label className="px-1 ">Name:</label>
              <input
                className={`w-11/12 px-1 text-black ${
                  errores.messageName ? "border-red-500 focus-visible:outline-red-500" : ""
                }`}
                type="text"
                name="name"
                placeholder="Nombre"
                value={userData.name}
                onChange={handleInputChange}
              />
              <small
                className={`transition_all absolute text-right ${
                  errores.messageName ? "opacity-100" : "opacity-0"
                } -bottom-6 left-0 text-left font-medium text-red-500`}
              >
                {errores.messageName}
              </small>
            </div>
            {/* Lastname  */}
            <div className="relative w-1/2">
              <label htmlFor="" className="px-1">
                Lastname:
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                className={`w-11/12 px-1 text-black ${
                  errores.messageLastName ? "border-red-500 focus-visible:outline-red-500" : ""
                }`}
                value={userData.lastName}
                onChange={handleInputChange}
              />
              <small
                className={`transition_all absolute text-right ${
                  errores.messageLastName ? "opacity-100" : "opacity-0"
                } -bottom-6 left-0 text-left font-medium text-red-500`}
              >
                {errores.messageLastName}
              </small>
            </div>
          </div>
          {/* Email */}
          <div className="relative">
            <label className="px-1 pr-[42px]">Email:</label>
            <input
              className={`px-1 text-black ${
                errores.messageEmail ? "border-red-500 focus-visible:outline-red-500" : ""
              }`}
              type="email"
              name="email"
              placeholder="Ingresa tu email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <small
              className={`transition_all absolute text-right ${
                errores.messageEmail ? "opacity-100" : "opacity-0"
              } -bottom-6 left-0 text-left font-medium text-red-500`}
            >
              {errores.messageEmail}
            </small>
          </div>
          {/* Password  */}
          <div className="relative">
            <label className="px-1 pr-3">Password:</label>
            <input
              className={`px-1 text-black ${
                errores.messagePassword ? "border-red-500 focus-visible:outline-red-500" : ""
              }`}
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={userData.password}
              onChange={handleInputChange}
            />
            <small
              className={`transition_all absolute text-right ${
                errores.messagePassword ? "opacity-100" : "opacity-0"
              } -bottom-6 left-0 text-left font-medium text-red-500`}
            >
              {errores.messagePassword}
            </small>
          </div>
          {/* Repeat Password   */}
          <div className="relative">
            <label className="px-1">*Password:</label>
            <input
              className={`px-1 text-black ${
                errores.messageRepeatPassword ? "border-red-500 focus-visible:outline-red-500" : ""
              }`}
              type="password"
              name="repeatPassword"
              placeholder="Repita su contraseña"
              value={userData.repeatPassword}
              onChange={handlePasswordChange}
            />
            <div className="absolute -bottom-6 left-0 text-right">
              <small
                className={`transition_all  text-right ${
                  errores.messageRepeatPassword ? "opacity-100" : "opacity-0"
                }  font-medium text-red-500`}
              >
                {errores.messageRepeatPassword}
              </small>
              <small
                className={`transition_all  text-right ${
                  errores.messageRepeatPassword ? "opacity-0" : "opacity-100"
                }  font-medium text-emerald-500`}
              >
                {errores.messageRepeatPassword == "" &&
                  userData.repeatPassword.length > 0 &&
                  "Las contraseñas coinciden"}
              </small>
            </div>
          </div>
        </div>
        {/*  Boton de registro */}
        <div className="py-4 text-center">
          <button className=" mx-auto px-[67px] py-[10px]" onClick={handleRegister}>
            Register
          </button>
        </div>

        {/*  */}
        <div className="mx-auto flex w-4/5 flex-col gap-2">
          <Link
            className="mx-auto flex w-4/5 items-center justify-center gap-1 rounded-md  border border-[#888] bg-white py-2 font-semibold  text-[#757575] shadow-md shadow-black/30 sm:w-2/3"
            href="https://api-urban.onrender.com/login/auth/google"
            rel="noopener noreferrer"
          >
            <Google width="23" height="23" />
            Login with Google
          </Link>
          <Link
            className="mx-auto flex w-4/5 items-center justify-center gap-1   rounded-md border border-[#888] bg-white py-2 font-semibold  text-blue shadow-md shadow-black/30 sm:w-2/3"
            href="https://api-urban.onrender.com/login/auth/google"
            rel="noopener noreferrer"
          >
            <svg className=" h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M20.02 0H3.98A3.98 3.98 0 0 0 0 3.98v16.04A3.98 3.98 0 0 0 3.98 24h8.22v-9.29H8.65v-3.62h3.55V9.02c0-3.52 2.14-5.44 5.28-5.44 1.54 0 2.87.12 3.26.18v3.66l-2.23.001c-1.75 0-2.09.83-2.09 2.05v2.69h4.19l-.55 3.62h-3.64V24h7.12A3.98 3.98 0 0 0 24 20.02V3.98C24 1.78 22.2 0 20.02 0z" />
            </svg>
            Login with Facebook
          </Link>
        </div>
        <small className="absolute bottom-5 right-5 block pt-2 text-right text-black ">
          Ya tenes cuenta?{" "}
          <span
            onClick={handleLoginClick}
            className="font-semibold text-blue hover:cursor-pointer hover:underline"
          >
            Ingresa aqui
          </span>
        </small>
      </form>
    </>
  );
}

export default Register;
