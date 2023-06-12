import { createSlice, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { Travel } from "../../app/types/Travels";
import {
  getAllTravels,
  getTravelsById,
  getTravelsByQuery,
  getTravelsByUserId,
} from "./travelActions";

interface TravelState {
  allTravels: Travel[]; // change any[] to your specific type
  allTravelsByQuery: Travel[];
  travelById: { [key: string]: Travel | null };
  userTravels: Travel[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TravelState = {
  allTravels: [], // provide an empty array as the initial state value for allUsers
  allTravelsByQuery: [],
  travelById: {},
  userTravels: [],
  status: "idle",
  error: null,
};

const travelSlice = createSlice({
  name: "travels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state
      .addCase(getAllTravels.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getAllTravels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allTravels = action.payload;
      })
      // Handle the error state
      .addCase(getAllTravels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getTravelsById.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getTravelsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.travelById[action.payload.id] = action.payload;
      })
      // Handle the error state
      .addCase(getTravelsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getTravelsByQuery.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getTravelsByQuery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allTravelsByQuery = action.payload;
      })
      // Handle the error state
      .addCase(getTravelsByQuery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getTravelsByUserId.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getTravelsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userTravels = action.payload;
      })
      // Handle the error state
      .addCase(getTravelsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default travelSlice.reducer;
