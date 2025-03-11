import { Router } from "express";
import { createsyllabus, getsyllabus,getallsyllabus,updatesyllabus } from "../controllers/syllabus.controller.js";

const syllabusrouter = Router()

syllabusrouter.route('/').post(createsyllabus)
syllabusrouter.route('/:id').get(getsyllabus)
syllabusrouter.route('/').get(getallsyllabus)
syllabusrouter.route('/:id').put(updatesyllabus)

export {syllabusrouter}