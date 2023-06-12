import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getUserById,
  getUsersByCc,
  getUsersByEmail,
  getUsersByName,
  deleteUserById,
  enableUserById,
} from "./userActions";
import { User } from "../../app/types/User";
interface UserState {
  allUsers: User[];
  userByName: User[];
  userByCc: User | null;
  userByEmail: User | null;
  userById: { [key: string]: User | undefined };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null; // change any[] to your specific type
}

const initialState: UserState = {
  allUsers: [],
  userById: {},
  userByName: [],
  userByCc: null,
  userByEmail: null,
  status: "idle",
  error: null, // provide an empty array as the initial state value for allUsers
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allUsers = action.payload;
      })
      // Handle the error state
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userById[action.payload.id] = action.payload;
      })
      // Handle the error state
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getUsersByName.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getUsersByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userByName = action.payload;
      })
      // Handle the error state
      .addCase(getUsersByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getUsersByCc.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getUsersByCc.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userByCc = action.payload[0];
      })
      // Handle the error state
      .addCase(getUsersByCc.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getUsersByEmail.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getUsersByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userByEmail = action.payload[0];
      })
      // Handle the error state
      .addCase(getUsersByEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      .addCase(deleteUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userById[action.payload.id] = action.payload;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error al bannear usuario";
      });

    builder
      .addCase(enableUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(enableUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userById[action.payload.id] = action.payload;
      })
      .addCase(enableUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error al habilitar usuario";
      });
  },
});

export default userSlice.reducer;
