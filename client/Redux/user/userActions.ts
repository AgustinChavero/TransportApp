import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../app/types/User";
import axiosInstance from "@component/services/axiosInstance";

// Define async thunk actions to fetch user data
// export const getAllUsers = async () => {
//   const response = await axios.get("http://localhost:3000/user?page=1&pageSize=1000");
//   return response;
// };

export const getAllUsers = createAsyncThunk<User[], void>("users/getAllUsers", async () => {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get(`/user?page=1&pageSize=1000`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.users;
});

export const getAllDeletedUsers = createAsyncThunk<User[], void>("users/getAllUsers", async () => {
  const response = await axiosInstance.get(`/user?page=1&pageSize=1000&deleted=true`);
  return response.data.users;
});

export const getUserById = createAsyncThunk<User, string>("users/getUserById", async (userId) => {
  const response = await axiosInstance.get(`/user/${userId}`);
  return response.data;
});

export const getUsersByName = createAsyncThunk("users/getUsersByName", async (name: string) => {
  const response = await axiosInstance.get(`/user?name=${name}`);
  return response.data.users;
});

export const getUsersByCc = createAsyncThunk("users/getUsersByCc", async (cc: string) => {
  const response = await axiosInstance.get(`/user?cc=${cc}`);
  return response.data.users;
});

export const getUsersByEmail = createAsyncThunk("users/getUsersByEmail", async (email: string) => {
  const response = await axiosInstance.get(`/user?email=${email}`);
  return response.data.users;
});

export const deleteUserById = createAsyncThunk("users/deleteUserById", async (userId: string) => {
  const response = await axiosInstance.delete(`/user/delete/${userId}`);
  return response.data;
});

export const enableUserById = createAsyncThunk("users/enableUserById", async (userId: string) => {
  const response = await axiosInstance.patch(`/user/enable/${userId}`);
  return response.data;
});
