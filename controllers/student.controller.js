import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { Course } from "../models/course.model.js";

const generateAccessandRefreshToken = async(student)=>{

    if(!student.student_id) {
        throw new ApiError(400,'student id not found')
    }

    const studentExist = await Student.findOne({
        where:{
            student_id:student.student_id
        }
    })

    if(!studentExist) {
        throw new ApiError(400,'student not found')
    }

    const accesstoken=await studentExist.generateAccessToken()
    const refreshToken=await studentExist.generateRefreshToken()

    console.log("accesstoken",accesstoken)
    console.log("refreshToken",refreshToken)

    student.refreshToken=refreshToken
    await studentExist.save()

    return {accesstoken,refreshToken}
}

const registerstudent = asyncHandler(async (req, res) => {
    const { name, password, email, phone, course_id } = req.body;

    if (!(name && password && email && phone && course_id)) {  
        throw new ApiError(400, 'All fields are required');  
    }

   
    const studentFind = await Student.findOne({
        where: { email }  
    });

    if (studentFind) {
        throw new ApiError(409, 'Student already exists');
    }

    
    const student = await Student.create({
        name,
        password,
        email,
        phone
    });

    
    
    const course = await Course.findByPk(course_id);

    if (course) {
        await student.addCourse(course); 
    } else {
        throw new ApiError(400,'course not found')
    }

    return res.status(201).json(new ApiResponse(201, student, 'Student registered successfully'));
});


const loginstudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'All fields are required');
    }


    const student = await Student.findOne({
        where: { email }
    });

    if (!student) {
        throw new ApiError(409,'Student already exist');
    }


    const validPassword = await student.isPasswordCorrect('password');

    if (!validPassword) {
        throw new ApiError(400, 'Password not matched');
    }

    
    const { accesstoken, refreshToken } = await generateAccessandRefreshToken(student);
    await student.save()

    
    const login = await Student.findOne({
        where: { student_id: student.student_id },
        attributes: ["password"]
    });

    // if(login) {
    //     throw new ApiError(409,'Already login')
    // }


    return res.status(200).json(new ApiResponse(200, {
        student,
        accesstoken,
        refreshToken
    }, 'Student logged in successfully'));
});

const getstudent = asyncHandler(async(req,res)=>{
    const {id}=req.params

    const student = await Student.findOne({
        where:{
            student_id:id
        }
    })

    if(!student) {
        throw new ApiError(400,'student details not found')
    }

    return res 
    .status(200)
    .json(new ApiResponse(200,student,'student detail fetched successfully'))
})

const getallstudent = asyncHandler(async(req,res)=>{
    const student = await Student.findAll()

    if(!student) {
        throw new ApiError(400,'student details not found')
    }

    return res
    .status(200)
    .json(new ApiResponse(200,student,'all students fetched successfully'))
})

const updatestudent = asyncHandler(async(req,res)=>{

    const {id}=req.params
    const {name,email,phone}=req.body

    if(!(name || email || phone)) {
        throw new ApiError(400,'all fields are required')
    }

    const student = await Student.findOne({
        where:{
            student_id:id
        }
    })

    if(!student) {
        throw new ApiError(400,'student not found')
    }

    const updatestudent = await Student.update({
        name,
        email,
        phone
    },
    {
    where:{
        student_id:id
    }
    }
)

    const updatedstudent = await Student.findByPk(id)

    return res 
    .status(200)
    .json(new ApiResponse(200,updatedstudent,'student details updated suucessfully'))

})

const deletestudent = asyncHandler(async(req,res)=>{
    const {id}=req.body 

    const student = await Student.findOne({
        where:{
            student_id:id
        }
    })

    if(!student) {
        throw new ApiError(400,'all fields are required')
    }

    await Student.destroy()

    return res 
    .status(200)
    .json(new ApiResponse(200,'student deleted successfully'))
})

const logoutstudent = asyncHandler(async(req,res)=>{

    const {refreshToken}=req.body 

    const student = await Student.findOne({
        where:{
            refreshToken:refreshToken
        }
    })

    if(!student) {
        throw new ApiError(400,'student not found')
    }

    await Student.update({
        refreshToken:null
    },
    {
        where:{
            student_id:student.student_id
        }
    }
)
  
return res 
.status(200)
.json(new ApiResponse(200,'student logout successful'))


})


export {registerstudent,loginstudent,getstudent,getallstudent,updatestudent,deletestudent,logoutstudent}