import express from 'express';
import {
  addInform,
  addNotification,
  addService,
  editInform,
  editService,
  getInform,
  getNotification,
  getService,
  removeInform,
  removeNotification,
  removeService,
} from '../controllers/informDrivingController';

const router = express.Router();

/**
 * @swagger
 * /api/driving-inform/getInform:
 *  get:
 *    tags: [차량 운행일지] 
 *    summary: 월별 차량 운행기록 조회
 *    description: 특정 연도와 월에 해당하는 차량의 운전 기록을 조회합니다.
 *    parameters:
 *      - in: query
 *        name: year
 *        required: true
 *        schema:
 *          type: number
 *          example: 2024 
 *        description: 조회할 연도
 *      - in: query
 *        name: month
 *        required: true
 *        description: 조회할 월 (1~12)
 *        schema:
 *          type: number
 *          example: 3
 *      - in: query
 *        name: car
 *        required: true
 *        description: 차량 식별자
 *        schema:
 *          type: string
 *          example: "507f1f77bcf86cd799439011"
 *    responses:
 *      200:
 *        description: 차량 운행일지 조회 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                allDrivingInforms:
 *                  type: array
 *                  items: 
 *                    type: object
 *                    properties:
 *                     _id:
 *                      type: string
 *                      description: 차량 운행일지 식별자
 *                     driveDay:
 *                       type: string
 *                       format: date-time
 *                       description: 운행 일자
 *                     username:
 *                       type: string
 *                       description: 운전자
 *                     drivingDestination:
 *                       type: string
 *                       description: 행선지
 *                     startKM:
 *                       type: number
 *                       description: 출발(Km)
 *                     endKM:
 *                       type: number
 *                       description: 도착(Km)   
 *                     fuelCost:
 *                       type: number
 *                       description: 주유비
 *                     toll:
 *                       type: number
 *                       description: 하이패스
 *                     etc:
 *                       type: object
 *                       description: 기타 비용 정보
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: 기타 비용 항목
 *                         cost:
 *                           type: number
 *                           description: 기타 비용 금액
 *                     isOwner:
 *                       type: string
 *                       description: 작성자이거나 관리자     
 *      400:
 *        description: 잘못된 요청
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "유저 정보가 올바르지 않습니다."           
 */

router.get('/getInform', getInform);

/**
 * @swagger
 * /api/driving-inform/addInform:
 *  post:
 *    tags: [차량 운행일지] 
 *    summary:  차량 운행일지 등록
 *    description: 새로운 차량 운행 일지를 등록합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - driveDay
 *              - username
 *              - car
 *              - drivingDestination
 *              - startKM
 *              - endKM
 *            properties:
 *              driveDay:
 *                type: string
 *                format: date-time
 *                description: 운행 일자
 *              username:
 *                type: string
 *                description: 운전자
 *              car:
 *                type: string
 *                description: 차량 ID
 *                example: "507f1f77bcf86cd799439011"
 *              drivingDestination:
 *                type: string
 *                description: 행선지
 *              startKM:
 *                type: number
 *                description: 출발(Km)
 *              endKM:
 *                type: number
 *                description: 도착(Km)
 *              fuelCost:
 *                type: number
 *                description: 주유비
 *              toll:
 *                type: number
 *                description: 하이패스
 *              etc:
 *                type: object
 *                description: 기타 비용
 *                properties:
 *                  name:
 *                    type: string
 *                    description: 기타 비용 항목
 *                  cost:
 *                    type: string
 *                    description: 기타 비용 금액
 *    responses:
 *      201:
 *        description: 차량 운행일지 등록 성공
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "정보 입력 완료"
 *      400:
 *        description: 필수 정보 누락
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "정보를 입력해야 합니다."           
 */

router.post('/addInform', addInform);

/**
 * @swagger
 * /api/driving-inform/removeInform/{id}:
 *  delete:
 *    tags: [차량 운행일지]
 *    summary: 차량 운행일지 삭제
 *    description: 특정 차량 운행일지를 삭제합니다.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 삭제할 운행일지 ID
 *        schema:
 *          type: string
 *          example: "507f1f77bcf86cd799439011"
 *    responses:
 *      200:
 *        description: 차량 운행일지 삭제 성공
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
 *      404:
 *         description: 삭제할 운행일지 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 정보가 존재하지 않습니다."
 */


router.delete('/removeInform/:id', removeInform);

/**
 * @swagger
 * /api/driving-inform/editInform:
 *  put:
 *    tags: [차량 운행일지]
 *    summary: 차량 운행일지 수정
 *    description: 기존 차량 운행일지를 수정합니다.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *            - _id:
 *            properties:
 *              _id:
 *                type: string
 *                description: 수정할 운행일지 ID
 *                example: "507f1f77bcf86cd799439011"
 *              driveDay:
 *                type: string
 *                format: date-time
 *                description: 운행 일자
 *              username:
 *                type: string
 *                description: 운전자
 *              drivingDestination:
 *                type: string
 *                description: 행선지
 *              startKM:
 *                type: number
 *                description: 출발(Km)
 *              endKM:
 *                type: number
 *                description: 도착(Km) 
 *              fuelCost:
 *                type: number
 *                description: 주유비
 *              toll:
 *                type: number
 *                description: 하이패스
 *              etc:
 *                type: object
 *                description: 기타 비용
 *                properties:
 *                  name:
 *                    type: string
 *                    description: 기타 비용 항목
 *                  cost:
 *                    type: number
 *                    description: 기타 비용 금액
 *    responses:
 *      200:
 *        description: 차량 운행일지 수정 성공
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *               message:
 *                type: string
 *                example: "정보 수정 완료"
 *      404:
 *         description: 수정할 운행일지 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "수정할 정보가 존재하지 않습니다."
 */


router.put('/editInform', editInform);

/**
 * @swagger
 * /api/driving-inform/getNotification:
 *   get:
 *     tags: [차량 공지사항]
 *     summary: 차량 공지사항 조회 
 *     description: 특정 차량의 공지사항을 조회합니다.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 차량 ID
 *     responses:
 *       200:
 *         description: 차량 공지사항 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 car:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 차량 ID
 *                     notification:
 *                       type: string
 *                       description: 공지사항 내용  
 *                    
 *
 */

router.get('/getNotification', getNotification);

/**
 * @swagger
 * /api/driving-inform/addNotification:
 *   post:
 *     tags: [차량 공지사항]
 *     summary: 차량 공지사항 등록
 *     description: 특정 차량에 공지사항을 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - notification
 *             properties:
 *               id:
 *                 type: string
 *                 description: 차량 ID
 *                 example: "507f1f77bcf86cd799439011"
 *               notification:
 *                 type: string
 *                 description: 차량 공지사항 내용
 *     responses:
 *       201:
 *         description: 차량 공지사항 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "공지 입력 완료" 
 *       404:
 *        description: 차량 정보 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "차량이 존재하지 않습니다."             
 *       
 *                 
 */

router.post('/addNotification', addNotification);

/**
 * @swagger
 * /api/driving-inform/removeNotification/{id}:
 *   delete:
 *     tags: [차량 공지사항]
 *     summary: 차량 공지사항 삭제
 *     description: 특정 차량의 공지사항을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: 차량 ID
 *     responses:
 *       200:
 *         description: 차량 공지사항 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "공지사항 삭제 완료"
 *       404:
 *        description: 차량 정보 없음
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: "차량이 존재하지 않습니다."   
 */

router.delete('/removeNotification/:id', removeNotification);

/**
 * @swagger
 * /api/driving-inform/getServices:
 *   get:
 *     tags: [차량 점검]
 *     summary: 차량 점검 내역 조회
 *     description: 특정 차량의 전체 점검 내역을 조횧바니다.
 *     parameters:
 *       - in: query
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 차량 ID
 *     responses:
 *       200:
 *         description: 점검 내역 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 점검 기록 ID
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: 점검 일자
 *                       mileage:
 *                         type: object
 *                         properties:
 *                           base:
 *                             type: number
 *                             description: 최근 점검(Km)
 *                           next:
 *                             type: number
 *                             description: 다음 점검(Km)  
 *                       note:
 *                         type: string
 *                         description: 비고
 *                       writerId:
 *                         type: string
 *                         description: 작성자 ID
 *                       isOwner:
 *                         type: boolean
 *                         description: 작성자이거나 관리자  
 *       400:
 *         description: 잘못도니 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "유저 정보가 올바르지 않습니다."
 *       404:
 *         description: 정비 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "차량 정비 정보가 존재하지 않습니다."              
 */



router.get('/getServices', getService);

/**
 * @swagger
 * /api/driving-inform/addService:
 *   post:
 *     tags: [차량 점검]
 *     summary: 차량 점검 등록
 *     description: 새로운 차량 점검 내역을 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - type
 *               - mileage
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: 점검 일자
 *               type:
 *                 type: string
 *                 description: 점검 유형
 *               mileage:
 *                 type: object
 *                 properties:
 *                   base:
 *                     type: number
 *                     description: 최근 점검(Km)
 *                   next:
 *                     type: number
 *                     description: 다음 점검(Km)   
 *               note:
 *                 type: string
 *                 description: 비고
 *               carId:
 *                 type: string
 *                 description: 차량 ID             
 */    


router.post('/addService', addService);

/**
 * @swagger
 * /api/driving-inform/removeService/{id}:
 *   delete:
 *     tags: [차량 점검]
 *     summary: 차량 점검 기록 삭제
 *     description: 특정 차량 점검 기록을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 점검 기록 ID
 *     responses:
 *       200:
 *         description: 점검 기록 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "삭제 완료"
 *       404:
 *         description: 점검 기록 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 내역이 존재하지 않습니다."
 */

router.delete('/removeService/:id', removeService);

/**
 * @swagger
 * /api/driving-inform/editService:
 *   put:
 *     tags: [차량 점검]
 *     summary: 차량 점검 내역 수정
 *     description: 기존 차량 점검 기록을 수정합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - _id
 *             properties:
 *               _id: 
 *                 type: string
 *                 description: 수정할 정비 기록 ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: 점검 일자
 *               type:
 *                 type: string
 *                 description: 점검 유형
 *               mileage:
 *                 type: object
 *                 properties:
 *                   base:
 *                     type: number
 *                     description: 최근 점검(Km)
 *                   next:
 *                     type: number
 *                     description: 다음 점검(Km)
 *               note:
 *                 type: string
 *                 description: 비고
 *     responses:
 *       200:
 *         description: 점검 기록 수정 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 message:
 *                   type: string
 *                   example: "정보 수정 완료"
 *       404:
 *         description: 점검 내역 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "수정할 내역이 존재하지 않습니다."
 */

router.put('/editService', editService);

export default router;
