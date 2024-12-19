import express from 'express';
import {
  approveUser,
  deleteUser,
  getUsers,
  rejectUser,
  updateRoleUser,
} from '../controllers/userController';

const router = express.Router();


/**
 * @swagger
 * /api/users:
 *  get:
 *    tags: [사용자 관리]
 *    summary: 사용자 목록 조회
 *    description: 관리자 권한으로 전체 사용자 목록을 조회합니다.
 *    responses:
 *      200:
 *        description: 사용자 목록 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                users:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                        example: "507f1f77bcf86cd799439011"
 *                      userId:
 *                        type: string
 *                        example: "admin"
 *                      role:
 *                        type: number
 *                        description: "사용자 권한 (0: 미승인 사용자 1: 차량 운행일지 전용 유저 2: 일반 사용자, 3: 관리자)"
 *                        example: 0
 *      403:
 *        description: 권한 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "관리자 권한이 필요합니다."
 */

router.get('/', getUsers);

/**
 * @swagger
 * /api/users/{id}/approve:
 *  patch:
 *    tags: [사용자 관리]
 *    summary: 신규 회원 승인
 *    description: 관리자 권한으로 신규 가입한 회원(role 0)을 일반 회원(role 2)으로 승인합니다.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 승인할 회원 ID
 *        schema:
 *          type: string
 *          example: "507f1f77bcf86cd799439011"
 *    responses:
 *      200:
 *        description: 회원 승인 성공
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *               message:
 *                type: string
 *                example: "유저 승인 완료"
 *      400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "올바르지 않은 ID 형식입니다."
 *      403:
 *        description: 권한 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "관리자 권한이 필요합니다."
 *      404:
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "유저가 존재하지 않습니다."
 */

router.patch('/:id/approve', approveUser);

/**
 * @swagger
 * /api/users/{id}/reject:
 *  patch:
 *    tags: [사용자 관리]
 *    summary: 신규 회원 거절
 *    description: 관리자 권한으로 신규 가입한 회원을 거절합니다.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 거절할 회원 ID
 *        schema:
 *          type: string
 *          example: "507f1f77bcf86cd799439011"
 *    responses:
 *      200:
 *        description: 회원 거절 성공
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *               message:
 *                type: string
 *                example: "유저 거절 완료"
 *      400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "올바르지 않은 ID 형식입니다."
 *      403:
 *        description: 권한 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "관리자 권한이 필요합니다."
 *      404:
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "유저가 존재하지 않습니다."
 */

router.patch('/:id/reject', rejectUser);

/**
 * @swagger
 * /api/users/{id}/role:
 *  patch:
 *    tags: [사용자 관리]
 *    summary: 사용자 권한 수정
 *    description: 관리자가 사용자의 권한 레벨을 수정합니다.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 권한을 수정할 사용자 ID
 *        schema:
 *          type: string
 *          example: "507f1f77bcf86cd799439011"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required: true
 *              - role
 *            properties:
 *              role:
 *                type: number
 *                description: "사용자 권한 레벨 (0: 신규 회원, 2: 일반 회원, 3: 관리자)"
 *                example: 2
 *    responses:
 *      200:
 *        description: 권한 수정 성공
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *               message:
 *                type: string
 *                example: "유저 권한 수정 완료"
 *      400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "올바르지 않은 ID 형식입니다."
 *      403:
 *        description: 권한 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "관리자 권한이 필요합니다."
 *      404:
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "유저가 존재하지 않습니다."
 */

router.patch('/:id/role', updateRoleUser);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    tags: [사용자 관리]
 *    summary: 사용자 삭제
 *    description: 관리자가 특정 사용자를 삭제합니다.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 삭제할 사용자 ID
 *        schema:
 *          type: string
 *          example: "507f1f77bcf86cd799439011"
 *    responses:
 *      200:
 *        description: 사용자 삭제 성공
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *               message:
 *                type: string
 *                example: "유저 삭제 완료"
 *      400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "올바르지 않은 ID 형식입니다."
 *      403:
 *        description: 권한 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "관리자 권한이 필요합니다."
 *      404:
 *         description: 사용자를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 유저가 존재하지 않습니다."
 */

router.delete('/:id', deleteUser);

export default router;
