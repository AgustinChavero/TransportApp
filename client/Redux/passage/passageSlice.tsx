import { createSlice } from "@reduxjs/toolkit";
import { getAllPassages, getPassagesByQuery, getPassagesId } from "./passageActions";
import { Passage } from "../../app/types/Passages";

interface PassageState {
  allPassages: Passage[];
  allPassagesByQuery: Passage[];
  passageById: Passage | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PassageState = {
  allPassages: [],
  allPassagesByQuery: [],
  passageById: null,
  status: "idle",
  error: null,
};

const passageSlice = createSlice({
  name: "passages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Handle the pending state
      .addCase(getAllPassages.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state

      .addCase(getAllPassages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPassages = action.payload;
      })

      // Handle the error state

      .addCase(getAllPassages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getPassagesId.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getPassagesId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.passageById = action.payload;
      })
      // Handle the error state

      .addCase(getPassagesId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getPassagesByQuery.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getPassagesByQuery.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPassagesByQuery = action.payload;
      })
      // Handle the error state

      .addCase(getPassagesByQuery.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default passageSlice.reducer;
