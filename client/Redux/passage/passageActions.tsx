import { PassageResponse, PassageToRegister, Passage } from "@component/app/types/Passages";
import { QueryParams } from "@component/app/types/QueryParams";
import axiosInstance from "@component/services/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define async thunk actions to fetch user data
export const getAllPassages = createAsyncThunk<Passage[], void>(
  "passage/getAllPassages",
  async () => {
    const response = await axiosInstance.get("/passage?page=1&pageSize=10000");
    return response.data.passages;
  }
);

export const getPassagesId = createAsyncThunk<PassageToRegister, string>(
  "passage/getPassagesId",
  async (id: string) => {
    const response = await axiosInstance.get(`/passage/${id}`);
    return response.data;
  }
);

export const getPassagesByQuery = createAsyncThunk<Passage[], QueryParams>(
  "passage/fetchPassagesByQuery",
  async (queryParams: QueryParams) => {
    const urlSearchParams = new URLSearchParams(queryParams as Record<string, string>);
    const response = await axiosInstance.get(
      `/passage?page=1&pageSize=10000&${urlSearchParams.toString()}`
    );
    return response.data.passages;
  }
);
