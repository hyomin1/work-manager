import express from 'express';
import {
  addDailyWork,
  editDailyWork,
  getDailyWork,
  getDailyWorks,
  removeDailyWork,
} from '../controllers/dailyWorkController';

const router = express.Router();

/**
* @swagger
* /api/employee-inform/dailyWork:
*   get:
*     tags: [일일 업무]
*     summary: 일일업무 목록 조회
*     description: 특정 날짜의 모든 일일업무 목록을 조회합니다.
*     parameters:
*       - in: query
*         name: date
*         required: true
*         description: 조회할 날짜 (YYYY-MM-DD)
*         schema:
*           type: string
*           example: "2024-03-19"
*     responses:
*       200:
*         description: 일일업무 목록 조회 성공
*         content:
*           application/json:
*             schema:
*               properties:
*                 allDailyWorks:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       _id:
*                         type: string
*                         example: "507f1f77bcf86cd799439011"
*                       username:
*                         type: string
*                         example: "이효민"
*                       department:
*                         type: string
*                         example: "서버"
*                       content:
*                         type: string
*                         example: "1. 현황판 서비스 기능 수정..."
*                       nextContent:
*                         type: string
*                         example: "1. 현황판 매뉴얼 작성 예정..."
*                       writerId:
*                         type: string
*                         example: "507f1f77bcf86cd799439011"
*                       isOwner:
*                         type: boolean
*                         example: true
*                         description: "작성자 본인이거나 관리자인 경우 true"
*       400:
*         description: 잘못된 요청
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "유저 정보가 올바르지 않습니다."
*       401:
*         description: 인증되지 않은 요청
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "로그인이 필요합니다."
*       500:
*         description: 서버 에러
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "서버 에러"
*/

router.get('/', getDailyWorks);

/**
* @swagger
* /api/employee-inform/dailyWork/{id}:
*   get:
*     tags: [일일 업무]
*     summary: 일일업무 상세 조회
*     description: 특정 일일업무의 상세 정보를 조회합니다.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: 일일업무 ID
*         schema:
*           type: string
*           example: "507f1f77bcf86cd799439011"
*     responses:
*       200:
*         description: 일일업무 조회 성공
*         content:
*           application/json:
*             schema:
*               properties:
*                 dailyWork:
*                   type: object
*                   properties:
*                     _id:
*                       type: string
*                       example: "507f1f77bcf86cd799439011"
*                     username:
*                       type: string
*                       example: "이효민"
*                     department:
*                       type: string
*                       example: "서버"
*                     content:
*                       type: string
*                       example: "1. 현황판 서비스 기능 수정..."
*                     nextContent:
*                       type: string
*                       example: "1. 현황판 매뉴얼 작성 예정..."
*                     writerId:
*                       type: string
*                       example: "507f1f77bcf86cd799439011"
*                     writingDate:
*                       type: string
*                       format: date-time
*                       example: "2024-03-19T09:00:00.000Z"
*                     isOwner:
*                       type: boolean
*                       example: true
*                       description: "작성자 본인이거나 관리자인 경우 true"
*       400:
*         description: 잘못된 요청
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   examples:
*                     invalidWork:
*                       value: "일일업무 현황이 올바르지 않습니다."
*                     invalidUser:
*                       value: "유저 정보가 올바르지 않습니다."
*/
router.get('/:id', getDailyWork);

/**
 * @swagger
 * /api/employee-inform/dailyWork/add:
 *  post:
 *    tags: [일일 업무]
 *    summary: 일일업무 작성
 *    description: 새로운 일일업무를 작성합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - writingDate
 *              - username
 *              - department
 *              - content
 *              - nextContent
 *            properties:
 *              writingDate:
 *                type: string
 *                format: date-time
 *                example: "2024-03-19T09:00:00.000Z"
 *              username:
 *                type: string
 *                example: "이효민"
 *              department:
 *                type: string
 *                example: "서버"
 *              content:
 *                type: string
 *                example: "1. 현황판 서비스 기능 수정..."
 *              nextContent:
 *                type: string
 *                example: "1. 현황판 매뉴얼 작성 예정..."
 *    responses:
 *      201:
 *        description: 일일업무 작성 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "작성 완료"
 *      400:
 *        description: 잘못된 요청
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "내용을 입력해주세요"
 */

router.post('/add', addDailyWork);

/**
 * @swagger
 * /api/employee-inform/dailyWork/edit:
 *  put:
 *    tags: [일일 업무]
 *    summary: 일일업무 수정
 *    description: 일일업무를 수정합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - _id
 *              - username
 *              - department
 *              - content
 *              - nextContent
 *            properties:
 *              _id:
 *                type: string
 *                example: "507f1f77bcf86cd799439011"
 *              username:
 *                type: string
 *                example: "이효민"
 *              department:
 *                type: string
 *                example: "서버"
 *              content:
 *                type: string
 *                example: "1. 현황판 서비스 기능 수정..."
 *              nextContent:
 *                type: string
 *                example: "1. 현황판 매뉴얼 작성 예정..."
 *    responses:
 *      200:
 *        description: 일일업무 수정 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "정보 수정 완료"
 *      400:
 *        description: 잘못된 요청
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "필수 입력값이 누락되었습니다."
 *      404:
 *        description: 일일업무를 찾을 수 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "정보를 찾을 수 없습니다."
 */

router.put('/edit', editDailyWork);

/**
 * @swagger
 * /api/employee-inform/dailyWork/remove/{id}:
 *  delete:
 *    tags: [일일 업무]
 *    summary: 일일업무 삭제
 *    description: 일일업무를 삭제합니다.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 삭제할 일일업무 ID
 *        schema:
 *          type: string
 *          example: "507f1f77bcf86cd799439011"
 *    responses:
 *      200:
 *        description: 일일업무 삭제 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "삭제 완료"
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
 *      404:
 *        description: 삭제할 일일업무를 찾을 수 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "삭제할 정보가 존재하지 않습니다."
 */


router.delete('/remove/:id', removeDailyWork);

export default router;
