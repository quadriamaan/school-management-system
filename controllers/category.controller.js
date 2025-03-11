import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/category.model.js";
import { Course } from "../models/course.model.js";
//models 

const createcategory = asyncHandler(async(req,res)=>{
    const {category,id}=req.body

    if(!category && !id) {
        throw new ApiError(400,'category is required')
    }

    const categorydetail = await Category.create({
        category
    })

    const course = await Course.findByPk(Number(id))

    //if(course){
        await categorydetail.addCourse(course)
    //} else {
       // throw new ApiError(400,'course not found')
    //}
  

    return res 
    .status(201)
    .json(new ApiResponse(200,categorydetail,'all category details fetched successfully'))
})

const getcategory = asyncHandler(async(req,res)=>{
    const {id}=req.params

    if(!id) {
        throw new ApiError(400,'id not found')
    }

    const getcategorydetail = await Category.findOne({
        where:{
            category_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,getcategorydetail,'category detail fetched successfully'))
})

const  getallcategory = asyncHandler(async(req,res)=>{
        const getalldetails = await Category.findAll()

        return res 
        .status(200)
        .json(new ApiResponse(200,getalldetails,'all category details fetched successfully'))
})

export {createcategory,getcategory,getallcategory}