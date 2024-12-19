import { Request, Response } from 'express';
import User from '../models/employee/User';
import { Types } from 'mongoose';

const checkAdmin = (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    res.status(403).json({ error: '관리자 권한이 필요합니다.' });
    return false;
  }
  return true;
};

export const getUsers = async (req: Request, res: Response) => {
  if (!checkAdmin(req, res)) return;
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
  if (!checkAdmin(req, res)) return;
  const { id } = req.params;
   //if (!Types.ObjectId.isValid(id)) {
   //   return res.status(400).json({ error: '올바르지 않은 ID 형식입니다.' });
   // }
  
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
  if (!checkAdmin(req, res)) return;
  const { id } = req.params;
  //if (!Types.ObjectId.isValid(id)) {
  //  return res.status(400).json({ error: '올바르지 않은 ID 형식입니다.' });
 // }
  
  try {
    const deletedUser = await User.deleteOne({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ error: '유저가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '유저 거절 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  if (!checkAdmin(req, res)) return;
  
  const { id } = req.params;

  //if (!Types.ObjectId.isValid(id)) {
  //  return res.status(400).json({ error: '올바르지 않은 ID 형식입니다.' });
  //}
  

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
  if (!checkAdmin(req, res)) return;
  
  const { id } = req.params;
  //if (!Types.ObjectId.isValid(id)) {
  //  return res.status(400).json({ error: '올바르지 않은 ID 형식입니다.' });
  //}
  const { role } = req.body;
  if (![0, 1, 2, 3].includes(role)) {
    return res.status(400).json({ error: '올바르지 않은 권한 레벨입니다.' });
  }
  
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
