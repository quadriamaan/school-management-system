import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import { Course } from "./course.model.js"

const Syllabus = sequelize.define('Syllabus',{
    syllabus_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    chapters:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    course_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Course,
            key:'course_id'
        }
    }
})

export {Syllabus}