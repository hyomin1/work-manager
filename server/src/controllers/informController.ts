// 이름, 차량, 행선지, 상태 추가 삭제 제어
import { Request, Response } from "express";
import Name from "../models/Name";
import Destination from "../models/Destination";
import State from "../models/State";
import Car from "../models/Car";

//이름

export const addName = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    await Name.create({ username });
    res.status(200).json({ message: "이름 추가 성공" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
    return;
  }
};

export const removeName = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Name.deleteOne({ _id: id });
    res.status(200).json({ message: "이름 삭제 성공" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
    return;
  }
};

export const getName = async (req: Request, res: Response) => {
  try {
    const allNames = await Name.find({}, { username: 1 });

    res.status(200).json({ allNames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
    return;
  }
};

// 행선지

export const addDestination = async (req: Request, res: Response) => {
  try {
    const { destination } = req.body;
    await Destination.create({ destination });
    res.status(200).json({ message: "목적지 추가 성공" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
    return;
  }
};

export const removeDestination = async (req: Request, res: Response) => {};

export const getDestination = async (req: Request, res: Response) => {
  try {
    const allDestinations = await Destination.find(
      {},
      { destination: 1, _id: 0 }
    );

    res
      .status(200)
      .json({ message: "행선지 조회 성공", data: allDestinations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
    return;
  }
};

// 상태
export const addStatus = async (req: Request, res: Response) => {
  try {
    const { state } = req.body;
    await State.create({ state });
    res.status(200).json({ message: "상태 추가 성공" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
    return;
  }
};

export const removeStatus = async (req: Request, res: Response) => {};

export const getStatus = async (req: Request, res: Response) => {
  try {
    const allStates = await State.find({}, { state: 1, _id: 0 });

    res.status(200).json({ allStates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
    return;
  }
};

export const addCar = async (req: Request, res: Response) => {
  try {
    const { car } = req.body;
    await Car.create({ car });
    res.status(200).json({ message: "차량 추가 성공" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
    return;
  }
};

export const removeCar = async (req: Request, res: Response) => {};

export const getCar = async (req: Request, res: Response) => {
  try {
    const allCars = await Car.find({}, { state: 1, _id: 0 });

    res.status(200).json({ allCars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버 에러" });
    return;
  }
};
