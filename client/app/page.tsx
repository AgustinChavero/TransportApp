"use client";
import Login from "@component/components/Login/Login";
import logo from "../assets/imagenes/UrbanLogo.png";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function LandingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userString = localStorage.getItem("user");
      const userData = userString ? JSON.parse(userString) : null;
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (user) {
      window.location.href = "/home";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col items-center justify-center  lg:flex-row ">
      <GoogleOAuthProvider clientId="your-client-id">
        <div className="mx-auto flex w-1/2 justify-center lg:justify-end lg:pr-28 ">
          <Image src={logo} alt="logo" className="aspect-ratio-square   lg:h-96 lg:w-96" />
        </div>
        <div className="lg:mx-auto lg:w-1/2">
          <Login />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
