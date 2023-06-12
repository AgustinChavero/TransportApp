import logo from "../../assets/imagenes/UrbanLogo.png";
import Image, { StaticImageData } from "next/image";

export default function ProfileUser() {
  return (
    <>
      <div className="w-1/2 shadow-gray-500 shadow-2xl">
        <Image src={logo as StaticImageData} alt="logo" className="w-full aspect-ratio-square" />
      </div>
      <div className="w-1/2 flex items-center ">
        <form className="mx-auto py-12 px-24 flex flex-col shadow-gray-500 shadow-xl w-4/5 gap-10 justify-center items-center">
          <div className="flex items-center flex-col gap-1">
            <label className="text-center">Nombre</label>
            <input className="pl-2 w-10/12 text-center" type="text" />
          </div>

          <div className="flex items-center flex-col gap-1">
            <label className="text-center">Apellido</label>
            <input className="pl-2 w-10/12 text-center" type="text" />
          </div>
          <div className="flex items-center flex-col gap-1">
            <label className="text-center">Direccion predeterminada</label>
            <input className="pl-2 w-10/12 text-center" type="text" />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <label className="text-center">Imagen de perfil</label>
            <Image
              src={logo as StaticImageData}
              alt="profile"
              className="h-36  w-36 rounded-full"
            ></Image>
          </div>
          <div className="flex items-center flex-col gap-5">
            <button className="w-1/2 bg-white font-semibold text-blue">Subir imagen</button>
            <button className="w-1/2 bg-white font-semibold text-blue">Capturar imagen</button>
            <button className="w-1/2 bg-white font-semibold text-blue">Guardar</button>
          </div>
        </form>
      </div>
    </>
  );
}
