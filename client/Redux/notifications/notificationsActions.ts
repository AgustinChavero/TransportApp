import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notifications } from "@component/app/types/Notifications";
import axiosInstance from "@component/services/axiosInstance";

export const getAllNotificationsByUser = createAsyncThunk<Notifications[], string>(
  "notifications/getAllNotificationsByUser",
  async (userId) => {
    const response = await axiosInstance.get(`/notifications/user/${userId}`);
    return response.data.notifications;
  }
);
