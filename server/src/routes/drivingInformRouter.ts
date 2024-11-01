import express from 'express';
import {
  addInform,
  addNotification,
  editInform,
  getInform,
  getNotification,
  removeInform,
} from '../controllers/informDrivingController';

const router = express.Router();

router.get('/getInform', getInform);
router.post('/addInform', addInform);
router.delete('/removeInform/:id', removeInform);
router.put('/editInform', editInform);

router.get('/getNotification', getNotification);
router.post('/addNotification', addNotification);

export default router;
