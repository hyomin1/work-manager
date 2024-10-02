import express from "express";
import {
  addEtcName,
  addInform,
  getEtcName,
  getInform,
  removeEtcName,
} from "../controllers/informDrivingController";

const router = express.Router();

router.get("/getInform", getInform);
router.post("/addInform", addInform);

export default router;
