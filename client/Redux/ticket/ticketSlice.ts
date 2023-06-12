import { createSlice } from "@reduxjs/toolkit";
import { getTicketById, getTicketsByUserId } from "./ticketActions";
import { Ticket } from "@component/app/types/Ticket";

interface TicketState {
  allTickets: Ticket[];
  ticketById: Ticket | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TicketState = {
  allTickets: [],
  ticketById: null,
  status: "idle",
  error: null,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,

  reducers: {
    updateReviewSent: (state, { type, payload }) => {
      state.allTickets = state.allTickets.map((t) =>
        t.id === payload ? { ...t, reviewSent: false } : t
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTicketsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allTickets = action.payload;
      })
      .addCase(getTicketsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    builder
      .addCase(getTicketById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTicketById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ticketById = action.payload;
      })
      .addCase(getTicketById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default ticketSlice.reducer;
export const { updateReviewSent } = ticketSlice.actions;
