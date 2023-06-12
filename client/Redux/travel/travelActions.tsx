import { createAsyncThunk } from "@reduxjs/toolkit";
import { QueryParams } from "@component/app/types/QueryParams";
import { Travel } from "@component/app/types/Travels";
import axiosInstance from "@component/services/axiosInstance";

// Define async thunk actions to fetch user data
export const getAllTravels = createAsyncThunk("travels/getAllTravels", async () => {
  const response = await axiosInstance.get("/travels?page=1&pageSize=10000");
  return response.data.travels; // return only the data from the response
});

export const getTravelsById = createAsyncThunk("travels/getTravelsById", async (id: string) => {
  const response = await axiosInstance.get(`/api/travels/${id}`);
  return response.data;
});

export const getTravelsByQuery = createAsyncThunk<Travel[], QueryParams, {}>(
  "passage/fetchPassagesByQuery",
  async (queryParams: QueryParams) => {
    const urlSearchParams = new URLSearchParams(queryParams as Record<string, string>);
    const response = await axiosInstance.get(
      `/travels?page=1&pageSize=10000&${urlSearchParams.toString()}`
    );
    return response.data;
  }
);

export const getTravelsByUserId = createAsyncThunk<Travel[], string, {}>(
  "travels/getTravelsByUserId",
  async (userId: string) => {
    const response = await axiosInstance.get(`/travels/user/${userId}?page=1&pageSize=100`);
    return response.data.travels;
  }
);
