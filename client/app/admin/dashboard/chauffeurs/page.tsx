"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@component/Redux/store/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { getChauffeurs } from "@component/Redux/chauffeur/chauffeurActions";
import { Chauffeur } from "@component/app/types/Chauffeur";
import CardChauffeurs from "@component/components/Cards/CardChauffeurs";
import CardChauffeurProfile from "@component/components/Cards/CardChauffeurProfile";

export interface CardChauffeursProps {
  allChauffeurs: Chauffeur[] | undefined;
  handleSelectChauffeur: (chauffeur: Chauffeur) => void;
  selectedChauffeur: Chauffeur | null;
}

export interface CardChauffeurProfileProps {
  selectedChauffeur: Chauffeur | null;
}

export default function Chauffeurs() {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const allChauffeurs = useSelector((state: RootState) => state.chauffeur.chauffeurs?.data);

  const [selectedChauffeur, setSelectedChauffeur] = useState<Chauffeur | null>(null);

  useEffect(() => {
    dispatch(getChauffeurs({})); // falta armar los params
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectChauffeur = (chauffeur: Chauffeur) => {
    setSelectedChauffeur(chauffeur);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 lg:w-8/12">
          <CardChauffeurs
            allChauffeurs={allChauffeurs}
            handleSelectChauffeur={handleSelectChauffeur}
            selectedChauffeur={selectedChauffeur}
          />
        </div>
        <div className="w-full px-4 lg:w-4/12">
          <CardChauffeurProfile selectedChauffeur={selectedChauffeur} />
        </div>
      </div>
    </>
  );
}
