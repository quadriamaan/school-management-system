import { sequelize } from "../connectDB/sequelize.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define('Category',{
    category_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false,
    }
})

export {Category}