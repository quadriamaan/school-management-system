import { Router } from "express";
import { createcategory, getallcategory, getcategory } from "../controllers/category.controller.js";

const categoryrouter = Router() 

categoryrouter.route('/').post(createcategory)
categoryrouter.route('/:id').get(getcategory)
categoryrouter.route('/').get(getallcategory)

export {categoryrouter}