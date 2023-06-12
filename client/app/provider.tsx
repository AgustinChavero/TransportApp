"use client";
import { Provider } from "react-redux";
import { store } from "../Redux/store/store";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
