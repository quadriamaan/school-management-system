import { sequelize } from "./sequelize.js";
import { Teacher } from "../models/teacher.model.js";
import { Course } from "../models/course.model.js";
import { CourseType } from "../models/coursetype.model.js";
import { Syllabus } from "../models/syllabus.model.js";
import { Comment } from "../models/comment.model.js";
import { Cart } from "../models/cart.model.js";
import { Student } from "../models/student.model.js";
import { Certificate } from "../models/certificate.model.js";
import { Category } from "../models/category.model.js";

const connectDB = async()=>{
    try{
        await sequelize.authenticate()
        console.log('DB connected')

        Teacher.belongsToMany(Course,{through:'Teacher_Course',foreignKey:'teacher_id'})
        Course.belongsToMany(Teacher,{through:'Teacher_Course',foreignKey:'course_id'})

        Course.hasMany(CourseType,{foreignKey:'course_id'})
        CourseType.belongsTo(Course,{foreignKey:'course_id'})

        Course.hasMany(Syllabus,{foreignKey:'course_id'})
        Syllabus.belongsTo(Course,{foreignKey:'course_id'})

        Course.hasMany(Comment,{foreignKey:'course_id'})
        Comment.belongsTo(Course,{foreignKey:'course_id'})

        /// student - cart relationship 
        Student.hasMany(Cart,{foreignKey:'student_id'})
        Cart.belongsTo(Student,{foreignKey:'student_id'})

        // Student.hasMany(Course,{foreignKey:'course_id'})
        // Course.belongsTo(Student,{foreignKey:'course_id'})

        Student.hasOne(Certificate,{foreignKey:'student_id'})
        Certificate.belongsTo(Student,{foreignKey:'student_id'})

        Course.hasOne(Certificate,{foreignKey:'course_id'})
        Certificate.belongsTo(Course,{foreignKey:'course_id'})

        Student.belongsToMany(Course,{through:'student_course',foreignKey:'student_id'})
        Course.belongsToMany(Student,{through:'student_course',foreignKey:'course_id'})

        Course.belongsToMany(Category,{through:'course_category',foreignKey:'course_id'})
        Category.belongsToMany(Course,{through:'course_category',foreignKey:'category_id'})

       await sequelize.sync({force:false})

    } catch(error){
        console.log('DB connection failed!!!',error.stack)
    }
}

export {connectDB}