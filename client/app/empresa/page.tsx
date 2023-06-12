import Footer from "@component/components/Footer/Footer";
import NavBar from "@component/components/NavBar/NavBar";

const page = () => {
  return (
    <main>
      <section className="h-screen">
        <article id="acerca-de-nosotros" className="min-h-screen bg-black text-center text-white">
          <h2>Acerca de nosotros</h2>
        </article>
        <article id="preguntas-frecuentes" className="min-h-screen bg-black text-center text-white">
          <h2>Preguntas frecuentes</h2>
        </article>
        <article id="ayuda-por-emergencia" className="min-h-screen bg-black text-center text-white">
          <h2>Ayuda por emergencia</h2>
        </article>
        <article
          id="terminos-y-condiciones"
          className="min-h-screen bg-black text-center text-white"
        >
          Terminos y condiciones
        </article>
      </section>
    </main>
  );
};

export default page;
