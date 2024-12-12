import { Request, Response } from 'express';
import EmployeeInform from '../models/employee/EmployeeInform';
import { ObjectId } from 'mongodb';

const checkSession = (req: Request, res: Response) => {
  // 모니터링 계정 체크를 먼저
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

export const getSchedule = async (req: Request, res: Response) => {
  if (!checkSession(req, res)) return;
  const { userId } = req.session;
  const { year, month, username } = req.query;

  try {
    const IYear: number = Number(year);
    const IMonth: number = Number(month);

    const prevMonth = IMonth === 1 ? 12 : IMonth - 1;
    const prevYear = IMonth === 1 ? IYear - 1 : IYear;

    const nextMonth = IMonth === 12 ? 1 : IMonth + 1;
    const nextYear = IMonth === 12 ? IYear + 1 : IYear;

    const startPrevMonth = new Date(
      Date.UTC(prevYear, prevMonth - 1, 1, 0, 0, 0)
    );
    const endNextMonth = new Date(
      Date.UTC(nextYear, nextMonth - 1, 31, 23, 59, 59)
    );
    if (username !== 'null') {
      const schedules = await EmployeeInform.find({
        username,
        $or: [
          {
            startDate: {
              $gte: startPrevMonth,
              $lte: endNextMonth,
            },
          },
          {
            endDate: {
              $gte: startPrevMonth,
              $lte: endNextMonth,
            },
          },
        ],
      });
      return res.status(200).json({ schedules });
    }

    const schedules = await EmployeeInform.find({
      writerId: new ObjectId(userId),
      $or: [
        {
          startDate: {
            $gte: startPrevMonth,
            $lte: endNextMonth,
          },
        },
        {
          endDate: {
            $gte: startPrevMonth,
            $lte: endNextMonth,
          },
        },
      ],
    });

    return res.status(200).json({ schedules });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
