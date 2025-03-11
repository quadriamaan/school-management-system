import { asyncHandler } from '../utils/asynchandler.js'
import {decode, jwt} from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { Student } from '../models/student.model.js'


const verifystudentjwt = asyncHandler(async(req,res)=>{
    const token=req.student.header("Authorization").replace("Bearer"," ").trim()

    if(!token){
        throw new ApiError(400,'token not found')
    }

    try {
      const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
      const student = await Student.findOne({
        where:{
            student_id:decodedtoken.student_id
        }
      })

      if(!student) {
        throw new ApiError(400,'student not found')
      }

      req.student=student 

      next()

    } catch (error) {
        console.error('error in creating tokens',error.stack)
        throw new ApiError(500,'internal server error')
    }

})


export {verifystudentjwt}