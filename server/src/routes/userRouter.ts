import express from 'express';
import {
  approveUser,
  deleteUser,
  getUsers,
  rejectUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);

router.patch('/:id/approve', approveUser);
router.patch('/:id/reject', rejectUser);

router.delete('/:id', deleteUser);

export default router;
