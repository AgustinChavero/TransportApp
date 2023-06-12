import { createAsyncThunk } from "@reduxjs/toolkit";
import { Ticket } from "@component/app/types/Ticket";
import axiosInstance from "@component/services/axiosInstance";

export const getTicketsByUserId = createAsyncThunk<Ticket[], string>(
  "tickets/getTicketByUserId",
  async (userId: string) => {
    const response = await axiosInstance.get(`/ticket/user/${userId}?page=1&pageSize=1000`);
    return response.data.tickets;
  }
);

export const getTicketById = createAsyncThunk<Ticket, string>(
  "tickets/getTicketById",
  async (id: string) => {
    const response = await axiosInstance.get(`/ticket/${id}`);
    return response.data.ticket;
  }
);
