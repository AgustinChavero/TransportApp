import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Urban | Inicio",
  description:
    "Descubre nuestra página de inicio, tu punto de partida para una experiencia de transporte excepcional. Con nuestra aplicación líder en el mercado, podrás acceder a una amplia gama de servicios de transporte, desde buses intermunicipales y taxis públicos hasta opciones de transporte privado y servicios de cadetería. Empodérate con información detallada y toma decisiones informadas que se adapten a tus necesidades. Nuestra plataforma te brinda soluciones reales para resolver tus problemas cotidianos de manera eficiente, permitiéndote gestionar tu tiempo y optimizar tus días. Explora nuestra página de inicio y descubre cómo mejorar tu vida con el poder de elegir tu medio de transporte de manera inteligente y conveniente.",
  keywords:
    "inicio, página de inicio, transporte, aplicación de transporte, servicios de transporte, buses intermunicipales, taxis públicos, transportes privados, cadetería, soluciones reales, gestionar tiempo, optimizar días, experiencia de transporte.",
};
export default function Home() {
  return (
    <div className="scrollbar mb-8 mt-10 flex w-full flex-col items-center justify-evenly overflow-y-scroll rounded-3xl border-2 px-4 py-4 shadow-2xl shadow-black/40 min-[420px]:mt-32 min-[420px]:w-4/5 lg:mt-10 lg:h-[400px] xl:h-[450px] xl:w-full 2xl:h-4/5">
      <div className="">
        <h2 className="py-2 text-center text-xl font-bold">Acerca de nosotros</h2>
        <p className="p-2 text-justify">
          Somos la solución perfecta para hacer tus viajes intermunicipales terrestres más fáciles y
          seguros. Con solo 1 clic te ofrecemos una oferta multimodal de transporte (bus, taxi o
          vehículo particular) que se ajustara a tus necesidades económicas y de itinerario. Somos
          la única solución en Colombia que te permite realizar viajes compartidos en vehículos
          privados con estrictas condiciones de seguridad, de esta forma contribuimos a tu
          comodidad, pero, más importante aún, generamos eficiencias económicas y ambientales.
        </p>
        <h3 className="py-2  text-center text-xl font-bold">¿Es segura la plataforma?</h3>
        <p className="p-2 text-justify">
          Para nosotros, tu seguridad es lo mas importante. Por eso, implementamos un sistema de
          validación de identidad y antecedentes, del conductor y del vehículo que te transporta,
          que nos permite, dentro de lo posible, reconocer que la prestación del servicio será
          exitosa y sin contratiempos. Sabemos que pueden ocurrir eventos inesperados, por eso
          habilitamos líneas de emergencia de atención inmediata para poder ayudarte con compromiso
          y diligencia.
        </p>
      </div>
    </div>
  );
}
