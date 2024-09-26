import express from "express";
import {
  adminLogin,
  checkSession,
  joinUser,
  loginUser,
} from "../controllers/authController";

const router = express.Router();

router.get("/checkSession", checkSession);
router.post("/login", loginUser);
router.post("/adminLogin", adminLogin);
router.post("/register", joinUser);

export default router;
