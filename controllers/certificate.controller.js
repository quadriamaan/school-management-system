import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Certificate } from "../models/certificate.model.js";

const generatecertificate = asyncHandler(async(req,res)=>{
    const {course_id,student_id,certificate}=req.body

    if(!(course_id || student_id || certificate)) {
        throw new ApiError(400,'all fields are required')
    }

    const certificateinfo = await Certificate.create({
        course_id,
        student_id,
        certificate
    })

    return res 
    .status(201)
    .json(new ApiResponse(200,certificateinfo,'certificate details generated successfully'))
})

const getcertificate = asyncHandler(async(req,res)=>{

    const {id}=req.params

    const certificate = await Certificate.findOne({
        where:{
            certificate_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,certificate,'certificate detail fetched successfully'))
})

const getallcertificates = asyncHandler(async(req,res)=>{
    const certificates = await Certificate.findAll()

    return res 
    .status(200)
    .json(new ApiResponse(200,certificates,'certificates details fetched successfully'))
})

export {generatecertificate,getcertificate,getallcertificates}