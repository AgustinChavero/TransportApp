"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { HiEyeOff, HiEye } from "react-icons/hi";
import setValidate from "./Validate";
import Link from "next/link";
import logo from "../../assets/imagenes/UrbanIsoLogo.png";
import Image from "next/image";

interface UserToPassword {
  email: string;
  password: string;
  repeatPassword: string;
}

interface PasswordError {
  messageEmail?: string;
  messagePassword?: string;
  messageRepeatPassword?: string;
}

export default function FormPassword() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [userData, setUserData] = useState<UserToPassword>({} as UserToPassword);
  const [errores, setErrores] = useState<PasswordError>({} as PasswordError);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setUserData({ ...userData, [name]: value });
    setErrores({ ...errores, ...setValidate({ [name]: value }) });
  };

  const setValidateRepeatPassword = (repeatPassword: string, password: string) => {
    if (repeatPassword === password || repeatPassword === "") {
      return { messageRepeatPassword: "" };
    } else {
      return { messageRepeatPassword: "La contraseña no coincide" };
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    const { password } = userData;
    setErrores({ ...errores, ...setValidateRepeatPassword(value, password) });
  };

  const visiblePassword = () => {
    setShowPassword1(!showPassword1);
  };

  const visiblePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-4/5 w-3/4 flex-col items-center justify-center gap-4 rounded-lg border border-gray-300 shadow-xl shadow-black/40 lg:w-1/2 xl:w-1/3 2xl:h-4/5 2xl:w-2/5 2xl:gap-14 2xl:px-20 2xl:text-lg"
    >
      <Image src={logo} alt="logo" className="w-24 lg:w-28 2xl:w-48" />
      <div className="flex flex-col justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="email" className="text-center">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className={`w-3/4 border-gray-400 pl-2 lg:w-2/3 ${
              errores.messageEmail && "focus-visible:outline-red-500"
            }`}
          />
          <small
            className={`pr-8 text-right transition-all lg:pr-20 ${
              errores.messageEmail ? "opacity-100" : "opacity-0"
            } -bottom-6 text-left font-medium text-red-500`}
          >
            {errores.messageEmail}
          </small>
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="text-center">Contraseña:</label>
          <div className="relative flex">
            <input
              type={showPassword1 ? "text" : "password"}
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className={`mx-auto w-3/4 border-gray-400 pl-2 lg:w-2/3 ${
                errores.messagePassword && " focus-visible:outline-red-500"
              }`}
            />
            <button
              onClick={visiblePassword}
              className="absolute right-10 flex w-8 justify-center bg-transparent px-0 text-center text-blue shadow-none lg:right-20 2xl:right-24"
            >
              {!showPassword1 ? <HiEyeOff className="w-full" /> : <HiEye className="w-full" />}
            </button>
            <small
              className={`transition_all pr-8 text-right lg:pr-20 ${
                errores.messagePassword ? "opacity-100" : "opacity-0"
              } absolute -bottom-6 left-0 text-left font-medium text-red-500`}
            >
              {errores.messagePassword}
            </small>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="text-center">Confirme la contraseña:</label>
          <div className="relative flex">
            <input
              type={showPassword2 ? "text" : "password"}
              name="repeatPassword"
              value={userData.repeatPassword}
              onChange={handlePasswordChange}
              className={`mx-auto w-3/4 border-gray-400 pl-2 lg:w-2/3 ${
                errores.messageRepeatPassword ? "border-red-500 focus-visible:outline-red-500" : ""
              }`}
            />
            <button
              onClick={visiblePassword2}
              className="absolute right-10 flex w-8 justify-center bg-transparent px-0 text-center text-blue shadow-none lg:right-20 2xl:right-24"
            >
              {!showPassword2 ? <HiEyeOff className="w-full" /> : <HiEye className="w-full" />}
            </button>
            <div className="absolute -bottom-6 left-0 text-right">
              <small
                className={`transition_all pr-8 text-right lg:pr-20 ${
                  errores.messageRepeatPassword ? "opacity-100" : "opacity-0"
                }  font-medium text-red-500`}
              >
                {errores.messageRepeatPassword}
              </small>
              <small
                className={`transition_all text-right ${
                  errores.messageRepeatPassword ? "opacity-0" : "pr-8 opacity-100 lg:pr-20"
                }  font-medium text-emerald-500`}
              >
                {errores.messageRepeatPassword === "" &&
                  userData.repeatPassword.length > 0 &&
                  "Las contraseñas coinciden"}
              </small>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button type="submit" className="w-2/3">
            Enviar contraseña
          </button>
        </div>
        <small className="pl-5 2xl:mt-5">
          ¿Quieres volver al inicio?{" "}
          <Link href={"http://localhost:3001"}>
            <span className="text-blue hover:cursor-pointer hover:underline">Haz clic aquí</span>
          </Link>
        </small>
      </div>
    </form>
  );
}
