import { Request, Response } from 'express';

export const getSchedule = (req: Request, res: Response) => {
  const { userId } = req.session;
  if (!userId) {
    return res.status(401).json({ error: '다시 로그인 해주세요' });
  }
  try {
    return res.status(200).json({ message: '성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
