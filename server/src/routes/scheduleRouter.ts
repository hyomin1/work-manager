import express from 'express';
import { getSchedule } from '../controllers/scheduleController';

const router = express.Router();

router.get('/getSchedule', getSchedule);

export default router;
