import Image from "next/image";

import {iconsData} from "../../assets/data"

export default function Footer() {
  return (
    <footer className="lg:h-96 h-full bg-verde flex items-center align-middle justify-center">
      <div className="container mx-auto flex flex-col">
        <span className="text-black text-3xl font-bold text-center flex justify-center mt-10 lg:mt-0">
          Todo lo que necesitas saber
        </span>
        <span className=" text-center  flex justify-center mt-4 lg:mt-0">
          Encuentra la oferta de servicios de transporte terrestre público y privado disponible en tiempo real
        </span>
        <div className="flex justify-between mt-10 lg:flex-row flex-col items-center gap-10 lg:gap-0">
          {iconsData.map((icon) => (
            <div className="flex flex-col w-60 h-60 gap-2" key={icon.alt}>
              <Image src={icon.image} alt={icon.alt} className="h-28 w-28 flex self-center" />
              <p className="text-center">{icon.description}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
