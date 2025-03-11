import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Cart } from "../models/cart.model.js";

const createcart = asyncHandler(async(req,res)=>{
        const {student_id,course_id}=req.body
        
        if(!(student_id || course_id)) {
            throw new ApiError(400,'all fields are required')
        }

        const cart = await Cart.create({
            student_id,
            course_id
        })

        return res 
        .status(201)
        .json(new ApiResponse(200,cart,'cart details created successfully'))
})

const getcart = asyncHandler(async(req,res)=>{
    const {id}=req.params

    if(!id) {
        throw new ApiError('id is required')
    }

    const getcartdetail = await Cart.findOne({
        where:{
            cart_id:id
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,getcartdetail,'cart detail fetched successfully'))

})

const getallcartdetails = asyncHandler(async(req,res)=>{

    const getalldetails = await Cart.findAll()

    return res 
    .status(200)
    .json(new ApiResponse(200,getalldetails,'all cart details fetched successfully'))
})

export {createcart,getcart,getallcartdetails}