import { Router } from "express";
import {addAlert, getAlert} from '../controllers/alerts.controller.js'

const router = Router();

router.route('/').post(addAlert);
router.route('/').get(getAlert);

export default router;