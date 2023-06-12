"use client";
import React, { useEffect, useState } from "react";

import CardPassages from "../../../../components/Cards/CardPassages";

import CardProfilePassage from "@component/components/Cards/CardProfilePassage";
import { ThunkDispatch } from "redux-thunk";
import { Passage } from "@component/app/types/Passages";
import { RootState } from "@component/Redux/store/store";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getAllPassages } from "@component/Redux/passage/passageActions";
import FormCreatePassage from "@component/components/Forms/FormCreatePassage";
import SeatManagement from "@component/components/SeatManagement/SeatManagement";

// components

export default function Passages() {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const allPassages = useSelector((state: RootState) => state.passage.allPassages);
  const [selectedPassage, setSelectedPassage] = useState<Passage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllPassages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (passage: Passage) => {
    setSelectedPassage(passage);
  };

  const filteredPassages = allPassages.filter(
    (passage: any) =>
      (passage.origin && passage.origin.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (passage.userId && passage.userId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 lg:w-8/12">
          <CardPassages
            allPassages={allPassages}
            handleClick={handleClick}
            selectedPassage={selectedPassage}
            handleSearchChange={handleSearchChange}
            searchTerm={searchTerm}
            filteredPassages={filteredPassages}
          />
        </div>
        <div className="w-full px-4 lg:w-4/12">
          <CardProfilePassage selectedPassage={selectedPassage} />
          <SeatManagement selectedPassage={selectedPassage}/>
        </div>
      </div>
    </>
  );
}
