import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { Chauffeur, FilteredChauffeurs } from "@component/app/types/Chauffeur";
import { getChauffeurs } from "./chauffeurActions";

//!!!!!!!!!!!!!!!
//Hay que refactorizar el codigo, tiene que haber actions unicamente para GetAll, GetById, y GetByQueryParams
//!!!!!!!!!!!!!!!

interface ChauffeurInitialState {
  chauffeurs: FilteredChauffeurs | null;
  chauffeursPendingPayment: Chauffeur[]; // van a traer el balance desde el back? sino adaptar
  status: "idle" | "loading" | "succeeded" | "failed"; // verificar si funciona el mismo status para todas las actions
  error: string | null;
}

const initialState: ChauffeurInitialState = {
  chauffeurs: null,
  chauffeursPendingPayment: [],
  status: "idle",
  error: null,
};

const chauffeurSlice = createSlice({
  name: "chauffeurs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChauffeurs.fulfilled, (state, action) => {
      state.chauffeurs = action.payload;
    });
  },
});

export default chauffeurSlice.reducer;
