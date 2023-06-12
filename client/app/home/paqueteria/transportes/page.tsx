import CardTransportePage from "@component/components/Cards/CardTransportePage";
import Link from "next/link";

export default function Transportes() {
  return (
    <section className="mx-auto mt-10 rounded-3xl border-2 p-6 shadow-2xl shadow-black/40 lg:h-[530px]">
      <div className="flex scroll-my-10 flex-col gap-6">
        <h2 className="text-center text-xl font-semibold text-blue">
          Estas son las mejores opciones encontradas
        </h2>
        <CardTransportePage />
      </div>
      <div className="flex gap-2 pt-10">
        <button className="w-1/2">Ver mas opciones</button>
        <Link
          href={"home/paqueteria/transportes/confirmacion"}
          className="w-1/2 rounded-lg bg-blue p-2 text-center text-white"
        >
          <span>Reservar</span>
        </Link>
      </div>
    </section>
  );
}
