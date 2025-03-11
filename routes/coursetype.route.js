import { Router } from "express";
import { createcoursetype,gettype,getcoursetype } from "../controllers/coursetype.controller.js";

const coursetype = Router()

coursetype.route('/').post(createcoursetype)
coursetype.route('/:id').get(gettype)
coursetype.route('/').get(getcoursetype)


export {coursetype}