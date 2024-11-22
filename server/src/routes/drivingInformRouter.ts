import express from 'express';
import {
  addInform,
  addNotification,
  addService,
  editInform,
  getInform,
  getNotification,
  getService,
  removeInform,
  removeNotification,
} from '../controllers/informDrivingController';

const router = express.Router();

router.get('/getInform', getInform);
router.post('/addInform', addInform);
router.delete('/removeInform/:id', removeInform);
router.put('/editInform', editInform);

router.get('/getNotification', getNotification);
router.post('/addNotification', addNotification);
router.delete('/removeNotification/:id', removeNotification);

router.get('/getServices', getService);
router.post('/addService', addService);

export default router;
