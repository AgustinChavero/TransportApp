import { FaMotorcycle, FaCar, FaTaxi } from "react-icons/fa";

export default function CardTransportePage() {
  return (
    <>
      <article className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <FaCar size="30" className="w-20 text-blue" />
          <span className="text-xl font-semibold text-gray-600">Automovil privado</span>
        </div>
        <span className="pt-2 text-gray-600">
          Conductor: Luis G. Cootransandina - 1:00pm - Estrella St <br />
          Tiempo estimado: 4 horas
        </span>
      </article>
      <hr />

      <article className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <FaTaxi size="30" className="w-20 text-blue" />
          <span className="text-xl font-semibold text-gray-600">Taxi Publico</span>
        </div>
        <span className="pt-2 text-gray-600">
          Conductor: Luis G. Cootransandina - 1:00pm - Estrella St <br />
          Tiempo estimado: 4 horas
        </span>
      </article>
      <hr />

      <article className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <FaMotorcycle size="30" className="w-20 text-blue" />
          <span className="text-xl font-semibold text-gray-600">Motocicleta privada</span>
        </div>
        <span className="pt-2 text-gray-600">
          Conductor: Luis G. Cootransandina - 1:00pm - Estrella St <br />
          Tiempo estimado: 4 horas
        </span>
      </article>
    </>
  );
}
