import { Request, Response } from "express";
import DrivingRecord from "../models/driving/DrivingRecord";
import Etc from "../models/driving/Etc";

export const addEtcName = async (req: Request, res: Response) => {
  const { etcName } = req.body;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "관리자 권한이 필요합니다." });
  }
  try {
    await Etc.create({ etcName });
    return res.status(200).json({ message: "차량 추가 성공" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러" });
  }
};

export const removeEtcName = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "관리자 권한이 필요합니다." });
  }
  try {
    const deletedEtc = await Etc.deleteOne({ _id: id });
    if (!deletedEtc) {
      return res
        .status(404)
        .json({ error: "삭제할 기타 비용이 존재하지 않습니다." });
    }
    return res.status(200).json({ message: "삭제 성공" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러" });
  }
};
export const editEtcName = async (req: Request, res: Response) => {
  const { id, etcName } = req.body;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "관리자 권한이 필요합니다." });
  }
  try {
    const editEtcName = await Etc.findByIdAndUpdate(
      id,
      { etcName },
      { new: true }
    );
    if (!editEtcName) {
      return res
        .status(404)
        .json({ error: "수정할 비용이 존재하지 않습니다." });
    }
    return res.status(200).json({ message: "비용 수정 완료" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러" });
  }
};

export const getEtcName = async (req: Request, res: Response) => {
  try {
    const allEtcNames = await Etc.find({}, { etcName: 1 });
    return res.status(200).json({ allEtcNames });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러" });
  }
};

export const addInform = async (req: Request, res: Response) => {
  const { username, car, drivingDestination, startKM, endKM } = req.body;
  try {
    if (!username || !car || !drivingDestination || !startKM || !endKM) {
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
    let { year, month, car } = req.query;

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
        startKM: 1,
        endKM: 1,
        totalKM: 1,
        createdAt: 1,
        fuelCost: 1,
        toll: 1,
        etc: 1,
      }
    );

    return res.status(200).json({ allDrivingInforms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러dd" });
  }
};
