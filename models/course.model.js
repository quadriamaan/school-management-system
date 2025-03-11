import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";

const Course = sequelize.define('Course',{
   course_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    coursename:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    validity:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lectures:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    estimateTime:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
})

export {Course}