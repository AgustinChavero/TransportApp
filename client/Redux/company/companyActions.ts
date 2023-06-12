import { Company } from "@component/app/types/Company";
import axiosInstance from "@component/services/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//Hay que refactorizar el codigo, tiene que haber actions unicamente para GetAll, GetById, y GetByQueryParams

export const getAllCompanies = createAsyncThunk<Company[], void>(
  "companies/getAllCompanies",
  async () => {
    const response = await axiosInstance.get(`/company`);
    console.log(response.data.companies);
    return response.data.companies;
  }
);
