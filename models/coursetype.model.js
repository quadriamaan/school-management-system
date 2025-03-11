import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import { Course } from "./course.model.js";

const CourseType = sequelize.define('CourseType',{

    course_type_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    url:{
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
    },
    attachments:{
        type:DataTypes.STRING,
        allowNull:false
    }

})

export {CourseType}