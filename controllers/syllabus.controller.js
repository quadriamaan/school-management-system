import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
//models 
import { Syllabus } from "../models/syllabus.model.js";


const createsyllabus = asyncHandler(async(req,res)=>{
    const {chapters,course_id} = req.body

    if(!chapters || !course_id) {
        throw new ApiError(404,'all fileds are required')
    }

    const syllabusdetails = await Syllabus.create({
        chapters,
        course_id
    })

    return res 
    .status(201)
    .json(new ApiResponse(200,syllabusdetails,'syllabus details created successfully'))
})

const getsyllabus = asyncHandler(async(req,res)=>{
    const {id}=req.params
    const syllabusdetail = await Syllabus.findOne({
        where:{
            syllabus_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,syllabusdetail,'syllabus detail fetched successfully'))
})

const getallsyllabus = asyncHandler(async(req,res)=>{

    const getallsyllabusdetail = await Syllabus.findAll()

    return res 
    .status(200)
    .json(new ApiResponse(200,getallsyllabusdetail,'syllabus details fetched successfully'))
})

const updatesyllabus = asyncHandler(async(req,res)=>{
    const {id}=req.params

    const {chapters}=req.body 

    if(!chapters) {
        throw new ApiError(400,'chapters required')
    }

   const syllabusdetail = await Syllabus.findByPk(id)

   const updatesyllabus = await Syllabus.update({
    chapters
    },
    {
        where:{
            syllabus_id:id
        }
    })

   const updatedsyllabus = await Syllabus.findByPk(id)

   return res 
   .status(200)
   .json(new ApiResponse(200,updatedsyllabus,'syllabus details updated successfully'))
})


export {createsyllabus,getsyllabus,getallsyllabus,updatesyllabus}