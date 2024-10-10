import express from "express";
import {
  addInform,
  editInform,
  getInform,
  removeInform,
} from "../controllers/informDrivingController";

const router = express.Router();

router.get("/getInform", getInform);
router.post("/addInform", addInform);
router.delete("/removeInform/:id", removeInform);
router.put("/editInform", editInform);

export default router;
