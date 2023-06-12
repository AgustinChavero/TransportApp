"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import bg from "../../assets/imagenes/city.webp";
export default function Menu() {
  const pathname = usePathname();

  const containerStyles =
    "relative flex flex-col gap-4 w-10/12 mt-10 sm:mt-0 overflow-hidden rounded-2xl pb-8 pt-10 lg:w-2/3 lg:items-center lg:justify-center lg:px-24 lg:py-8 lg:shadow-2xl lg:shadow-black/40 2xl:w-3/4 2xl:py-16";
  const imageStyles = "absolute z-20 scale-125 contrast-150 saturate-150 backdrop-blur-lg";
  const overlayStyles = "absolute left-0 top-0 z-30 h-full w-full bg-black/50";
  const linksContainerStyles = "z-30 flex h-full sm:w-96 flex-col gap-4 p-8";
  const linkStyles =
    "w-full rounded-2xl bg-white py-1 text-center hover:bg-verde 2xl:w-full 2xl:text-lg";

  return (
    <>
      <div className={containerStyles}>
        <Image className={imageStyles} layout="fill" objectFit="cover" alt="" src={bg} />
        <div className={overlayStyles}></div>
        <div className={linksContainerStyles}>
          <Link
            href="/home/reserva"
            className={`${linkStyles} ${pathname === "/home/reserva" && "!bg-verde"}`}
          >
            Reserva tu viaje
          </Link>
          <Link
            href="/home/gestion"
            className={`${linkStyles} ${pathname === "/home/gestion" && "!bg-verde"}`}
          >
            Gestiona tus viajes
          </Link>
          <Link
            href="/home/paqueteria"
            className={`${linkStyles} ${pathname === "/home/paqueteria" && "!bg-verde"}`}
          >
            Envío de paquetes
          </Link>
          <Link
            href="/home/especiales"
            className={`${linkStyles} ${pathname === "/home/especiales" && "!bg-verde"}`}
          >
            Tengo una necesidad especial
          </Link>
        </div>
      </div>
    </>
  );
}
