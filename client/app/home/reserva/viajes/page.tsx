import CardReservaSlug from "@component/components/Cards/CardReservaSlug";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Urban | Viajes",
  description:
    "Explora nuestra amplia selección de viajes disponibles en nuestra página de gestión de viajes. Aquí encontrarás una variedad de opciones de transporte para satisfacer tus necesidades de viaje. Navega por destinos, fechas y horarios para descubrir las mejores opciones disponibles. Ya sea que estés buscando buses intermunicipales, taxis públicos o transportes privados, nuestra página de gestión de viajes te brinda una visión completa de todas las opciones disponibles. Planifica tus viajes de manera eficiente y elige la opción que mejor se ajuste a tus preferencias y horarios. Disfruta de una experiencia de viaje sin complicaciones con nuestra herramienta de gestión de viajes.",
  keywords:
    "gestión de viajes, viajes disponibles, opciones de transporte, buses intermunicipales, taxis públicos, transportes privados, destinos, fechas de viaje, horarios, planificar viajes, elegir opciones de viaje, experiencia de viaje, herramienta de gestión de viajes.",
};

export default function SearchResults() {
  // const capitalizedString = localidades.map((localidad: any) =>
  //   localidad.replace(/^\w/, (c: any) => c.toUpperCase())
  // );

  const containerStyles =
    "h-full w-10/12 sm:w-full rounded-3xl bg-white p-10 shadow-2xl shadow-black/40 lg:ml-12";
  const flexContainerStyles = "flex w-full flex-col gap-4";
  const titleStyles = "text-center text-xl text-blue";
  const buttonStyles = "flex gap-2 pt-10 justify-center sm:justify-start";

  return (
    <div className={containerStyles}>
      <div className={flexContainerStyles}>
        <h1 className={titleStyles}>Opciones encontradas</h1>
        <CardReservaSlug />
      </div>
      <div className={buttonStyles}>
        <button>Ver mas opciones</button>
      </div>
    </div>
  );
}
