"use client";

import React, { useEffect, useState } from "react";
import CardTravels from "@component/components/Cards/CardTravels";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@component/Redux/store/store";
import { getAllTravels } from "@component/Redux/travel/travelActions";
import { Travel } from "@component/app/types/Travels";
import CardSelectedTravel from "@component/components/Cards/CardTravelsSelected";

export interface CardTravelsProps {
  allTravels: Travel[];
  handleClickFunction: (travel: Travel) => void;
  selectedTravel: Travel | null;
}

export interface CardTravelProps {
  selectedTravel: Travel | null;
}

export default function Travels() {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const allTravels = useSelector((state: RootState) => state.travel.allTravels);

  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);

  useEffect(() => {
    dispatch(getAllTravels());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickFunction = (travel: Travel) => {
    setSelectedTravel(travel);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 lg:w-8/12">
          <CardTravels
            allTravels={allTravels}
            handleClickFunction={handleClickFunction}
            selectedTravel={selectedTravel}
          />
        </div>
        <div className="w-full px-4 lg:w-4/12">
          <CardSelectedTravel selectedTravel={selectedTravel} />
        </div>
      </div>
    </>
  );
}
