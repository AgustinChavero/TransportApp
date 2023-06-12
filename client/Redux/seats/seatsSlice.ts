// seatsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SeatsState {
  seatEnabled: boolean[];
}

const initialState: SeatsState = {
  seatEnabled: [],
};

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    updateSeatEnabled(state, action: PayloadAction<boolean[]>) {
      console.log("slice - Updated Seats:", action.payload); // Log updated seats
      state.seatEnabled = action.payload;
    },
    saveSeatEnabled(state, action: PayloadAction<{ seatIndex: number; enabled: boolean }>) {
      console.log("slice - Saved Seat:", action.payload); // Log saved seat
      state.seatEnabled[action.payload.seatIndex] = action.payload.enabled;
    },
  },
});

export const { updateSeatEnabled, saveSeatEnabled } = seatsSlice.actions;

export default seatsSlice.reducer;
