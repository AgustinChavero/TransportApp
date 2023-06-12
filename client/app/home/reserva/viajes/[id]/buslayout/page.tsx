"use client";
import { RootState } from "@component/Redux/store/store";
import SeatManagementClient from "@component/components/SeatManagementClient.tsx/SeatManagementClient";
import { useSelector } from "react-redux";

export default function Buslayout() {
  const passage = useSelector((state: RootState) => state.passage.passageById);
  return <SeatManagementClient enabledSeats={passage} />;
}
