import express from 'express';
import { getSchedule } from '../controllers/scheduleController';

const router = express.Router();

/** 
 * @swagger
 * /api/schedule/getSchedule:
 *   get:
 *     tags: [일정]
 *     summary: 일정 조회
 *     description: 특정 연월의 일정을 조회합니다. 특정 인원 또는 본인의 일정을 확인할 수 있습니다. 
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *           example: 2024
 *         description: 조회할 연도
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: number
 *           example: 3
 *         description: 조회할 월(1~12)
 *       - in: query
 *         name: username
 *         required: false
 *         schema:
 *           type: string
 *           example: "이효민"
 *         description: 조회할 인원 이름 (null 이면 본인 일정 조회) 
 *     responses:
 *       200:
 *         description: 일정 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 schedules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 근무 현황 ID
 *                       username: 
 *                         type: string
 *                         description: 이름
 *                       destination:
 *                         type: string
 *                         description: 방문지
 *                       business:
 *                         type: string
 *                         description: 사업명
 *                       work:
 *                         type: string
 *                         description: 업무
 *                       isDaily:
 *                         type: number
 *                         description: 근무 날짜 체크용 (오늘 / 다른날/ 기간 업무)
 *                       writerId:
 *                         type: string
 *                         description: 작성자 ID
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         description: 근무 시작 날짜
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         description: 근무 종료 날짜
 *                       car:
 *                         type: string
 *                         description: 차량 정보
 *                       remarks:
 *                         type: string
 *                         description: 비고
 */

router.get('/getSchedule', getSchedule);

export default router;
