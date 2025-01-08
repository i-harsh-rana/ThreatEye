import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'
import {TrafficLog} from '../models/trafficLog.model.js'

const addTrafficLog = asyncHandler(async(req, res)=>{
    const log = new TrafficLog(req.body);
    await log.save();
    return res
    .status(201)
    .json(
        new ApiResponse(201, log, "Successfully sent")
    )
})

const getTrafficLogs = asyncHandler(async(req, res)=>{
    const logs = await TrafficLog.find();
    return res
    .status(201)
    .json(
        new ApiResponse(201, logs, "Successfully sent")
    )
})

export {
    getTrafficLogs,
    addTrafficLog
}