import express from "express";
import {
  checkSession,
  joinUser,
  loginUser,
} from "../controllers/authController";

const router = express.Router();

router.get("/checkSession", checkSession);
router.post("/login", loginUser);
router.post("/register", joinUser);

export default router;
