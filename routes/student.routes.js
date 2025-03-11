import { Router } from "express";
import { registerstudent,loginstudent, getstudent, getallstudent, updatestudent, deletestudent, logoutstudent } from "../controllers/student.controller.js";

const studentrouter=Router()

studentrouter.route('/register').post(registerstudent)
studentrouter.route('/auth/login').post(loginstudent)
studentrouter.route('/:id').get(getstudent)
studentrouter.route('/').get(getallstudent)
studentrouter.route('/:id').put(updatestudent)
studentrouter.route('/:id').delete(deletestudent)
studentrouter.route('/logout').post(logoutstudent)

export {studentrouter}