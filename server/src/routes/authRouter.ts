import express from 'express';
import {
  checkAdminSession,
  checkSession,
  checkCarSession,
  directAdminSession,
  joinUser,
  loginUser,
  logoutUser,
} from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /auth/checkSession:
 *   get:
 *     tags: [인증]
 *     summary: 유저 세션 확인
 *     description: 사용자 세션이 유효한지 확인합니다.
 *     responses:
 *       200:
 *         description: 유효한 세션
 *       401:
 *          description:  유효하지 않은 세션
 *
 */
router.get('/checkSession', checkSession);
/**
 * @swagger
 * /auth/checkAdminSession:
 *   get:
 *     tags: [인증]
 *     summary: 어드민 권한 확인
 *     description: 어드민 권한이 유효한지 확인합니다.
 *     responses:
 *       200:
 *         description: 유효한 어드민 권한
 *       401:
 *          description:  유효하지 않은 어드민 권한
 *
 */
router.get('/checkAdminSession', checkAdminSession);
router.get('/directAdminSession', directAdminSession);
router.get('/checkCarSession', checkCarSession);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [인증]
 *     summary: 사용자 로그인
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자 아이디
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 성공"
 *       400:
 *         description: 잘못된 요청 (아이디/비밀번호 누락)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "아이디나 비밀번호를 입력해주세요"
 *       401:
 *         description: 인증 실패 (비밀번호 불일치)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "비밀번호가 일치하지 않습니다."
 *       403:
 *         description: 승인되지 않은 계정
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "승인된 계정이 아닙니다."
 *       404:
 *         description: 존재하지 않는 사용자
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "존재하지 않는 사용자 입니다."
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [인증]
 *     summary: 사용자 로그아웃
 *     description: 사용자의 세션을 제거하고 로그아웃을 수행합니다.
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그아웃 성공"
 *       400:
 *         description: 잘못된 요청 (세션이 존재하지 않는 경우)
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "세션이 존재하지 않습니다" 
 */

router.post('/logout', logoutUser);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [인증]
 *     summary: 사용자 회원가입
 *     description: 새로운 사용자를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자 아이디
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입 성공"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "아이디나 비밀번호를 입력하세요"
 *       409:
 *         description: 리소스 충돌 (이미 존재하는 아이디)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "이미 존재하는 아이디입니다."
 *               
 */
router.post('/register', joinUser);

export default router;
