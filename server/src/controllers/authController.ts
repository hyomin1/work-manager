import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/employee/User';

export const joinUser = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ error: '아이디나 비밀번호를 입력하세요.' });
  }
  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ error: '이미 존재하는 아이디입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ userId, password: hashedPassword, role: 0 });
    return res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ error: '아이디나 비밀번호를 입력해주세요' });
  }
  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(401).json({ error: '존재하지 않는 아이디입니다.' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }
    if (user.role < 1) {
      return res.status(403).json({ error: '승인된 계정이 아닙니다.' });
    }

    req.session.isUser = true;
    if (user.role === 1) {
      req.session.isCar = true;
    }

    req.session.userId = user._id.toString();

    if (user.role === 3) {
      req.session.isAdmin = true;
    }
    if (user.id === '674eaf794953171256d2e902') {
      req.session.cookie.maxAge = 31557600000000; // 세션 최대 2년 유지
    }

    return res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    if (!req.session) {
      return res.status(400).json({ error: '세션이 존재하지 않습니다' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: '서버 에러' });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: '로그아웃 성공' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const checkSession = async (req: Request, res: Response) => {
  if (req.session.isUser) {
    return res.status(200).json({});
  }
};

export const checkAdminSession = async (req: Request, res: Response) => {
  if (req.session.isAdmin) {
    return res.status(200).json();
  }
  return res.status(403).json({
    error: '관리자 권한이 없습니다.',
    type: 'not granted admin',
  });
};

export const checkCarSession = async (req: Request, res: Response) => {
  if (req.session.isCar) {
    return res.status(200).json({ isUser: false });
  }
  return res.status(200).json({ isUser: true });
};

export const directAdminSession = async (req: Request, res: Response) => {
  if (req.session.isAdmin) {
    return res.status(200).json();
  } else {
    return res.status(403).json({
      error: '관리자 권한이 없습니다.',
      type: 'not admin',
    });
  }
};
