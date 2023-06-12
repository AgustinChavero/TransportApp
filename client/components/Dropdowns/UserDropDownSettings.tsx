"use client";
import React from "react";

import { ThunkDispatch } from "redux-thunk";
import { RootState } from "@component/Redux/store/store";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { deleteUserById, enableUserById } from "@component/Redux/user/userActions";

const UserDropDownSettings = (user: any) => {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  const handleBann = (id: string) => {
    console.log(id);
    dispatch(deleteUserById(id));
    console.log("Borrado");
  };

  const handleEnable = (id: string) => {
    console.log(id);
    dispatch(enableUserById(id));
    console.log("Habilitado");
  };

  return (
    <div
      className={
        "absolute right-7 top-14  z-50  w-48 list-none rounded bg-white py-2 text-left text-base shadow-lg"
      }
    >
      <a
        href="#pablo"
        className={
          "block w-48 whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
        }
        onClick={(e) => e.preventDefault()}
      >
        Action
      </a>
      <a
        href="#pablo"
        className={
          "block w-48 whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
        }
        onClick={(e) => e.preventDefault()}
      >
        Another action
      </a>
      <a
        href="#pablo"
        className={
          "block w-48 whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-blueGray-700"
        }
        onClick={(e) => e.preventDefault()}
      >
        Something else here
      </a>
      {/*  <div>
        {user?.user?.deleted ? (
          <button
            className="block w-48 whitespace-nowrap rounded-none bg-green-800 px-4 py-2 text-sm font-normal text-white hover:bg-green-900"
            onClick={() => {
              handleEnable(user.user.id);
            }}
          >
            Habilitar
          </button>
        ) : (
          <button
            className="block w-48 whitespace-nowrap rounded-none bg-red-800 px-4 py-2 text-sm font-normal text-white hover:bg-red-900"
            onClick={() => {
              handleBann(user.user.id);
            }}
          >
            Ban
          </button>
        )}
      </div> */}
    </div>
  );
};

export default UserDropDownSettings;
