import { createSlice } from "@reduxjs/toolkit";
import { getAllNotificationsByUser } from "./notificationsActions";
import { Notifications } from "@component/app/types/Notifications";

interface NotificationsState {
  allNotifications: Notifications[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: NotificationsState = {
  allNotifications: [],
  status: "idle",
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotificationsByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllNotificationsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allNotifications = action.payload;
      })
      .addCase(getAllNotificationsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default notificationsSlice.reducer;
