import {Router} from "express"
import { registerCourse,getcoursedetail, getallcourses, updatedcoursedetails } from "../controllers/course.controller.js"
import { verifyjwt } from "../middleware/auth.middleware.js"

const courserouter=Router()

courserouter.route('/').post(verifyjwt,registerCourse)
courserouter.route('/:id').get(getcoursedetail)
courserouter.route('/').get(getallcourses)
courserouter.route('/:id').put(updatedcoursedetails)


export {courserouter}