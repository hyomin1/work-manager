import { Request, Response } from 'express';
import DailyWork from '../models/employee/DailyWork';
import User from '../models/employee/User';
import { Types } from 'mongoose';

const checkSession = (req: Request, res: Response) => {
  if (req.session.userId === '674eaf794953171256d2e902') {
    return true;
  }
  // 일반 유저 체크
  if (!req.session.isUser || req.session.isCar) {
    res.status(403).json({ type: 'not User', error: '다시 로그인 해주세요' });
    return false;
  }

  return true;
};
export const getDailyWork = async (req: Request, res: Response) => {
  if (!checkSession(req, res)) return;
  const { id } = req.params;

  try {
    const data = await DailyWork.findById(id);

    if (!data) {
      return res
        .status(400)
        .json({ error: '일일업무 현황이 올바르지 않습니다.' });
    }
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(400).json({ error: '유저 정보가 올바르지 않습니다.' });
    }
    const dailyWorkDoc = data.toObject();
    const dailyWork = {
      ...dailyWorkDoc,
      isOwner:
        dailyWorkDoc.writerId.toString() === req.session.userId ||
        user.role === 3,
    };
    return res.status(200).json({ dailyWork });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getDailyWorks = async (req: Request, res: Response) => {
  if (!checkSession(req, res)) return;
  try {
    const dateParam = req.query.date as string;
    const kstDate = new Date(dateParam);

    const utcDate = new Date(kstDate.getTime() - 9 * 60 * 60 * 1000);

    const startOfDay = new Date(utcDate).setHours(0, 0, 0, 0);
    const endOfDay = new Date(utcDate).setHours(23, 59, 59, 999);

    const dailyWorks = await DailyWork.find(
      {
        writingDate: { $gte: startOfDay, $lte: endOfDay },
      },
      {
        username: 1,
        department: 1,
        content: 1,
        nextContent: 1,
        writerId: 1,
      }
    );
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(400).json({ error: '유저 정보가 올바르지 않습니다.' });
    }
    const allDailyWorks = dailyWorks.map((dailyWork) => {
      return {
        ...dailyWork.toObject(),
        isOwner:
          dailyWork.writerId.toString() === req.session.userId ||
          user.role === 3,
      };
    });
    return res.status(200).json({ allDailyWorks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const addDailyWork = async (req: Request, res: Response) => {
  if (!checkSession(req, res)) return;
  const {  username, department, content, nextContent } = req.body;
  try {
    if (!username || !department || !content || !nextContent) {
      return res.status(400).json({ error: '내용을 입력해주세요' });
    }
    const data = {
      ...req.body,
      writerId: req.session.userId,
    };
    await DailyWork.create(data);
    return res.status(201).json({ message: '작성 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const editDailyWork = async (req: Request, res: Response) => {
  if (!checkSession(req, res)) return;
  const { _id, username, department, content, nextContent } = req.body;

  try {
    if (!username || !department || !content || !nextContent) {
      return res.status(400).json({ error: '필수 입력값이 누락되었습니다' });
    }
    const editDailyWork = await DailyWork.findByIdAndUpdate(
      _id,
      {
        username,
        department,
        content,
        nextContent,
      },
      {
        new: true,
      }
    );
    if (!editDailyWork) {
      return res.status(404).json({ error: '정보를 찾을 수 없습니다.' });
    }
    return res.status(200).json({ message: '정보 수정 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const removeDailyWork = async (req: Request, res: Response) => {
  if (!checkSession(req, res)) return;
  const { id } = req.params;
  //if (!Types.ObjectId.isValid(id)) {
  //  return res.status(400).json({ error: '올바르지 않은 ID 형식입니다.' });
  // }
  try {
    const deletedDailyWork = await DailyWork.deleteOne({ _id: id });
    if (!deletedDailyWork) {
      return res
        .status(404)
        .json({ error: '삭제할 정보가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '삭제 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
