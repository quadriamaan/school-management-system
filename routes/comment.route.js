import { Router } from "express";
import { createcomment,getallcomment,getcomment,updatecomment } from "../controllers/comment.controller.js";

const commentrouter = Router()

commentrouter.route('/').post(createcomment)
commentrouter.route('/').get(getallcomment)
commentrouter.route('/:id').get(getcomment)
commentrouter.route('/:id').put(updatecomment)

export {commentrouter}