import express from "express";
import {
  addBusiness,
  addCar,
  addDestination,
  addInform,
  addName,
  addWork,
  getBusiness,
  getCar,
  getDestination,
  getInform,
  getName,
  getWork,
  removeBusiness,
  removeCar,
  removeDestination,
  removeName,
  removeWork,
} from "../controllers/informController";

const router = express.Router();

// 이름 관련
router.get("/getName", getName);
router.post("/addName", addName);
router.delete("/removeName/:id", removeName);

// 방문지 관련
router.get("/getDestination", getDestination);
router.post("/addDestination", addDestination);
router.delete("/removeDestination/:id", removeDestination);

// 사업명 관련
router.get("/getBusiness", getBusiness);
router.post("/addBusiness", addBusiness);
router.delete("/removeBusiness/:id", removeBusiness);

// 업무 관련
router.get("/getWork", getWork);
router.post("/addWork", addWork);
router.delete("/removeWork/:id", removeWork);

// 차량 관련
router.get("/getCar", getCar);
router.post("/addCar", addCar);
router.delete("/removeCar/:id", removeCar);

// 종합 정보 관련
router.get("/getInform", getInform);
router.post("/addInform", addInform);

export default router;
