import { Request, Response } from "express";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";

/* 관리자 계정 넣는 용(테스트 용) */
export const joinAdmin = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res
      .status(400)
      .json({ message: "아이디나 비밀번호를 입력해주세요" });
  }
  try {
    const existingUser = await Admin.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ error: "이미 존재하는 아이디입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await Admin.create({ userId, password: hashedPassword });

    return res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러" });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    return res.status(400).json({ error: "아이디나 비밀번호를 입력해주세요" });
  }
  try {
    const admin = await Admin.findOne({ userId });
    if (!admin) {
      return res.status(404).json({ error: "존재하지 않는 아이디입니다." });
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "비밀번호가 일치하지 않습니다." });
    }
    req.session.isAdmin = true;
    return res.json({ message: "로그인 성공" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러" });
  }
};
