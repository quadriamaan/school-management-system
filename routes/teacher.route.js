import { Router } from "express";
import { registerTeacher,loginTeacher, getTeachers, getTeacher,updateTeacher,deleteTeacher,logoutTeacher } from "../controllers/teacher.controller.js";

const teacherrouter = Router() 

teacherrouter.route('/register').post(registerTeacher)
teacherrouter.route('/auth/login').post(loginTeacher)
teacherrouter.route('/').get(getTeachers)
teacherrouter.route('/:id').get(getTeacher)
teacherrouter.route('/:id').put(updateTeacher)
teacherrouter.route('/:id').delete(deleteTeacher)
teacherrouter.route('/logout').post(logoutTeacher)


export {teacherrouter}