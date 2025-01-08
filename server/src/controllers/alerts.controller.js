import {Alert} from '../models/alert.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js'

const addAlert = asyncHandler(async(req, res)=>{
    const alert = new Alert(req.body);
    await alert.save();
    return res
    .status(201)
    .json(
         new ApiResponse(201, alert, "Successfully added")
    )
})

const getAlert = asyncHandler(async(req, res)=>{
    const alert = await Alert.find();
    return res
    .status(201)
    .json(
        new ApiResponse(201, alert, "Successfully sent")
    )
})

export{
    addAlert,
    getAlert
}