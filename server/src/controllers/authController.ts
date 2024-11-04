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
      return res.status(400).json({ error: '이미 존재하는 아이디입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ userId, password: hashedPassword, role: 'user' });
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
      return res.status(404).json({ error: '존재하지 않는 아이디입니다.' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }
    req.session.isUser = true;
    req.session.userId = user._id.toString();

    // 관리자 권한 유저 처음 로그인시 관리자 권한 부여
    if (user.role === 'admin') {
      req.session.isAdmin = true;
    }

    return res.status(201).json({ message: '로그인 성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: '서버 에러' });
      }
      res.clearCookie('connect.sid'); // 세션 쿠키 삭제
      return res.status(200).json({ message: '로그아웃 성공' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const checkSession = async (req: Request, res: Response) => {
  if (req.session.isUser) {
    return res.status(200).json();
  }
};

export const checkAdminSession = async (req: Request, res: Response) => {
  if (req.session.isAdmin) {
    return res.status(200).json();
  } else {
    return res.status(403).json({
      error: '관리자 권한이 없습니다.',
      type: 'not granted admin',
    });
  }
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
