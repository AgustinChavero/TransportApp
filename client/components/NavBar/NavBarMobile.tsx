"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { userData } from "../../app/types/User";
import { linksMobile } from "../../assets/data";
import { HiMenu, HiMenuAlt3 } from "react-icons/hi";

import logo from "../../assets/imagenes/UrbanIso.png";

export default function NavBarMobile() {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<userData | null>(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const userDataString = window && localStorage.getItem("user");
    if (userDataString) {
      const userDataObject = JSON.parse(userDataString);
      setUser(userDataObject);
    }
  }, [setUser]);

  const handleLogout = () => {
    window && localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <header>
      <>
        <Image
          src={logo}
          alt="logo"
          className="absolute left-0 top-1 z-10 h-10 w-auto  self-center"
          width={50}
          height={50}
        />

        <nav className="relative flex h-12 w-full justify-between bg-verde ">
          <button className="bg-transparent text-black shadow-none" onClick={toggleMenu}>
            {showMenu ? (
              <HiMenuAlt3 className="absolute right-0 top-0  z-50 mr-4 h-full w-1/12 cursor-pointer  text-xl md:hidden" />
            ) : (
              <HiMenu className="absolute right-0 top-0  z-50 mr-4 h-full w-1/12 cursor-pointer  text-xl md:hidden" />
            )}
          </button>

          <div
            className={`absolute left-0 top-0  h-screen bg-black/30 transition-all duration-700 ease-in-out ${
              !showMenu ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`absolute left-0 top-0 z-20 h-screen w-0 overflow-hidden  bg-white transition-all  duration-1000 ease-in-out md:hidden ${
              showMenu && "w-1/2 shadow-custom-md"
            }`}
          >
            <ul className="flex flex-col items-center p-4">
              {user ? (
                <li className="flex flex-col items-center justify-between py-2 ">
                  <Image
                    src={user?.img}
                    alt={user?.name}
                    width={50}
                    height={50}
                    className="w-1/2 rounded-full border-2 border-blue"
                  />
                  <div className="flex flex-col gap-2 py-2">
                    <small className="mx-auto text-center">{user?.name}</small>
                    <button className="text-blue-500 text-sm" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </li>
              ) : (
                <li className="my-2 flex items-center ">
                  <Image
                    src="/placeholder.png"
                    alt="placeholder"
                    width={50}
                    height={50}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="mx-2">Guest</span>
                  <Link href="/" className="rounded bg-blue px-2 py-1 text-center text-white">
                    Login
                  </Link>
                </li>
              )}

              {linksMobile.map((link) => (
                <li key={link.id} className="my-2 flex items-center ">
                  <link.icon className="h-6 w-6" />
                  <Link href={link.route} onClick={toggleMenu}>
                    <span className="mx-2">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </>
    </header>
  );
}
