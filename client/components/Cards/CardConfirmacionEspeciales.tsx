import Link from "next/link";

export default function CardConfirmacionEspeciales() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border-2 py-20 shadow-2xl shadow-black/40 lg:p-10">
      <p className="text-center font-bold lg:text-3xl">Pedido especial confirmado</p>
      <div className="flex justify-center">
        <p className="text-center font-bold lg:text-3xl">Nombre del cadete</p>
        <p className=" text-center lg:text-3xl">Luis martin</p>
      </div>
      <div className="flex justify-center">
        <p className="text-center font-bold lg:text-3xl"> Hora de recogida</p>
        <p className=" text-center lg:text-3xl">3:00 horas</p>
      </div>
      <div className="flex justify-center">
        <p className="text-center font-bold lg:text-3xl">Lugar de recogida</p>
        <p className=" text-center lg:text-3xl">Lugar indicado</p>
      </div>
      <div className="flex justify-center">
        <p className="text-center font-bold lg:text-3xl">Valor a pagar</p>
        <p className=" text-center lg:text-3xl">un toco de plata</p>
      </div>
      <p className="text-center text-gray-400">
        {" "}
        tocando el boton para abonar el servicio aceptas nuestros terminos y condiciones de uso
      </p>
      <Link
        href="/home/especiales/confirmacion/pagos"
        className="w-2/3 rounded-md bg-blue p-2 text-center text-white"
      >
        Ir a pagar
      </Link>
    </div>
  );
}
