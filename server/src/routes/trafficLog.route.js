import { Router } from "express";
import {addTrafficLog, getTrafficLogs} from '../controllers/trafficLog.controllers.js'

const router = Router();

router.route('/').post(addTrafficLog);
router.route('/').get(getTrafficLogs);

export default router;