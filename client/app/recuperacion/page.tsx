import FormPassword from "../../components/FormPassword/FormPassword";

export default function Recuperacion() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-center text-xl font-semibold text-blue lg:text-2xl 2xl:text-3xl">
        Cambia tu contraseña
      </h1>
      <FormPassword />
    </div>
  );
}
