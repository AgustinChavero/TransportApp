import {
  createSlice,
  createAsyncThunk,
  AsyncThunkPayloadCreator,
  AsyncThunk,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {
  getAllDeliveries,
  getDeliveryById,
  getDeliveryByCc,
  getDeliveryByEmail,
  getDeliveryByName,
} from "./deliveryActions";
import { Distributor } from "../../app/types/Distributor";
import { AxiosResponse } from "axios";
interface DistributorState {
  allDeliveries: Distributor[];
  deliveryById: { [key: string]: Distributor | undefined };
  deliveryByName: Distributor[];
  deliveryByCc: Distributor | null;
  deliveryByEmail: Distributor | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null; // change any[] to your specific type
}

const initialState: DistributorState = {
  allDeliveries: [],
  deliveryById: {},
  deliveryByName: [],
  deliveryByCc: null,
  deliveryByEmail: null,
  status: "idle",
  error: null, // provide an empty array as the initial state value for allUsers
};

type ResponseTypeAll = AxiosResponse<Distributor[], any>;
type ResponseTypeId = AxiosResponse<Distributor, any>;

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle the pending state
      .addCase(getAllDeliveries.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getAllDeliveries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDeliveries = action.payload;
      })
      // Handle the error state
      .addCase(getAllDeliveries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getDeliveryById.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getDeliveryById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deliveryById[action.payload.id] = action.payload;
      })
      // Handle the error state
      .addCase(getDeliveryById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getDeliveryByName.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getDeliveryByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deliveryByName = action.payload;
      })
      // Handle the error state
      .addCase(getDeliveryByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getDeliveryByCc.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getDeliveryByCc.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deliveryByCc = action.payload[0];
      })
      // Handle the error state
      .addCase(getDeliveryByCc.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });

    builder
      // Handle the pending state
      .addCase(getDeliveryByEmail.pending, (state) => {
        state.status = "loading";
      })
      // Handle the success state
      .addCase(getDeliveryByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.deliveryByEmail = action.payload[0];
      })
      // Handle the error state
      .addCase(getDeliveryByEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export default deliverySlice.reducer;
