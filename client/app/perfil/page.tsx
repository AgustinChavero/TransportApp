import CardPerfilPage from "@component/components/Cards/CardPerfilPage";
import Footer from "@component/components/Footer/Footer";
import NavBar from "@component/components/NavBar/NavBar";
import Profile from "@component/components/Profile/Profile";

export default function Perfil() {
  return (
    <div className="w-full">
      <NavBar />
      <div className=" container mx-auto  flex min-h-[90vh] flex-col items-center justify-center gap-6 py-10 md:h-screen xl:flex-row ">
        <section className="rounded-2xl  bg-white xl:w-1/3">
          <Profile />
        </section>
        <section className="w-full  xl:w-2/3">
          <CardPerfilPage />
        </section>
      </div>
      <Footer />
    </div>
  );
}
