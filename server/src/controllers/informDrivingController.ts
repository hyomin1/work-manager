import { start } from "repl";
import { Request, Response } from "express";
import DrivingRecord from "../models/driving/DrivingRecord";

export const addInform = async (req: Request, res: Response) => {
  const {
    username,
    car,
    drivingDestination,
    startTime,
    endTime,
    startKM,
    endKM,
  } = req.body;
  try {
    if (
      !username ||
      !car ||
      !drivingDestination ||
      !startTime ||
      !endTime ||
      !startKM ||
      !endKM
    ) {
      return res.status(400).json({ error: "정보를 입력해야 합니다." });
    }
    const data = {
      ...req.body,
      totalKM: endKM - startKM,
    };
    await DrivingRecord.create(data);
    return res.status(200).json({ message: "정보 입력 완료" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러" });
  }
};

export const getInform = async (req: Request, res: Response) => {
  if (!req.session.isUser) {
    return res
      .status(403)
      .json({ type: "not User", error: "다시 로그인 해주세요" });
  }

  try {
    let { year, month, car, date } = req.query;

    // year, month 로컬 데이터

    const IYear: number = Number(year);
    const IMonth: number = Number(month);
    const startDate = new Date(IYear, IMonth - 1); // UTC 기준 해당 달의 시작일
    const endDate = new Date(IYear, IMonth, 0, 23, 59, 59, 999); // UTC 기준 해당 달의 마지막 일

    const allDrivingInforms = await DrivingRecord.find(
      {
        createdAt: { $gte: startDate, $lt: endDate },
        car,
      },
      {
        username: 1,
        drivingDestination: 1,
        startTime: 1,
        endTime: 1,
        startKM: 1,
        endKM: 1,
        totalKM: 1,
        createdAt: 1,
        fuelCost: 1,
        toll: 1,
      }
    );

    return res.status(200).json({ allDrivingInforms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러" });
  }
};
