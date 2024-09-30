import express from "express";
import { addInform, getInform } from "../controllers/informDrivingController";

const router = express.Router();

router.get("/getInform", getInform);
router.post("/addInform", addInform);

export default router;
