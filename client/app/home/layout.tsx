import NavBar from "@component/components/NavBar/NavBar";
import Footer from "@component/components/Footer/Footer";
import logo from "../../assets/imagenes/logosecundario.webp";
import Image from "next/image";
import Menu from "@component/components/Menu/Menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urban | Inicio",
  description:
    "Descubre nuestra página de inicio, tu punto de partida para una experiencia de transporte excepcional. Con nuestra aplicación líder en el mercado, podrás acceder a una amplia gama de servicios de transporte, desde buses intermunicipales y taxis públicos hasta opciones de transporte privado y servicios de cadetería. Empodérate con información detallada y toma decisiones informadas que se adapten a tus necesidades. Nuestra plataforma te brinda soluciones reales para resolver tus problemas cotidianos de manera eficiente, permitiéndote gestionar tu tiempo y optimizar tus días. Explora nuestra página de inicio y descubre cómo mejorar tu vida con el poder de elegir tu medio de transporte de manera inteligente y conveniente.",
  keywords:
    "inicio, página de inicio, transporte, aplicación de transporte, servicios de transporte, buses intermunicipales, taxis públicos, transportes privados, cadetería, soluciones reales, gestionar tiempo, optimizar días, experiencia de transporte.",
};

export default function Home({ children }: { children: React.ReactNode }) {
  const containerStyles =
    "mx-auto flex min-h-[92vh] flex-col items-center justify-center gap-5 py-10 lg:container lg:flex-row lg:pb-20";
  const logoStyles =
    "mt-10 w-48 border border-none brightness-125 contrast-125 lg:mt-10 lg:w-56 2xl:w-[450px]";
  const footerStyles = "sm:mt-48 lg:mt-0";

  return (
    <div>
      <NavBar />
      <div className={containerStyles}>
        <div className="flex w-full flex-col items-center justify-center gap-4 border-none">
          <Image src={logo} alt="logo" className={logoStyles} />
          <Menu />
        </div>
        <div className="flex h-full w-full items-center justify-center">{children}</div>
      </div>
      <div className={footerStyles}>
        <Footer />
      </div>
    </div>
  );
}
