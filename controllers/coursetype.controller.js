import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { CourseType } from "../models/coursetype.model.js";

const createcoursetype = asyncHandler(async(req,res)=>{

    const { url, course_id, attachments } = req.body;
    
    if (!url || !course_id || !attachments) {
        throw new ApiError(400, 'All fields are required');
    }
    
const type = await CourseType.create({
    url,
    course_id,
    attachments
})

return res 
.status(201)
.json(new ApiResponse(200,type,'course type created successfully'))


})

const gettype = asyncHandler(async(req,res)=>{

    const {id}=req.params

    const type = await CourseType.findOne({
        where:{
            course_type_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,type,'course type fetched successfully'))

})

const getcoursetype = asyncHandler(async(req,res)=>{

    const coursetp=await CourseType.findAll()

    return res 
    .status(200)
    .json(new ApiResponse(200,coursetp,'coursetype fetched successfully'))

})

export {createcoursetype,gettype,getcoursetype}