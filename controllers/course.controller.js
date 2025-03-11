import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";
import { Course } from "../models/course.model.js";

const registerCourse = asyncHandler(async(req,res)=>{

    const {coursename,price,validity,description,lectures,estimateTime}=req.body 

    if(!(coursename || price || validity || description || lectures || estimateTime)) {
        throw new ApiError(400,'all fields are required')
    }

    const teacher = await Teacher.findOne({
        where:{
            teacher_id:req.teacher?.teacher_id
        }
    })

    if(!teacher) {
        throw new ApiError(400,'teacher not found')
    }

    const course = await Course.create({
        coursename,
        price,
        validity,
        description,
        lectures,
        estimateTime
    })

    await teacher.addCourse(course)

    return res 
    .status(201)
    .json(new ApiResponse(200,course,'course details created successfully'))

})

const getcoursedetail = asyncHandler(async(req,res)=>{

    const { id } = req.params

    const course = await Course.findOne({
        where:{
            course_id:id
        }
    })
       

    return res 
    .status(200)
    .json(new ApiResponse(200,course,'course detail fetched successfully'))

})

const getallcourses = asyncHandler(async(req,res)=>{

    const getcourses = await Course.findAll()

    return res
    .status(200)
    .json(new ApiResponse(200,getcourses,'all details fetched successfully'))

})

const updatedcoursedetails = asyncHandler(async(req,res)=>{
    const {id}=req.params

    const {price,validity,lectures,estimateTime} = req.body

    if(!(price || validity || lectures || estimateTime)) {
        throw new ApiError(400,'all fieds are required')
    }

    const coursedetail = await Course.findByPk(id)

    if(!coursedetail) {
        throw new ApiError(404,'course not found')
    }

    const updatedetails = await Course.update({
        price,
        validity,
        lectures,
        estimateTime
    }, {
        where:{
           course_id: id
        }
    })

    const updatedcourse = await Course.findByPk(id)

    return res 
    .status(200)
    .json(new ApiResponse(200,updatedcourse,'course details updated successfully'))
})



export {registerCourse,getcoursedetail,getallcourses,updatedcoursedetails}

