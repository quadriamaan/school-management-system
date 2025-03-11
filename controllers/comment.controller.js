import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Comment } from "../models/comment.model.js";

const createcomment = asyncHandler(async(req,res)=>{
    const {comment,course_id}=req.body
    
    if(!comment || !course_id) {
        throw new ApiError(400,'all fields are reuired')
    }

    const commentdetail = await Comment.create({
        comment,
        course_id
    })

    if(!commentdetail) {
        throw new ApiError(400,'comment not found')
    }

    return res 
    .status(201)
    .json(new ApiResponse(200,commentdetail,'comment detail created successfully'))
})

const getallcomment = asyncHandler(async(req,res)=>{
    const getcomments = await Comment.findAll()

    return res 
    .status(200)
    .json(new ApiResponse(200,getcomments,'comments fetched successfully'))
    
})

const getcomment = asyncHandler(async(req,res)=>{
    const {id}=req.params

    const getcommentbyid = await Comment.findOne({
        where:{
           comment_id:id 
        }
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,getcommentbyid,'comment fetched by id successfully'))
})

const updatecomment = asyncHandler(async(req,res)=>{
    const {id}=req.params

    const {comment}=req.body

    if(!comment) {
        throw new ApiError(400,'comment required')
    }

    const findcomment = await Comment.findOne({
        where:{
            comment_id:id
        }
    })

    const updatecomment = await Comment.update({
            comment    
    },{
        where:{
            comment_id:id
        }
    })

    const updatedcomment = await Comment.findByPk(id)
    if(updatedcomment) {
        throw new ApiError(409,'comment already updated')
    }

    return res 
    .status(200)
    .json(new ApiResponse(200,updatedcomment,'comment updated successfully'))

})

export {createcomment,getallcomment,getcomment,updatecomment}