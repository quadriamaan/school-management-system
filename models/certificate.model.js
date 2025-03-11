import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import { Course } from "./course.model.js";
import { Student } from "./student.model.js";

const Certificate = sequelize.define('Certificate',{
    certificate_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    certificate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    course_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        unique:true,
        references:{
            model:Course,
            key:'course_id'
        }
    },
    student_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        references:{
            model:Student,
            key:'student_id',
        }
    }
})

export {Certificate}