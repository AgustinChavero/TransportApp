export default function TypeUser() {
  return (
    <>
      <div className="flex h-[700px] w-[600px] flex-col items-center justify-center gap-5 shadow-xl shadow-gray-500">
        <h1 className="text-center text-blue">¿Que tipo de usuario eres?</h1>
        <button className="w-1/2">Chofer</button>
        <button className="w-1/2">Usuario</button>
      </div>
    </>
  );
}
