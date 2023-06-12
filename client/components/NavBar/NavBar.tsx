"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { userData } from "../../app/types/User";
import { links, linksMobile } from "../../assets/data";
import { HiMenu, HiMenuAlt3 } from "react-icons/hi";

import logo from "../../assets/imagenes/UrbanIso.png";

export default function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<userData | null>(null);

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const pathname = usePathname();
  const router = useRouter();
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
    router.push("/");
  };

  return (
    <header className="  bg-verde">
      {isMobile ? (
        <>
          <nav className="fixed z-50 h-12 w-full justify-between  bg-gradient-to-r from-black via-slate-700  to-blue ">
            <Image
              src={logo}
              alt="logo"
              className=" flex h-full w-auto items-center justify-center "
              width={50}
              height={50}
            />
            <button className="bg-transparent text-black shadow-none" onClick={toggleMenu}>
              {showMenu ? (
                <HiMenuAlt3 className="absolute right-0 top-0  z-50 mr-4 h-full w-1/12 cursor-pointer  text-xl md:hidden" />
              ) : (
                <HiMenu className="absolute right-0 top-0  z-50 mr-4 h-full w-1/12 cursor-pointer  text-xl md:hidden" />
              )}
            </button>

            <div
              onClick={toggleMenu}
              className={` fixed left-0 top-0 h-screen w-full bg-black/30  transition-all duration-700 ease-in-out ${
                !showMenu ? "hidden opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`absolute left-0 top-0 z-20 h-screen w-0 overflow-hidden bg-black  transition-all  duration-1000 ease-in-out md:hidden ${
                showMenu && "w-1/2 shadow-custom-md"
              }`}
            >
              <ul className="flex flex-col items-start bg-black p-4">
                {user ? (
                  <div className="flex w-full flex-col items-center justify-between  py-2 text-white">
                    <Image
                      src={user?.img}
                      alt={user?.name}
                      width={50}
                      height={50}
                      className="w-1/2 rounded-full border-2 border-blue"
                    />
                    <div className="flex flex-col gap-2 py-2">
                      <small className="mx-auto text-center text-white">{user?.name}</small>
                      <button className="text-blue-500 text-sm" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <li className="my-2 flex items-center  ">
                    <Image
                      src="/placeholder.png"
                      alt="placeholder"
                      width={50}
                      height={50}
                      className="h-6 w-6 rounded-full"
                    />
                    <span className="mx-2">Guest</span>
                    <Link href="/" className="rounded bg-blue px-2 py-1 text-center text-white ">
                      Login
                    </Link>
                  </li>
                )}

                {linksMobile.map((link) => (
                  <li key={link.id} className="my-2 flex items-start bg-black text-white">
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
      ) : (
        <div className="flex h-16 w-full items-center justify-between bg-gradient-to-r from-black via-slate-700  to-blue px-4 py-2 lg:py-0">
          <div>
            <Image
              src={logo}
              alt="logo"
              className="absolute top-2  z-50 flex h-10 w-auto self-center"
              width={100}
              height={100}
            />
          </div>
          <nav>
            <ul className="flex w-auto items-center justify-end lg:gap-4 ">
              {links.map((link) => (
                <li
                  key={link.id}
                  className={`flex ${
                    pathname?.includes(link.route) && "border-b border-celeste "
                  } items-center justify-center px-2 py-1 transition-all duration-150 hover:border-b hover:border-celeste lg:mr-3 lg:w-auto lg:px-0 xl:mr-0`}
                >
                  <Link
                    href={link.route}
                    className="flex items-center gap-1 text-sm font-semibold uppercase text-white"
                  >
                    <link.icon className="h-6 w-5 " />
                    {link.label}
                  </Link>
                </li>
              ))}
              {user ? (
                <>
                  <li className="flex items-center justify-center px-2 py-1 transition-all duration-150 hover:border-b hover:border-celeste lg:mr-4 lg:w-auto lg:px-0">
                    <Image
                      src={user?.img}
                      alt={user?.name}
                      width={50}
                      height={50}
                      className=" rounded-full border-2 border-blue lg:h-12 lg:w-12"
                    />
                    <span className="mx-2 font-semibold text-white lg:text-sm">{user?.name}</span>
                    <button
                      className="rounded bg-blue px-2 py-1 text-center text-white lg:w-auto"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="my-2 flex w-auto items-center">
                  <span className="mx-2 font-semibold lg:w-auto">GUEST</span>
                  <Link
                    href="/"
                    className="rounded bg-blue px-4 py-2 text-center text-white lg:w-auto"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
