import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { Company } from "@component/app/types/Company";
import { getAllCompanies } from "./companyActions";

interface CompanyInitialState {
  allCompanies: Company[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CompanyInitialState = {
  allCompanies: null,
  status: "idle",
  error: null,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allCompanies = action.payload;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default companiesSlice.reducer;
