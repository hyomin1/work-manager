import express from 'express';
import {
  checkAdminSession,
  checkSession,
  directAdminSession,
  joinUser,
  loginUser,
  logoutUser,
} from '../controllers/authController';

const router = express.Router();

router.get('/checkSession', checkSession);
router.get('/checkAdminSession', checkAdminSession);
router.get('/directAdminSession', directAdminSession);

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/register', joinUser);

export default router;
