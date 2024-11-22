import express from 'express';
import {
  addInform,
  addNotification,
  addService,
  editInform,
  editService,
  getInform,
  getNotification,
  getService,
  removeInform,
  removeNotification,
  removeService,
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
router.delete('/removeService/:id', removeService);
router.put('/editService', editService);

export default router;
