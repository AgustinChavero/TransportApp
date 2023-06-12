import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import setValidate from "./Validate";
import Link from "next/link";
import { Google } from "@component/assets/icons/svg/Google";
import axiosInstance from "@component/services/axiosInstance";

// interface UserToRegister {
//   name: string;
//   email: string;
//   password: string;
// }

interface UserToLogin {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

interface LoginError {
  messageEmail?: string;
  messagePassword?: string;
}
const LoginForm = ({ isRegister, setIsRegister }: { isRegister: boolean; setIsRegister: any }) => {
  const [userData, setUserData] = useState<UserToLogin>({} as UserToLogin);
  const [errores, setErrores] = useState<LoginError>({} as LoginError);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toString();
    const name = e.target.name.toString();

    setUserData({ ...userData, [name]: value });
    setErrores({ ...errores, ...setValidate({ [name]: value }) });
  };
  const handleRegisterClick = () => {
    setIsRegister(!isRegister);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const user: UserToLogin = userData;
    try {
      const response = await axiosInstance.post("/login/user", user);
      const { token } = response.data;
      if (window) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      if (token) {
        console.log("Login successful");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        router.push("/home");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
      console.log("Error al iniciar sesión");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className='relative mx-2 h-[500px] w-80 max-w-md rounded-lg bg-white px-4 py-8 text-sm text-white/90 shadow-lg shadow-black/40 sm:w-96'
    >
      {/* div que contiene Email y Password */}
      <div className='flex h-[250px] flex-col gap-5 px-5 pt-10'>
        {/* email */}
        <div className='relative'>
          <label
            className={`transition_all relative px-1 pr-8  text-center ${
              errores.messageEmail ? "text-red-500" : ""
            }`}
          >
            Email:
          </label>
          <input
            type='email'
            name='email'
            value={userData.email}
            onChange={handleInputChange}
            className={`transition_all px-2 text-black ${
              errores.messageEmail && "focus-visible:outline-red-500 "
            }`}
          />
          <small
            className={`transition_all absolute text-right ${
              errores.messageEmail ? "opacity-100" : "opacity-0"
            } -bottom-6 left-0 text-left font-medium text-red-500`}
          >
            {errores.messageEmail}
          </small>
        </div>
        {/* password  */}
        <div className='relative'>
          <label
            className={`relative px-1 text-center ${
              errores.messagePassword ? "text-red-500" : ""
            } transition_all`}
          >
            Password:
          </label>
          <input
            type='password'
            name='password'
            value={userData.password}
            onChange={handleInputChange}
            className={`transition_all px-1  text-black ${
              errores.messagePassword && " focus-visible:outline-red-500"
            }`}
          />
          <small
            className={`transition_all text-right ${
              errores.messagePassword ? "opacity-100" : "opacity-0"
            } absolute -bottom-6 left-0 text-left font-medium text-red-500`}
          >
            {errores.messagePassword}
          </small>
        </div>
      </div>
      {/* div que contiene boton de login  */}
      <div className='py-4 text-center'>
        <button className='mx-auto px-[76px] py-[10px]' onClick={handleLogin}>
          Login
        </button>
      </div>

      {/* <button onClick={handleRegisterClick}>Apple Id</button> */}

      <div className='mx-auto flex w-4/5 flex-col gap-2'>
        <Link
          className='mx-auto flex w-4/5 items-center justify-center gap-1 rounded-md  border border-[#888] bg-white py-2 font-semibold  text-[#757575] shadow-md shadow-black/30 sm:w-2/3'
          href='http://localhost:3000/login/auth/google'
          // href="https://api-urban.onrender.com/login/auth/google"
          rel='noopener noreferrer'
        >
          <Google width='23' height='23' />
          Login with Google
        </Link>
        <Link
          className='mx-auto flex w-4/5 items-center justify-center gap-1   rounded-md border border-[#888] bg-white py-2 font-semibold  text-blue shadow-md shadow-black/30 sm:w-2/3'
          href='http://localhost:3000/login/auth/google'
          // href='https://api-urban.onrender.com/login/auth/google'
          rel='noopener noreferrer'
        >
          <svg className=' h-6 w-6 fill-current' viewBox='0 0 24 24'>
            <path d='M20.02 0H3.98A3.98 3.98 0 0 0 0 3.98v16.04A3.98 3.98 0 0 0 3.98 24h8.22v-9.29H8.65v-3.62h3.55V9.02c0-3.52 2.14-5.44 5.28-5.44 1.54 0 2.87.12 3.26.18v3.66l-2.23.001c-1.75 0-2.09.83-2.09 2.05v2.69h4.19l-.55 3.62h-3.64V24h7.12A3.98 3.98 0 0 0 24 20.02V3.98C24 1.78 22.2 0 20.02 0z' />
          </svg>
          Login with Facebook
        </Link>
      </div>

      <div className='mt-2 flex flex-col justify-evenly sm:mt-2 sm:flex-row sm:gap-6'>
        <Link
          href='http://localhost:3000/recuperacion'
          className='font-semibold text-blue hover:cursor-pointer hover:underline'
        >
          <span className='bottom-5 right-5 block text-right text-[0.7rem] font-semibold text-blue hover:cursor-pointer hover:underline sm:pt-2 sm:text-right'>
            Olvidaste tu contraseña?{" "}
          </span>
        </Link>

        <span
          onClick={handleRegisterClick}
          className='bottom-5 right-5 block  text-right text-[0.7rem] font-semibold text-blue hover:cursor-pointer hover:underline sm:pt-2 sm:text-right'
        >
          <p className='text-blue '>No tienes cuenta? Registrate!</p>
        </span>
      </div>
      {/* <button onClick={handleRegisterClick}>Facebook</button> */}
    </form>
  );
};

export default LoginForm;
