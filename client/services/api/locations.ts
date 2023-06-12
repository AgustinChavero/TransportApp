import axios from "axios";
import axiosInstance from "../axiosInstance";

const getLocations = async () => {
  const { data } = await axiosInstance.get("/passage/locations");
  return data.locations;
};
export default getLocations;
