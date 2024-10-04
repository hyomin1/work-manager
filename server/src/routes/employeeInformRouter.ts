import express from "express";
import {
  addBusiness,
  addCar,
  addDestination,
  addInform,
  addName,
  addWork,
  editBusiness,
  editCar,
  editDestination,
  editName,
  editWork,
  getBusiness,
  getCar,
  getDestination,
  getInform,
  getName,
  getWork,
  removeBusiness,
  removeCar,
  removeDestination,
  removeInform,
  removeName,
  removeWork,
} from "../controllers/informEmployeeController";
import {
  addEtcName,
  editEtcName,
  getEtcName,
  removeEtcName,
} from "../controllers/informDrivingController";

const router = express.Router();

// 이름 관련
router.get("/getName", getName);
router.post("/addName", addName);
router.patch("/editName", editName);
router.delete("/removeUsername/:id", removeName);

// 방문지 관련
router.get("/getDestination", getDestination);
router.post("/addDestination", addDestination);
router.patch("/editDestination", editDestination);
router.delete("/removeDestination/:id", removeDestination);

// 사업명 관련
router.get("/getBusiness", getBusiness);
router.post("/addBusiness", addBusiness);
router.patch("/editBusiness", editBusiness);
router.delete("/removeBusiness/:id", removeBusiness);

// 업무 관련
router.get("/getWork", getWork);
router.post("/addWork", addWork);
router.patch("/editWork", editWork);
router.delete("/removeWork/:id", removeWork);

// 차량 관련
router.get("/getCar", getCar);
router.post("/addCar", addCar);
router.patch("/editCar", editCar);
router.delete("/removeCar/:id", removeCar);

// 기타 비용 관련
router.get("/getEtcName", getEtcName);
router.post("/addEtcName", addEtcName);
router.delete("/removeEtcName/:id", removeEtcName);
router.patch("/editEtcName", editEtcName);

// 종합 정보 관련
router.get("/getInform", getInform);
router.post("/addInform", addInform);
router.delete("/removeInform/:id", removeInform);

export default router;
