import { Request, Response } from 'express';
import User from '../models/employee/User';

const checkAdmin = (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  checkAdmin(req, res);
  try {
    const users = await User.find(
      {},
      {
        _id: 1,
        userId: 1,
        role: 1,
      }
    );
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const approveUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  checkAdmin(req, res);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { role: 2 },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: '유저가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '유저 승인 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const rejectUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  checkAdmin(req, res);
  try {
    const deletedUser = await User.deleteOne({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ error: '유저가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '유저 삭제 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  checkAdmin(req, res);

  try {
    const deletedUser = await User.deleteOne({ _id: id });
    if (!deletedUser) {
      return res
        .status(404)
        .json({ error: '삭제할 유저가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '유저 삭제 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const updateRoleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  checkAdmin(req, res);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: '유저가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '유저 권한 수정 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
