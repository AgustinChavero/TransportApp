"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pestañasHistorialPerfil, contenidoHistorialPerfil } from "../../assets/data";
import { RootState } from "@component/Redux/store/store";
import { Dispatch } from "@reduxjs/toolkit";
import CardHistorialTickets from "./CardHistorialTickets";
import { userData } from "@component/app/types/User";

export default function PerfilPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Viajes");
  const [userData, setUserData] = useState<userData | null>(null);

  const dispatch = useDispatch<Dispatch<any>>();
  const userTravels = useSelector((state: RootState) => state.travel.userTravels);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (window) {
      const userString = localStorage.getItem("user");
      setLoading(false);
      const userData = userString ? JSON.parse(userString) : null;
      setUserData(userData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" rounded-xl  shadow-xl shadow-black/40 xl:h-[600px]">
      {/* Tabs */}
      <div className="flex  ">
        {pestañasHistorialPerfil.map((item, index) => (
          <div
            key={index}
            className={`flex  w-full cursor-pointer items-center rounded-t-xl border-2 bg-white  px-2 py-1 align-middle transition duration-500 md:py-1 lg:hover:bg-gray-300 xl:border-gray-200 ${
              activeTab === `${item.name}` &&
              "??  bg-gradient-to-br from-blue via-slate-700  to-black/80 font-semibold text-white"
            }`}
            onClick={() => handleTabClick(`${item.name}`)}
          >
            <h3 className="text-center">{item.name}</h3>
          </div>
        ))}
      </div>

      {/* Content  */}
      {contenidoHistorialPerfil.map((item, index) => (
        <>
          {activeTab === `${item.name}` && (
            <div
              key={index}
              className="text-35 bg-gray-white  h-[570px] w-full overflow-hidden bg-white"
              title={item.title}
            >
              <h4 className="border-y-2 border-blue text-center text-lg font-semibold">{item.p}</h4>

              {activeTab === "Viajes" && (
                <div
                  className={`flex h-full w-full flex-col items-center justify-evenly gap-3 ${
                    userTravels.length > 3 && "overflow-scroll"
                  } pb-4 `}
                >
                  <CardHistorialTickets />
                </div>
              )}
            </div>
          )}
        </>
      ))}
    </div>
  );
}
