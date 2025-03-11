import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";
import { Course } from "./course.model.js";

const Comment = sequelize.define('Comment',{
    comment_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    course_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Course,
            key:'course_id'
        }
    },
    comment:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export {Comment}