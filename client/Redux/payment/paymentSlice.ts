import { Passage } from "@component/app/types/Passages";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPassagesIdForPayment } from "./paymentActions";
import { PassengerFormData } from "@component/app/types/Passenger";

interface PassageState {
  passengerData: PassengerFormData[];
  payment: Passage[];
  count: number;
  passageById: Passage[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PassageState = {
  passengerData: [],
  payment: [],
  count: 0,
  passageById: [],
  status: "idle",
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    savePassengerData: (state, action: PayloadAction<PassengerFormData[]>) => {
      state.passengerData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the pending state
      .addCase(getPassagesIdForPayment.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getPassagesIdForPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.passageById = action.payload;
      })
      // Handle the error state
      .addCase(getPassagesIdForPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});
export const { savePassengerData } = paymentSlice.actions;

export default paymentSlice.reducer;
