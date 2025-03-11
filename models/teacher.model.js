import {sequelize} from "../connectDB/sequelize.js"
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const Teacher = sequelize.define('Teacher',{
    teacher_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    refreshToken:{
        type:DataTypes.STRING,
        allowNull:true
    }
})

Teacher.addHook('beforeSave', async (teacher) => {
    if (teacher.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(teacher.password, salt);
    }
  });
  
  Teacher.prototype.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

Teacher.prototype.generateRefreshToken = function() {
    return jwt.sign(
        {teacher_id:this.teacher_id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY || "10d"}
    )
}

Teacher.prototype.generateAccessToken = function() {
    return jwt.sign(
        {
            teacher_id:this.teacher_id,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY || "1d"}
    )
}

export {Teacher}