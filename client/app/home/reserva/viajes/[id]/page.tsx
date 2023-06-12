import CardConfirmacionReserva from "@component/components/Cards/CardConfirmacionReserva";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Urban | Viajes | Confirmacion",
  description:
    "En nuestra página de confirmación de viajes, podrás revisar en detalle los datos de tu viaje y confirmar la cantidad de pasajes que deseas. Aquí encontrarás toda la información relevante, incluyendo los detalles del destino, origen, fechas, horarios y opciones de transporte seleccionadas. Revisa cuidadosamente los datos y personaliza tu viaje ajustando el número de pasajes requeridos. Nuestra página de confirmación de viajes te permite tener un control total sobre tu experiencia de viaje. Asegúrate de tener la cantidad adecuada de pasajes y disfruta de un viaje cómodo y sin complicaciones.",
  keywords:
    "gestión de viajes, confirmación de viajes, detalles de viaje, opciones de transporte, cantidad de pasajes, destinos, origen, fechas de viaje, horarios, personalizar viaje, control de viaje, experiencia de viaje, viaje cómodo, herramienta de confirmación de viajes.",
};

export default function Confirmacion({ params }: { params: { id: string } }) {
  const { id } = params;

  const containerStyles =
    "flex w-10/12 sm:w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-gray-300 bg-white py-4 shadow-xl shadow-black/40 xl:h-[530px] xl:justify-between";
  const titleStyles = "text-center font-bold lg:text-xl";
  const textStyles = "w-10/12 py-2 text-center text-xs text-gray-400 lg:w-3/4";

  return (
    <div className={containerStyles}>
      <h3 className={titleStyles}>Pasaje disponible!</h3>
      <CardConfirmacionReserva id={id} />

      <div className="flex flex-col items-center justify-center gap-2">
        <p className={textStyles}>
          Tocando el boton para abonar el servicio aceptas nuestros terminos y condiciones de uso
        </p>
      </div>
    </div>
  );
}
