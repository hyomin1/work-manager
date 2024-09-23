import axiosApi from "./axios";
import { INames } from "./interfaces/interface";

export const getNames = async (): Promise<INames[]> => {
  const res = await axiosApi.get("/getName");
  console.log(res.data);
  return res.data.allNames;
};
export const getDestinations = async () => {
  const res = await axiosApi.get("/getDestination");
  return res.data.allDestinations;
};
export const getCars = async () => {
  const res = await axiosApi.get("/getCar");
  return res.data.allCars;
};
export const getStates = async () => {
  const res = await axiosApi.get("/getState");
  return res.data.states;
};
