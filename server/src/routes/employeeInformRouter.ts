import express from 'express';
import {
  addBusiness,
  addCar,
  addDepartment,
  addDestination,
  addInform,
  addName,
  addWork,
  editBusiness,
  editCar,
  editDepartment,
  editDestination,
  editInform,
  editName,
  editWork,
  getBusiness,
  getBusinesses,
  getCar,
  getDepartment,
  getDestination,
  getDestinationStatistics,
  getInform,
  getName,
  getUserStatistics,
  getWork,
  removeBusiness,
  removeCar,
  removeDepartment,
  removeDestination,
  removeInform,
  removeName,
  removeWork,
} from '../controllers/informEmployeeController';
import {
  addEtcName,
  editEtcName,
  getEtcName,
  removeEtcName,
} from '../controllers/informDrivingController';

const router = express.Router();

// 이름 관련

/**
 * @swagger
 * /api/employee-inform/getName:
 *   get:
 *     tags: [사용자]
 *     summary: 사용자 이름 목록 조회
 *     description: 전체 사용자의 이름 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 이름 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allNames:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 사용자 ID
 *                       username:
 *                         type: string
 *                         description: 사용자 이름
 */
router.get('/getName', getName);

/**
 * @swagger
 * /api/employee-inform/addName:
 *   post:
 *     tags: [사용자]
 *     summary: 사용자 이름 추가
 *     description: 새로운 사용자 이름을 추가합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 description: 추가할 사용자 이름
 *     responses:
 *       201:
 *         description: 이름 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이름 추가 완료"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "이름을 입력하세요."
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 */

router.post('/addName', addName);

/**
 * @swagger
 * /api/employee-inform/editName:
 *   patch:
 *     tags: [사용자]
 *     summary: 사용자 이름 수정
 *     description: 기존 사용자의 이름을 수정합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - username
 *             properties:
 *               id:
 *                 type: string
 *                 description: 수정할 사용자 ID
 *               username:
 *                 type: string
 *                 description: 변경할 사용자 이름
 *     responses:
 *       200:
 *         description: 이름 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이름 수정 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 수정할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "수정할 이름이 존재하지 않습니다."
 */

router.patch('/editName', editName);

/**
 * @swagger
 * /api/employee-inform/removeName/{id}:
 *   delete:
 *     tags: [사용자]
 *     summary: 사용자 이름 삭제
 *     description: 특정 사용자의 이름을 삭제합니다. 관리자 권한이 필요합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 사용자 ID
 *     responses:
 *       200:
 *         description: 이름 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "이름 삭제 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 삭제할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 이름이 존재하지 않습니다."
 */

router.delete('/removeUsername/:id', removeName);

// 방문지 관련

/**
 * @swagger
 * /api/employee-inform/getDestination:
 *   get:
 *     tags: [방문지]
 *     summary: 방문지 목록 조회
 *     description: 전체 방문지의 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 방문지 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allDestinations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 사용자 ID
 *                       destination:
 *                         type: string
 *                         description: 방무닞명
 */

router.get('/getDestination', getDestination);

/**
 * @swagger
 * /api/employee-inform/addDestination:
 *   post:
 *     tags: [방문지]
 *     summary: 방문지 추가
 *     description: 새로운 방문지를 추가합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - destination
 *             properties:
 *               destination:
 *                 type: string
 *                 description: 추가할 방문지 이름
 *     responses:
 *       201:
 *         description: 방문지 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "방문지 추가 완료"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "방문지를 입력하세요."
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 */

router.post('/addDestination', addDestination);

/**
 * @swagger
 * /api/employee-inform/editDestination:
 *   patch:
 *     tags: [방문지]
 *     summary: 방문지 수정
 *     description: 기존 방문지를 수정합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - destination
 *             properties:
 *               id:
 *                 type: string
 *                 description: 수정할 방문지 ID
 *               destination:
 *                 type: string
 *                 description: 변경할 방문지
 *     responses:
 *       200:
 *         description: 방문지 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "방문지 수정 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 수정할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "수정할 방문지 존재하지 않습니다."
 */

router.patch('/editDestination', editDestination);

/**
 * @swagger
 * /api/employee-inform/removeDestination/{id}:
 *   delete:
 *     tags: [방문지]
 *     summary: 방문지 삭제
 *     description: 특정 방문지와 해당 방문지를 참조하는 모든 사업 정보를 삭제합니다. 관리자 권한이 필요합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 방문지 ID
 *     responses:
 *       200:
 *         description: 방문지 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "방문지 삭제 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 삭제할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 방문지가 존재하지 않습니다."
 */

router.delete('/removeDestination/:id', removeDestination);

// 사업명 관련

/**
 * @swagger
 * /api/employee-inform/getBusinesses:
 *   get:
 *     tags: [사업]
 *     summary: 사업명 목록 조회
 *     description: 전체 사업명 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 사업명 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allBusinesses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 사용자 ID
 *                       business:
 *                         type: string
 *                         description: 사업명
 *                       destinationId:
 *                         type: string
 *                         description: 해당 사업명이 존재하는 방문지 ID
 */

router.get('/getBusinesses', getBusinesses);
/**
 * @swagger
 * /api/employee-informs/getBusiness/{business}:
 *   get:
 *     tags: [사업]
 *     summary: 사업 정보 조회
 *     description: 특정 사업의 상세 정보를 조회합니다.
 *     parameters:
 *       - in: path
 *         name: business
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 사업명
 *     responses:
 *       200:
 *         description: 사업 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 business:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: 사업 ID
 *                     business:
 *                       type: string
 *                       description: 사업명
 *                     destinationId:
 *                       type: string
 *                       description: 관련 방문지 ID 목록
 */

router.get('/getBusiness/:business', getBusiness);

/**
 * @swagger
 * /api/employee-inform/addBusiness:
 *   post:
 *     tags: [사업]
 *     summary: 사업명 추가
 *     description: 새로운 사업명을 추가합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - business
 *             properties:
 *               business:
 *                 type: string
 *                 description: 추가할 사업명
 *     responses:
 *       201:
 *         description: 사업명 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "사업명 추가 완료"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "사업명을 입력하세요."
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 */

router.post('/addBusiness', addBusiness);

/**
 * @swagger
 * /api/employee-inform/editBusiness:
 *   patch:
 *     tags: [사업]
 *     summary: 사업명 수정
 *     description: 기존 사업명을 수정합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - business
 *             properties:
 *               id:
 *                 type: string
 *                 description: 수정할 사업명 ID
 *               destination:
 *                 type: string
 *                 description: 변경할 사업명
 *     responses:
 *       200:
 *         description: 사업명 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "사업명 수정 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 수정할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "수정할 사업명이 존재하지 않습니다."
 */

router.patch('/editBusiness', editBusiness);

/**
 * @swagger
 * /api/employee-inform/removeBusiness/{id}:
 *   delete:
 *     tags: [사업]
 *     summary: 사업명 삭제
 *     description: 특정 사업명을 삭제합니다. 관리자 권한이 필요합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 사업명 ID
 *     responses:
 *       200:
 *         description: 사업명 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "사업명 삭제 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 삭제할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 사업명이 존재하지 않습니다."
 */

router.delete('/removeBusiness/:id', removeBusiness);

// 업무 관련

/**
 * @swagger
 * /api/employee-inform/getWork:
 *   get:
 *     tags: [업무]
 *     summary: 업무명 목록 조회
 *     description: 전체 업무명 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 업무명 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allWorks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 업무 ID
 *                       work:
 *                         type: string
 *                         description: 업무명
 */

router.get('/getWork', getWork);

/**
 * @swagger
 * /api/employee-inform/addWork:
 *   post:
 *     tags: [업무]
 *     summary: 업무명 추가
 *     description: 새로운 업무명을 추가합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - work
 *             properties:
 *               work:
 *                 type: string
 *                 description: 추가할 업무명
 *     responses:
 *       201:
 *         description: 업무명 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "업무명 추가 완료"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "업무명을 입력하세요."
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 */

router.post('/addWork', addWork);

/**
 * @swagger
 * /api/employee-inform/editWork:
 *   patch:
 *     tags: [업무]
 *     summary: 업무명 수정
 *     description: 기존 업무명을 수정합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - work
 *             properties:
 *               id:
 *                 type: string
 *                 description: 수정할 업무명 ID
 *               work:
 *                 type: string
 *                 description: 변경할 업무명
 *     responses:
 *       200:
 *         description: 업무명 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "업무명 수정 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 수정할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "수정할 업무명이 존재하지 않습니다."
 */

router.patch('/editWork', editWork);

/**
 * @swagger
 * /api/employee-inform/removeWork/{id}:
 *   delete:
 *     tags: [업무]
 *     summary: 업무명 삭제
 *     description: 특정 업무명을 삭제합니다. 관리자 권한이 필요합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 업무명 ID
 *     responses:
 *       200:
 *         description: 업무명 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "업무명 삭제 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 삭제할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 업무명이 존재하지 않습니다."
 */

router.delete('/removeWork/:id', removeWork);

//파트 관련

/**
 * @swagger
 * /api/employee-inform/getDepartment:
 *   get:
 *     tags: [파트]
 *     summary: 파트명 목록 조회
 *     description: 전체 파트명 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 파트명 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allDepartments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 파트명 ID
 *                       department:
 *                         type: string
 *                         description: 파트명
 */

router.get('/getDepartment', getDepartment);

/**
 * @swagger
 * /api/employee-inform/addDepartment:
 *   post:
 *     tags: [파트]
 *     summary: 파트명 추가
 *     description: 새로운 파트명을 추가합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - department
 *             properties:
 *               department:
 *                 type: string
 *                 description: 추가할 파트명
 *     responses:
 *       201:
 *         description: 파트명 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "파트명 추가 완료"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "파트명 입력하세요."
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 */

router.post('/addDepartment', addDepartment);

/**
 * @swagger
 * /api/employee-inform/editDepartment:
 *   patch:
 *     tags: [파트]
 *     summary: 파트명 수정
 *     description: 기존 파트명을 수정합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - department
 *             properties:
 *               id:
 *                 type: string
 *                 description: 수정할 파트명 ID
 *               department:
 *                 type: string
 *                 description: 변경할 파트명
 *     responses:
 *       200:
 *         description: 파트명 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "파트명 수정 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 수정할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "수정할 파트명이 존재하지 않습니다."
 */

router.patch('/editDepartment', editDepartment);

/**
 * @swagger
 * /api/employee-inform/removeDepartment/{id}:
 *   delete:
 *     tags: [파트]
 *     summary: 파트명 삭제
 *     description: 특정 파트명을 삭제합니다. 관리자 권한이 필요합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 파트명 ID
 *     responses:
 *       200:
 *         description: 파트명 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "파트명 삭제 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 삭제할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 파트명이 존재하지 않습니다."
 */

router.delete('/removeDepartment/:id', removeDepartment);

// 차량 관련

/**
 * @swagger
 * /api/employee-inform/getCar:
 *   get:
 *     tags: [차량]
 *     summary: 차량 목록 조회
 *     description: 전체 차량 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 차량 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allCars:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 차량 ID
 *                       car:
 *                         type: string
 *                         description: 차량
 */

router.get('/getCar', getCar);

/**
 * @swagger
 * /api/employee-inform/addCar:
 *   post:
 *     tags: [차량]
 *     summary: 차량 추가
 *     description: 새로운 차량을 추가합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - car
 *             properties:
 *               car:
 *                 type: string
 *                 description: 추가할 차량
 *     responses:
 *       201:
 *         description: 차량 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "차량 추가 완료"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "차량을 입력하세요."
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 */

router.post('/addCar', addCar);

/**
 * @swagger
 * /api/employee-inform/editCar:
 *   patch:
 *     tags: [차량]
 *     summary: 차량 수정
 *     description: 기존 차량을 수정합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - work
 *             properties:
 *               id:
 *                 type: string
 *                 description: 수정할 차량 ID
 *               car:
 *                 type: string
 *                 description: 변경할 차량
 *     responses:
 *       200:
 *         description: 차량명 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "차량 수정 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 수정할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "수정할 차량이 존재하지 않습니다."
 */

router.patch('/editCar', editCar);

/**
 * @swagger
 * /api/employee-inform/removeCar/{id}:
 *   delete:
 *     tags: [차량]
 *     summary: 차량명 삭제
 *     description: 특정 차량을 삭제합니다. 관리자 권한이 필요합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 차량 ID
 *     responses:
 *       200:
 *         description: 차량 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "차량 삭제 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 삭제할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 차량이 존재하지 않습니다."
 */

router.delete('/removeCar/:id', removeCar);

// 기타 비용 관련

/**
 * @swagger
 * /api/employee-inform/getEtcName:
 *   get:
 *     tags: [기타 비용]
 *     summary: 기타 비용 목록 조회
 *     description: 전체 기타 비용 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 기타 비용 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allEtcNames:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 기타 비용 ID
 *                       etcName:
 *                         type: string
 *                         description: 기타 비용 이름
 */

router.get('/getEtcName', getEtcName);

/**
 * @swagger
 * /api/employee-inform/addEtcName:
 *   post:
 *     tags: [기타 비용]
 *     summary: 기타 비용 추가
 *     description: 새로운 기타 비용을 추가합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - etcName
 *             properties:
 *               etcName:
 *                 type: string
 *                 description: 추가할 기타 비용
 *     responses:
 *       201:
 *         description: 기타 비용 추가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "기타 비용 추가 완료"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "기타 비용을 입력하세요."
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 */

router.post('/addEtcName', addEtcName);

/**
 * @swagger
 * /api/employee-inform/editEtcName:
 *   patch:
 *     tags: [기타 비용]
 *     summary: 기타 비용 수정
 *     description: 기존 기타 비용을 수정합니다. 관리자 권한이 필요합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - etcName
 *             properties:
 *               id:
 *                 type: string
 *                 description: 수정할 기타 비용 ID
 *               etcName:
 *                 type: string
 *                 description: 변경할 기타 비용
 *     responses:
 *       200:
 *         description: 기타 비용 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "기타 비용 수정 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 수정할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "수정할 기타 비용이 존재하지 않습니다."
 */

router.patch('/editEtcName', editEtcName);

/**
 * @swagger
 * /api/employee-inform/removeEtcName/{id}:
 *   delete:
 *     tags: [기타 비용]
 *     summary: 기타 비용 삭제
 *     description: 특정 기타 비용을 삭제합니다. 관리자 권한이 필요합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 기타 비용 ID
 *     responses:
 *       200:
 *         description: 기타 비용 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "기타 비용 삭제 완료"
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 *       404:
 *         description: 삭제할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "삭제할 기타 비용이 존재하지 않습니다."
 */
router.delete('/removeEtcName/:id', removeEtcName);

// 종합 정보 관련

/**
 * @swagger
 * /api/employee-inform/getInform:
 *   get:
 *     tags: [근무 현황]
 *     summary: 근무 현황 조회
 *     description: 특정 날짜의 모든 근무 현황을 조회합니다.
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: 조회할 날짜
 *     responses:
 *       200:
 *         description: 업무 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allInforms:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: 업무 ID
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
 *                       car:
 *                         type: string
 *                         description: 차량
 *                       isDaily:
 *                         type: number
 *                         description: 일일/기간 업무 구분
 *                       startDate:
 *                         type: string
 *                         format: date-time
 *                         description: 근무 시작 날짜
 *                       endDate:
 *                         type: string
 *                         format: date-time
 *                         description: 근무 종료 날짜
 *                       remarks:
 *                         type: string
 *                         description: 비고
 *                       writerId:
 *                         type: string
 *                         description: 작성자 ID
 *                       isOwner:
 *                         type: boolean
 *                         description: 작성자이거나 관리자인 경우 true
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
 */

router.get('/getInform', getInform);

/**
 * @swagger
 * /api/employee-inform/addInform:
 *   post:
 *     tags: [근무 현황]
 *     summary: 근무 현황 등록
 *     description: 새로운 근무 현황을 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - destination
 *               - business
 *               - work
 *               - car
 *               - startDate
 *               - endDate
 *             properties:
 *               username:
 *                 type: string
 *                 description: 이름
 *               destination:
 *                 type: string
 *                 description: 방문지 (선택 안함 가능)
 *               business:
 *                 type: string
 *                 description: 사업명 (선택 안함 가능)
 *               work:
 *                 type: string
 *                 description: 업무
 *               car:
 *                 type: string
 *                 description: 차량 (선택 안함 가능)
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: 근무 시작 날짜
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: 근무 종료 날짜
 *               remarks:
 *                 type: string
 *                 description: 비고
 *     responses:
 *       201:
 *         description: 업무 정보 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "정보 입력 완료"
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "내용을 입력해주세요"
 */

router.post('/addInform', addInform);

/**
 * @swagger
 * /api/employee-inform/editInform:
 *   put:
 *     tags: [근무 현황]
 *     summary: 근무 현황 수정
 *     description: 기존 근무 현황을 수정합니다.
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
 *                 description: 수정할 근무 현황 ID
 *               username:
 *                 type: string
 *                 description: 이름
 *               destination:
 *                 type: string
 *                 description: 방문지
 *               business:
 *                 type: string
 *                 description: 사업명
 *               work:
 *                 type: string
 *                 description: 업무
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: 근무 시작 날짜
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: 근무 종료 날짜
 *               car:
 *                 type: string
 *                 description: 사용 차량 (선택 안함 가능)
 *               remarks:
 *                 type: string
 *                 description: 비고
 *     responses:
 *       200:
 *         description: 근무 현황 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "정보 수정 완료"
 *       404:
 *         description: 수정할 정보 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "정보를 찾을 수 없습니다."
 */

router.put('/editInform', editInform);

/**
 * @swagger
 * /api/employee-inform/removeInform/{id}:
 *   delete:
 *     tags: [근무 현황]
 *     summary: 근무 현황 삭제
 *     description: 특정 근무 현황을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 삭제할 근무 현황 ID
 *     responses:
 *       200:
 *         description: 근무 현황 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "삭제 완료"
 *       404:
 *         description: 삭제할 정보 없음
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

// 통계 관련

/**
 * @swagger
 * /api/employee-inform/getUserStatistics:
 *   get:
 *     tags: [통계]
 *     summary: 사용자별 업무 통계 조회
 *     description: 특정 사용자의 지정된 기간 동안의 업무 통계를 조회합니다. 관리자 권한이 필요합니다.
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 사용자 이름
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: 조회 시작일
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: 조회 종료일
 *     responses:
 *       200:
 *         description: 통계 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userStatistics:
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
 *                       car:
 *                         type: string
 *                         description: 차량
 *                       specificDate:
 *                         type: string
 *                         format: date-time
 *                         description: 구체적인 업무 일자
 *                       remarks:
 *                         type: string
 *                         description: 비고
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 */

router.get('/userStatistics', getUserStatistics);

/**
 * @swagger
 * /api/statistics/destination:
 *   get:
 *     tags: [통계]
 *     summary: 방문지별 업무 통계 조회
 *     description: 특정 방문지의 지정된 기간 동안의 업무 통계를 조회합니다. 관리자 권한이 필요합니다.
 *     parameters:
 *       - in: query
 *         name: destination
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 방문지명
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: 조회 시작일
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: 조회 종료일
 *     responses:
 *       200:
 *         description: 통계 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destinationStatistics:
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
 *                       specificDate:
 *                         type: string
 *                         format: date-time
 *                         description: 구체적인 업무 일자
 *                       remarks:
 *                         type: string
 *                         description: 비고
 *       403:
 *         description: 권한 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "관리자 권한이 필요합니다."
 */

router.get('/destinationStatistics', getDestinationStatistics);

export default router;
