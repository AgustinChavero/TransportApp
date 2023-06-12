import CardReservaPage from "@component/components/Cards/CardResevaPage";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Urban | Reserva",
  description:
    "En nuestra página de gestión, puedes planificar tus viajes de manera sencilla y conveniente. Ingresa tu destino, origen y fechas de salida y regreso, y descubre una amplia selección de opciones de transporte. Nuestra plataforma te brinda la información necesaria para que tomes decisiones informadas y elijas la mejor opción para tu viaje. Ya sea que estés buscando buses intermunicipales, taxis públicos o transportes privados, nuestra página de gestión te ayuda a encontrar soluciones de transporte adaptadas a tus necesidades. Optimiza tus días y disfruta de una experiencia de viaje fluida y placentera con nuestra herramienta de gestión.",
  keywords:
    "gestión de viajes, buscar viajes, destino, origen, fecha de salida, fecha de regreso, opciones de transporte, buses intermunicipales, taxis públicos, transportes privados, planificar viaje, tomar decisiones informadas, optimizar viajes, experiencia de viaje.",
};

export default function Reserva() {
  const sectionStyles =
    "mx-auto mt-10 flex sm:w-full w-10/12 flex-col justify-between rounded-3xl border-2 bg-white px-2 pt-10 shadow-2xl shadow-black/40 lg:mt-10 lg:h-[530px]";
  const headingStyles = "px-8 text-center text-blue lg:px-0 lg:text-xl";

  return (
    <section className={sectionStyles}>
      <div className="flex flex-col gap-8">
        <h1 className={headingStyles}>Llena el formulario para encontrar tu viaje</h1>
        <CardReservaPage />
      </div>
    </section>
  );
}
