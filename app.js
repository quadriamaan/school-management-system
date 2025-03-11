import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { teacherrouter } from './routes/teacher.route.js' 
import { courserouter } from './routes/course.route.js'
import { coursetype } from './routes/coursetype.route.js'
import { syllabusrouter } from './routes/syllabus.router.js'
import {commentrouter} from './routes/comment.route.js'
import { studentrouter } from './routes/student.routes.js'
import { cartrouter } from './routes/cart.route.js'
import { certificaterouter } from './routes/certificate.route.js'
import {categoryrouter} from './routes/category.route.js'

const app=express()


app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/v2/teacher',teacherrouter)
app.use('/api/v2/course',courserouter)
app.use('/api/v2/coursetype',coursetype)
app.use('/api/v2/syllabus',syllabusrouter)
app.use('/api/v2/comment',commentrouter)
app.use('/api/v2/student',studentrouter)
app.use('/api/v2/cart',cartrouter)
app.use('/api/v2/certificate',certificaterouter)
app.use('/api/v2/category',categoryrouter)

export {app}
