import { createSlice } from "@reduxjs/toolkit";
import { getAllVehicles, getVehicleById, getVehicleByQuery } from "./vehicleActions";
import { Vehicle } from "@component/app/types/Vehicle";

interface VehicleState {
  allVehicles: Vehicle[] | null;
  allVehiclesByQuery: Vehicle[] | null;
  vehicleById: Vehicle | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: VehicleState = {
  allVehicles: [],
  allVehiclesByQuery: [],
  vehicleById: null,
  status: "idle",
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllVehicles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allVehicles = action.payload;
      })
      .addCase(getAllVehicles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
    builder
      .addCase(getVehicleById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVehicleById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vehicleById = action.payload;
      })
      .addCase(getVehicleById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
    builder
      .addCase(getVehicleByQuery.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVehicleByQuery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allVehiclesByQuery = action.payload;
      })
      .addCase(getVehicleByQuery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default vehicleSlice.reducer;
