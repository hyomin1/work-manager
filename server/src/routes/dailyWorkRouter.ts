import express from 'express';
import {
  addDailyWork,
  editDailyWork,
  getDailyWork,
  getDailyWorks,
  removeDailyWork,
} from '../controllers/dailyWorkController';

const router = express.Router();

router.get('/', getDailyWorks);
router.get('/:id', getDailyWork);
router.post('/add', addDailyWork);
router.put('/edit', editDailyWork);
router.delete('/remove/:id', removeDailyWork);

export default router;
