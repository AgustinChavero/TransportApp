"use client";
import CardUsers from "../../../../components/Cards/CardUsers";
import CardProfile from "@component/components/Cards/CardProfile";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@component/Redux/store/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { User } from "@component/app/types/User";

import { getAllUsers } from "../../../../Redux/user/userActions";

// components

export default function Users() {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const allUsers = useSelector((state: RootState) => state.user.allUsers);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickFunction = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4 lg:w-8/12">
          <CardUsers
            allUsers={allUsers}
            handleClickFunction={handleClickFunction}
            selectedUser={selectedUser}
          />
        </div>
        <div className="w-full px-4 lg:w-4/12">
          <CardProfile selectedUser={selectedUser} />
        </div>
      </div>
    </>
  );
}
