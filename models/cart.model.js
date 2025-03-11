import {sequelize} from "../connectDB/sequelize.js"
import { DataTypes } from "sequelize"
import {Student} from "../models/student.model.js"
import {Course} from "../models/course.model.js"

const Cart = sequelize.define('Cart',{
    cart_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    student_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Student,
            key:'student_id'
        }
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

export {Cart}