import CardGestion from "@component/components/Cards/CardGestion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urban | Historial de viajes",
  description: "Historial de viajes del usuario en la que puede ver los viajes que ha realizado",
  keywords: "urban, historial, viajes, usuario,  gestion de viajes, gestion de viajes del usuario",
};

// Traigo todos los viajes del usuario

export default function Gestion() {
  return (
    <div className=" mt-10 flex h-full w-full flex-col  gap-2 rounded-3xl border-2 bg-white p-6 shadow-2xl shadow-black/40 lg:h-[530px]">
      <h2 className="rounded-3xl p-4  text-center text-xl font-semibold tracking-wider text-blue">
        Historial de viajes
      </h2>

      <CardGestion />
    </div>
  );
}
