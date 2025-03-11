import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";



const generateAccessandRefreshToken = async(teacher)=>{
    try{

    if(!teacher.teacher_id){
        throw new ApiError(404,'teacher with this id not found')
    }

    const teacherExist = await Teacher.findOne({
        where:{
            teacher_id:teacher.teacher_id
        }
    }) 

    if(!teacherExist) {
        throw new ApiError(404,'teacher does not found ')
    }

    const accesstoken = await teacherExist.generateAccessToken()
    const refreshToken = await teacherExist.generateRefreshToken()

    console.log("accesstoken",accesstoken)
    console.log("refreshToken",refreshToken)

    teacherExist.refreshToken=refreshToken
    await teacherExist.save()

    return {accesstoken,refreshToken}

    } catch(error){
        console.error("issue in creating tokens",error.stack)
        throw new ApiError(500,'internal server error')
    }
}

const registerTeacher = asyncHandler(async(req,res,next)=>{
    const {name,email,phone,password}=req.body

    if(!name && !email && !phone && !password) {
        throw new ApiError(400,'All fields are required')
    }

    const teacher = await Teacher.findOne({
        where:{
            email
        }
    })

    if(teacher) {
        throw new ApiError(403,'teacher already exists')
    }

    const newTeacher = await Teacher.create({
        name,
        email,
        phone,
        password
    })

    return res 
    .status(201)
    .json(new ApiResponse(200,newTeacher,'Teacher created successfully'))

})

const loginTeacher = asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body

    if(!email || !password) {
        throw new ApiError(400,'email and password required')
    }

    const teacher = await Teacher.findOne({
        where: { email },
      });
    
      if (!teacher) {
        throw new ApiError(400, "Teacher not found");
      }
    
      const validPassword = await teacher.isPasswordCorrect(password); 
    
      if (!validPassword) {
        throw new ApiError(400, "Invalid credentials");
      }

    const {accesstoken,refreshToken}=await generateAccessandRefreshToken(teacher)

    const login = await Teacher.findOne({
        where:{
            teacher_id:teacher.teacher_id
        },
        attributes:{exclude:["password"]}
    })

    // if(!login){
    //     throw new ApiError(409,'Already login')
    // }

    return res 
    .status(200)
    .json(new ApiResponse(200,{
        login,
        accesstoken,
        refreshToken
    },
    'teacher login successful'
))

})

const getTeachers = asyncHandler(async(req,res,next)=>{

    const Teachers = await Teacher.findAll()

    if(!Teachers) {
        throw new ApiError(404,'Teacher details not found')
    }

    return res 
    .status(200)
    .json(new ApiResponse(200,Teachers,'Teachers details fetched successfully'))

})

const getTeacher = asyncHandler(async(req,res,next)=>{
    try{
    const {id}=req.params
  
    const getteacherbyid = await Teacher.findByPk(id)
  
    return res 
    .status(200)
    .json(new ApiResponse(200,getteacherbyid,'teacher detail fetched successfully'))
  }catch(error){
    console.error("error in fetching details",error.stack)
    throw new ApiError(500,'internal server error')
  }
})

const updateTeacher = asyncHandler(async(req,res,next)=>{
    const {id}=req.params

    const {name,email,phone}=req.body
    
    if(!(name || email || phone)) {
        throw new ApiError(400,'All fields are required')
    }

    const TeacherDetails = await Teacher.findByPk(id)

    if(!TeacherDetails) {
        throw new ApiError(400,'Teacher not found')
    }

    const updateTeacher = await Teacher.update({
        name,
        email,
        phone
    }, 
    {
    where:{
        teacher_id:id
    }
    }
)

    if(!updateTeacher) {
        throw new ApiError(400,'Teacher Details not found')
    }

    const UpdatedTeacherDetails = await Teacher.findByPk(id)

    return res 
    .status(200)
    .json(new ApiResponse(200,UpdatedTeacherDetails,'teacher details updated'))

})

const deleteTeacher = asyncHandler(async(req,res,next)=>{

    const {id}=req.params

    const TeacherDetails = await Teacher.findByPk(id)

    if(!TeacherDetails) {
        throw new ApiError(404,'Teacher Details not found')
    }

    const deleterecord = await Teacher.destroy({
        where:{
            teacher_id:id
        }
    })

    if(!deleterecord) {
        throw new ApiError('error in deleteing record')
    }

    return res 
    .status(200)
    .json(new ApiResponse(200,'teacher details deleted successfully'))
})

const logoutTeacher = asyncHandler(async(req,res,next)=>{

    const {refreshToken}=req.body

    if(!refreshToken) {
        throw new ApiError(400,'refreshtoken not found')
    }

    const findTeacher = await Teacher.findOne({
        where:{
            refreshToken:refreshToken
        }
    })

    if(!findTeacher) {
        throw new ApiError(400,'teacher details not found')
    }

   await Teacher.update(
    {refreshToken:null},
    {where:{
        teacher_id:findTeacher.teacher_id
    }}
   )

   return res 
   .status(200)
   .json(new ApiResponse(200,'Teacher logout successfully'))
})

export {registerTeacher,loginTeacher,getTeachers,getTeacher,updateTeacher,deleteTeacher,logoutTeacher}