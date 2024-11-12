import express from 'express';
import {
  approveUser,
  deleteUser,
  getUsers,
  rejectUser,
  updateRoleUser,
} from '../controllers/userController';

const router = express.Router();

router.get('/', getUsers);

router.patch('/:id/approve', approveUser);
router.patch('/:id/reject', rejectUser);
router.patch('/:id/role', updateRoleUser);

router.delete('/:id', deleteUser);

export default router;
