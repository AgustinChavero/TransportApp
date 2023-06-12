import { Passage, PassageToRegister, PassagePayload } from "@component/app/types/Passages";
import axiosInstance from "@component/services/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPassagesIdForPayment = createAsyncThunk<PassageToRegister[], PassagePayload[]>(
  "payment/getPassagesIdForPayment",
  async (passages: PassagePayload[]) => {
    const passagePromises = passages.map(async ({ passageId, quantity }) => {
      const response = await axiosInstance.get(`/passage/${passageId}`);
      const passageData: Passage = response.data;
      const passageToRegister: PassageToRegister = {
        ...passageData,
        quantity: quantity,
      };

      return passageToRegister;
    });

    return Promise.all(passagePromises);
  }
);
