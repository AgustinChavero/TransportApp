import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Importante: NO hace falta envolver el PROVIDER con NADA, es un codigo sencillo ejecutable con un click, una notificacion sencilla de toda la vida

//Ejemplo de uso
export default function Toastify() {
  //Esto es lo que se va a ejecutar con el click
  const notifySuccess = () =>
    //Aca es donde se define el funcionamiento de la notificacion, si dura mucho o poco, si es positiva o negativa
    //Si miran cada Toast solo con cambiar el success, error, warn o info, cambie su funcion
    //No hace falta cambiar el ToastContainer a la par si solo se cambia el Toast
    toast.success("Notificacion de Exito", {
      position: "top-center",
      autoClose: 5000, //Con autoClose={false} no se cierra automaticamente
      hideProgressBar: false, //Para que se vea o no el progreso
      closeOnClick: true,
      pauseOnHover: false, //Se pondra en pausa, o no, si el mouse esta encima
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyError = () =>
    toast.error("Notificacion de Error", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyWarning = () =>
    toast.warn("Notificacion de advertencia", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyInfo = () =>
    toast.info("Notificacion de informacion", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  //Al aplicar toast.promise, el primer parametro si o si tiene que ser una promesa
  //Intente resumir el codigo y no funcionó
  const notifyPromise = () => new Promise((resolve) => setTimeout(resolve, 5000));
  toast.promise(notifyPromise, {
    pending: "Promesa pendiente",
    success: "Promesa resuelta",
    error: "Promesa rechazada",
  });

  return (
    <div>
      <button onClick={notifyPromise}>Notify !</button>
      {/* 
      El ToastContainter unicamente define la posicion o el estilo de la notificacion
      */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false} //Con esto quitamos o habilitamos la X para cerrar
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        //Light, dark o colored... elijan el mas conveniente, recuerden cambiar esto tambien en el toast
        theme="light"
        closeButton={false}
      />
    </div>
  );
}

//Pueden hacer los cambios de estilos y posicionamiento de forma automatica en https://fkhadra.github.io/react-toastify/introduction
