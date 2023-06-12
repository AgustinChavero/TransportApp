import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";
import travelReducer from "../travel/travelSlice";
import passageReducer from "../passage/passageSlice";
import deliveryReducer from "../delivery/deliverySlice";
import chauffeurReducer from "../chauffeur/chauffeurSlice";
import notificationsReducer from "../notifications/notificationsSlice";
import vehicleReducer from "../vehicle/vehicleSlice";
import ticketReducer from "../ticket/ticketSlice";
import paymentReducer from "../payment/paymentSlice";
import companyReducer from "../company/companySlice";
import seatsReducer from "../seats/seatsSlice";


export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      travel: travelReducer,
      passage: passageReducer,
      ticket: ticketReducer,
      delivery: deliveryReducer,
      chauffeur: chauffeurReducer,
      vehicle: vehicleReducer,
      notifications: notificationsReducer,
      payment: paymentReducer,
      companies: companyReducer,
      seats: seatsReducer,


    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
